import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import getCurrentUserData from "../../Utils/FetchCurrentUserData";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const auth = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    dispatch(logout());
    navigate('/member')
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      setIsSticky(!isTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const userData = getCurrentUserData();

  return (
    <>
      <div
        className={`bg-[#E7E7E7] ${isSticky ? "fixed top-0 w-full z-20" : ""}`}
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 1)" }}
      >
        <nav className="">
          <div className="container mx-auto xl:w-[1366px]">
            <div className=" container mx-auto flex flex-row justify-between lg:flex-none ">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full xl:px-[95px]">
                <Link href="/home">
                  <img
                    src="./images/logoMain.png"
                    alt="mainLogo"
                    className=" h-[100px]"
                  />
                </Link>

                <div
                  className={`${
                    isMenuOpen ? "block" : "hidden"
                  } lg:flex lg:items-center lg:w-auto `}
                >
                  <ul className="lg:flex lg:items-center lg:space-x-5">
                    {userData ? (
                    <>
                      <li className="mb-2 lg:mb-0">
                        <Link
                          className="text-[#3E8AAD] font-semibold text-lg"
                          to="/home"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="mb-2 lg:mb-0">
                        <Link
                          className="text-[#3E8AAD] font-semibold text-lg"
                          to="/store"
                        >
                          Stores
                        </Link>
                      </li>
                      {/* <li className="mb-2 lg:mb-0">
                        <Link
                          className="text-[#3E8AAD] font-semibold text-lg"
                          to="/Products"
                        >
                          Products
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link to="/store">
                          <img
                            src="./images/cart.png"
                            alt=""
                            className="w-5 h-5"
                          />
                        </Link>
                      </li> */}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="text-[#3E8AAD] font-semibold text-lg"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                     ) : (
                      <li>
                        <Link
                          className="text-[#3E8AAD] font-semibold text-lg"
                          to="/member"
                        >
                          Member
                        </Link>
                      </li>
                    )} 
                  </ul>
                </div>
              </div>

              <button
                className="lg:hidden block text-[#3E8AAD] focus:outline-none"
                onClick={toggleMenu}
              >
                ☰
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
