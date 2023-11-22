import React from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/registrationSlice";
import { registrationSchema } from "../validation/SignupSchema";

const Register = () => {
  const dispatch = useDispatch();
  // const { isLoading, error } = useSelector((state) => state.registration);
  const registrationState = useSelector((state) => state.registration);
  const isLoading = registrationState.isLoading || false; // Initialize as false
  const error = registrationState.error || null;

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          contact: "",
          role: "",
          // role:"customer"
        }}
        validationSchema={registrationSchema}
        // onSubmit={(values) => {
        //   alert(JSON.stringify(values, null, 2));
        // }}
        onSubmit={handleSubmit}
      >
        <Form className="w-[100%]">
          <label
            className="block text-gray-700 text-sm font-bold pt-2 pb-1"
            htmlFor="name"
          >
            Full Name
          </label>
          <Field
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            id="name"
            name="name"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />

          <label
            className="block text-gray-700 text-sm font-bold pt-2 pb-1"
            htmlFor="email"
          >
            Email
          </label>
          <Field
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            id="email"
            name="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />

          <label
            className="block text-gray-700 text-sm font-bold pt-2 pb-1"
            htmlFor="password"
          >
            Password
          </label>
          <Field
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            id="password"
            name="password"
            type="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />

          <label
            className="block text-gray-700 text-sm font-bold pt-2 pb-1"
            htmlFor="contact"
          >
            Contact Number
          </label>
          <Field
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            id="contact"
            name="contact"
          />
          <ErrorMessage
            name="contact"
            component="div"
            className="text-red-500 text-sm"
          />
          <label
            className="block text-gray-700 text-sm font-bold pt-2 pb-1"
            htmlFor="role"
          >
            Role
          </label>
          <Field
            as="select"
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            id="role"
            name="role"
          >
            <option value="customer">Customer</option>
            {/* <option value="seller">Seller</option> */}
            <option value="admin">Admin</option>
            {/* Add more roles as needed */}
          </Field>
          <ErrorMessage
            name="role"
            component="div"
            className="text-red-500 text-sm"
          />

          <div className="mt-8">
            <button
              type="submit"
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </Form>
      </Formik>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default Register;
