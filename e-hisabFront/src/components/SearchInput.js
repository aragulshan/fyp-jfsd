import React from "react";
import PropTypes from "prop-types";

const SearchInput = (props) => {
  return (
    <div className="relative w-full self-center lg:self-end md:w-[16rem] h-10 my-4 md:my-[1rem]">
      <input
        type="text"
        placeholder={props.placeholder} 
        className="w-[319px] lg:w-[250px] xl:w-[270px] h-full pl-3 pr-10 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        value={props.value}
        onChange={props.onChange}
      
      />
      {props.showIcon && (
        <img
          src="/images/search.svg"
          alt="Search"
          className="w-6 h-6 absolute left-[17rem] md:left-[unset] md:-right-[2.5rem] lg:right-[1rem] top-2/4 transform -translate-y-2/4"
        />
      )}
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  showIcon: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired, // Make sure to include onChange prop
  value: PropTypes.string.isRequired,
};

export default SearchInput;
