import React from "react";
import { Link } from "react-router-dom";

const ThankYouCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center mt-[8rem]">
      <img
        src="./images/thankyou.png"
        alt="Thank You"
        className="w-full h-auto mb-4 rounded-lg shadow-md"
      />
      <p className="text-lg font-bold mb-2">Congratulations Checkout Successful!</p>
      <p className="text-md mb-4">Thank You For Shopping!</p>
      <Link to="/home" className="bg-gray-700 text-white font-bold py-2 px-4  rounded hover:bg-gray-600">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYouCard;
