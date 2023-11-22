import React from "react";
import { Link } from "react-router-dom";

const FailurePage = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center mt-[8rem]">
      <img
        src="./images/failed.svg"
        alt="Checkout Failure"
        className="w-full h-auto mb-4 rounded-lg shadow-md"
      />
      <p className="text-lg font-bold mb-2">Checkout Failed!</p>
      <p className="text-md mb-4">
        Oops! Something went wrong with your checkout. Please try again.
      </p>
      <Link
        to="/home"
        className="block bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default FailurePage;
