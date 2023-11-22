import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number format (10 digits)")
    .required("Contact Number is required"),
  role: Yup.string().required("Role is required"),
});
