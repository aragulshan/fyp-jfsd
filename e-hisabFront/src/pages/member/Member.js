import { useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";

const Member = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const toggleLoginRegistration = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="py-12 flex-1">
        <div className="flex bg-white rounded-lg shadow-2xl justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-600 text-center">
              E-Hisab
            </h2>
            <a
            href="#"
              onClick={toggleLoginRegistration}
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                {isLogin ? "Become a Member" : "Back to Login"}
              </h1>
            </a>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b border-red-700 w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                // href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                {isLogin ? "Login" : "Register"}
              </a>
              <span className="border-b w-1/5 border-red-700 lg:w-1/4"></span>
            </div>
            {isLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
