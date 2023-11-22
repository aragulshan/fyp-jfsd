import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#E7E7E7] py-0">
      {/* <div className="bg-gray-200 py-0"> */}
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between p-2 xl:px-[95px] ">
          <div className="flex justify-between w-[100%] md:w-[unset] lg:justify-center items-center xl:w-[320px] xl:justify-between">
            <img
              className="me-5"
              src="./images/footer.png "
              alt=""
              style={{ width: "121px", height: "46px" }}
            />
            <img
              className="me-5"
              src="./images/footerimg.png "
              alt=""
              style={{ width: "127px", height: "45px" }}
            />
          </div>
          <div className="hidden md:flex items-center xl:w-[250px] xl:justify-between">
            {/* <div className="flex items-center justify-end"> */}
            <img
              className="me-5"
              src="./images/search.png "
              alt=""
              style={{ width: "21.86px", height: "21.86px" }}
            />
            <img
              className="me-5"
              src="./images/search.png "
              alt=""
              style={{ width: "21.86px", height: "21.86px" }}
            />
            <img
              className="me-5"
              src="./images/search.png "
              alt=""
              style={{ width: "21.86px", height: "21.86px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
