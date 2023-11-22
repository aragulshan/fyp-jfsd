import React from "react";

const ProductModal = (props) => {
  // .popup-box {
  //     position: fixed;
  //     background: #00000050;
  //     width: 100%;
  //     height: 100vh;
  //     top: 0;
  //     left: 0;
  //     z-index: 1;
  //   }
  return (
    <div
      className="popup-box fixed bg-[#00000050] w-full h-[100vh] top-0 left-0 z-[1]"
      style={{}}
    >
      <div className="box">
        <span className="close-icon cursor-pointer" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default ProductModal;

//   .box {
//     position: relative;
//     margin: 0 auto;
//     max-width: 1000px;
//     height: 600px;
//     margin-top: calc(100vh - 85vh - 20px);
//     background: #fff;
//     border-radius: 4px;
//     overflow: auto;
//   }

//   .close-icon {
//     content: 'x';
//     cursor: pointer;
//     position: fixed;
//     right: calc(15% - 1px);
//     top: calc(100vh - 85vh - 33px);
//     background: #ededed;
//     width: 25px;
//     height: 25px;
//     border-radius: 50%;
//     line-height: 20px;
//     text-align: center;
//     border: 1px solid #999;
//     font-size: 20px;
//   }
