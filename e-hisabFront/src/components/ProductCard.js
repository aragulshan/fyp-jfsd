import React, { useEffect, useState } from "react";
import AddRemoveQuantity from "./AddRemoveQuantity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
} from "../redux/slices/addToCart";
import ProductModal from "./Modal/ProductModal";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showAddRemove, setShowAddRemove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // const cartItems = useSelector(selectCartItems);
  const cartitems = useSelector((state) => state.cart.items);
  useEffect(() => {
    // Log the updated cartitems after each render;
  }, [cartitems]);

  const quantityInCart =
    cartitems.find((item) => item._id === product._id)?.quantity || 0;

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
    setShowAddRemove(true);
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 m-2">
        <img
          src={product.imageUrl || ""}
          alt={product.title || ""}
          className="h-40 mx-auto"
        />

        <div className=" flex flex-row justify-between pt-4 ">
          <div className="text-center self-center  font-bold text-xl">
            {product.price} USD
          </div>
          {showAddRemove ? (
            <AddRemoveQuantity
              product={product}
              increaseQuantity={() => dispatch(increaseQuantity(product._id))}
              decreaseQuantity={() => decreaseQuantity(product._id)}
              quantityInCart={quantityInCart}
            />
          ) : (
            <button
              className="block bg-[#ffffff] text-blue-800 p-2 mt-2"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          )}
        </div>
        <div className="text-left mt-2 text-gray-500 ">{product.brand}</div>
      </div>
      {isOpen && (
        <ProductModal
          content={
            <>
              <div className="row d-flex">
                <div
                  className="col-lg-8 d-flex"
                  style={{
                    paddingLeft: "0px",
                    marginRight: "0px",
                    paddingRight: "0px",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt=""
                    style={{
                      maxWidth: "600px",
                      // maxWidth: "658px",
                      height: "600px",
                      marginRight: "0px",
                      paddingRight: "0px",
                    }}
                  />
                </div>
                <div
                  className="col-lg-4 text-start"
                  style={{ maxWidth: "300px", height: "600px" }}
                >
                  <div className="row text-start mt-4">
                    <div
                      className="col-2"
                      style={
                        {
                          // borderBottomColor: "#D7D7D7",
                          // borderBottom: "1px solid #D7D7D7",
                        }
                      }
                    >
                      <img className="" src="./images/popupimg.png" alt="popup" />
                    </div>
                    <div
                      className="col-10"
                      style={
                        {
                          // borderBottomColor: "#D7D7D7",
                          // borderBottom: "1px solid #D7D7D7",
                        }
                      }
                    >
                      <p
                        className="text-start m-auto"
                        style={{
                          fontWeight: "500px",
                          fontSize: "18px",
                          textAlign: "center",
                          paddingLeft: "30px",
                        }}
                      >
                        Store name
                      </p>
                      <div className="row">
                        <div className="col-lg-2 text-end">
                          <img
                            src="./images/Vector.png"
                            alt=""
                            style={{
                              width: "65px",
                              height: "57px",
                              textAlign: "end",
                            }}
                          />
                        </div>
                        <div className="col-lg-10 mt-2">
                          <p
                            style={{
                              fontWeight: "500px",
                              fontSize: "14px",
                              width: "204px",
                              verticalAlign: "center",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Shop number 102 ZS plaza gilgit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      color: "#D7D7D7",
                      borderWidth: "1px solid #D7D7D7",
                      width: "110%",
                      marginleft: "0px",
                    }}
                  />
                  <div className="container">
                    <div className="div mt-2">
                      <p
                        style={{
                          fontStyle: "normal",
                          fontWeight: "500px",
                          fontSize: "16px",
                        }}
                      >
                        {product.category}
                      </p>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <p
                          style={{
                            fontStyle: "normal",
                            fontWeight: "500px",
                            fontSize: "16px",
                          }}
                        >
                          {product.price}RS
                        </p>
                      </div>
                      {/* <div className="col-lg-8 text-end">
                        <div>
                          <AddRemove count={count} setCount={setCount} />
                        </div>
                      </div> */}
                    </div>
                    <p
                      style={{
                        fontStyle: "normal",
                        fontWeight: "500px",
                        fontSize: "16px",
                      }}
                    >
                      {product.productDescription}
                    </p>
                  </div>
                </div>
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
};

export default ProductCard;
