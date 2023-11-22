import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/slices/productsSlice";
import ProductCard from "../../components/ProductCard";
import UserTable from "../../components/UserTable";
import ProductsForm from "../../components/productsForm";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  // const products = useSelector(selectAllProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [localProducts, setLocalProducts] = useState(products);
  const [open, setOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Users");
  const Menus = [
    // { title: "Dashboard", src: "dashboard" },
    { title: "Users", src: "users" },
    { title: "Products", src: "products" },
    { title: "Add Products", src: "categories" },
    // { title: "Search", src: "searches" },
  ];

  const handleMenuItemClick = (title) => {
    setSelectedMenuItem(title);
  };

  useEffect(() => {
    dispatch(searchProducts({ searchQuery, category }));
  }, [searchQuery, category, dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
    }
  }, [products]);
  return (
    <>
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-[#3D3D3D] h-screen p-5  pt-8 fixed duration-300 `}
        >
          <img
            src="./images/arr.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 
            rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            alt="logo"
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="./images/logoMain.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
              alt="logo"
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              E-Hisab
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
                onClick={() => handleMenuItemClick(Menu.title)}
              >
                <img
                  src={`./images/${Menu.src}.png`}
                  alt="menus"
                  className=" w-8 h-8"
                />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`h-[79vh] w-[100%] text-center  p-7  ${
            open ? "ml-auto w-[77%]" : "mx-auto"
          }`}
        >
          <h1 className="text-2xl text-center font-semibold ">
            {selectedMenuItem}
          </h1>
          {/* {selectedMenuItem === "Dashboard" && "dashboard here"} */}
          {selectedMenuItem === "Users" && (
            <div
              className={` ${open ? "w-full" : " w-full container mx-auto px-[95px] "} `}
            >
              <UserTable />
            </div>
          )}
          {selectedMenuItem === "Products" && localProducts && (
            <div className="flex flex-wrap md:w-[776px] lg:w-[850px] xl:w-[1015px] mx-auto py-12 ">
              {localProducts.length > 0 ? (
                localProducts?.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-[33.3%] px-4 mb-4"
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })
              ) : (
                <h1 className="text-center">No Results Found</h1>
              )}
            </div>
          )}
          {selectedMenuItem === "Add Products" && <ProductsForm />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
