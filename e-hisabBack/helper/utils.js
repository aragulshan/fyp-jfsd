const nodemailer = require('nodemailer');
const otps=require("../models/userOtp");
const bcrypt = require("bcrypt");



const sendOtpToEmail = (email, otp,path) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'aragulshan321@.com',
            pass: 'xxxxxxxxxxxx',
        },
    });
    const mailOptions = {
        from: 'aragulshan321@.com', 
        to: email, 
        subject: 'SignUp Verification', 
        text: `This is a your OTP for ${path} ${otp}`, 

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

const validateOTP = async (email, otp) => {
    const otpData = await otps.findOne({ used: false, email: email,expiresAt: { $gt: new Date() }})
    const isOtpValid = await bcrypt.compare(otp, otpData.otp);
    if (isOtpValid) {

        const now = new Date();
        otpData.used = true;
        await otpData.save();
        return true; 

    }

    return false;
};


module.exports = {
    validateOTP,
    sendOtpToEmail

}