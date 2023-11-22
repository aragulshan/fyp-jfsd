const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateOTP, sendOtpToEmail } = require("../helper/utils");
const Otps = require("../models/userOtp");
const otpGenerator = require("otp-generator");

const isValidEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  // Condition for minimum length
  if (password.length < 8) {
    return false;
  }

  // Check for a mix of character types
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
    return false;
  }

  // Check if the password is not too common
  const commonPasswords = [
    "password",
    "123456",
    "asdfjkl",
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    return false;
  }

  return true;
};
const register = async (req, res) => {
  try {
    let { name, email, password, contact, role } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!isValidEmail(email)) {
      return res.status(401).json({ message: "Please enter a valid email address" });
    }

    if (!isStrongPassword(password)) {
      return res.status(401).json({ message: "Password does not meet the criteria for a strong password." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "Email already exists. Please use a different email or login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contact,
      role,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const register = async (req, res) => {
//   try {
//     let { username, email, password, otp } = req.body;
//     username = username.trim();
//     email = email.trim();
//     password = password.trim();

//     if (!isValidEmail(email)) {
//       res
//         .status(401)
//         .json({
//           message: "The email you entered is not valid enter a valid email",
//         });
//     } else if (!isStrongPassword(password) || password.length < 8) {
//       res
//         .status(401)
//         .json({
//           message: "Password does not meet the criteria for a strong password.",
//         });
//     } else {
//       const result = await User.find({ email });
//       console.log("result:", result);
//       if (result.length) {
//         res
//           .status(401)
//           .json({
//             message:
//               "Email already exist please try another email . or if you forget the passsword click on forgot password",
//           });
//       } else {
//         if ((await validateOTP(email, otp)) === true) {
//           const salt = await bcrypt.genSalt(10);
//           const hashedPassword = await bcrypt.hash(password, salt); // Use req.body.password

//           const newUser = new User({
//             username: username,
//             email: email,
//             password: hashedPassword,
//             verified: true,
//           });
//           console.log(newUser, "user");
//           const savedUser = await newUser.save();
//           res.status(201).json(savedUser);
//         } else {
//           res
//             .status(401)
//             .json({
//               message: "OTP is not valid or Otp expired try again with new OTP",
//             });
//         }
//       }
//     }
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: "Internal Server Error" });
//   }
//   // catch (err) {
//   //   res.status(500).json(err);
//   // }
// };

const generateAndSendOTP = async (req, res) => {
  const { email, path } = req.body;
  if (!email || email === "") {
    res.status(401).json({ message: "Email Field is Empty" });
  } else {
    if (isValidEmail(email)) {
      await Otps.deleteMany({ email });
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const createdAt = new Date();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 2); // Set OTP expiration to 2 minutes from now

      const salt = await bcrypt.genSalt(10);
      const hashedOtp = await bcrypt.hash(otp, salt); // Use req.body.password

      const otpData = new Otps({
        email,
        otp: hashedOtp,
        createdAt,
        expiresAt,
        used: false,
      });

      await otpData.save();
      sendOtpToEmail(email, otp, path);
      res.status(201).json({ message: "Otp sent" });
    } else {
      res
        .status(401)
        .json({ message: "Invalid email kindly enter a valid email" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Wrong User Email or the User not exist " });
    } else {
      const storedHashedPassword = user.password;

      const isPasswordValid = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      console.log("isPasswordValid", isPasswordValid);
      console.log("user:", user);

      if (isPasswordValid) {
        // const header = {
        //     alg: 'HS256',
        //     typ: 'JWT',
        // };

        const payload = {
          id: user._id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
        };

        // const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
        //     .replace(/\+/g, '-')
        //     .replace(/\//g, '_')
        //     .replace(/=+$/, '');

        // const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
        //     .replace(/\+/g, '-')
        //     .replace(/\//g, '_')
        //     .replace(/=+$/, '');

        //    const token = `${encodedHeader}.${encodedPayload}`;

        const accessToken = jwt.sign(payload, process.env.JWT_SEC, {
          expiresIn: "30d",
        });

        console.log("accessToken:", accessToken);

        // Remove the password property from the user object.
        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email, newPassword, otp } = req.body;

    // Trim email and password
    email = email.trim();
    newPassword = newPassword.trim();

    if (!isValidEmail(email)) {
      return res
        .status(401)
        .json({
          message:
            "The email you entered is not valid. Please enter a valid email.",
        });
    }

    if (!isStrongPassword(newPassword) || newPassword.length < 8) {
      return res
        .status(401)
        .json({
          message: "Password does not meet the criteria for a strong password.",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email. There is no user in the Database." });
    }

    if ((await validateOTP(email, otp)) === true) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findOneAndUpdate(
        { _id: user._id },
        { password: hashedPassword }
      );

      return res.status(201).json({ message: "Password Updated Successfully" });
    } else {
      return res
        .status(401)
        .json({
          message:
            "OTP is not valid or OTP has expired. Try again with a new OTP.",
        });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude the password field

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  generateAndSendOTP,
  forgotPassword,
  getAllUsers
};
