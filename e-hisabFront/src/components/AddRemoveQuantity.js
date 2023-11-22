import React  from "react";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../redux/slices/addToCart";

const AddRemoveQuantity = ({ product, quantityInCart }) => {
  const dispatch = useDispatch();
console.log(quantityInCart,'quantityInCart')
  const handleIncrease = () => {
    dispatch(increaseQuantity(product._id));
    // dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    if (quantityInCart > 1) {
      dispatch(decreaseQuantity(product._id));
      // dispatch(decreaseQuantity(product.id));
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <img
        src="./images/addbtn.svg"
        alt="add"
        className="w-[16px] h-[16px] m-auto cursor-pointer"
        onClick={handleIncrease}
      />
      <p className="self-center px-2">{`  ${quantityInCart}`}</p>
      <img
        src="./images/removebtn.svg"
        alt="remove"
        className="w-[16px] h-[16px] m-auto cursor-pointer"
        onClick={handleDecrease}
      />
    </div>
  );
};

export default AddRemoveQuantity;
