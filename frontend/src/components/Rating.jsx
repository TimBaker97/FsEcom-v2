import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        {/* This check if values is >=1 to show full star, else if value >=0.5 show half star, else show an empty star */}
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {/* This check if values is >=1 to show full star, else if value >=0.5 show half star, else show an empty star */}
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {/* This check if values is >=1 to show full star, else if value >=0.5 show half star, else show an empty star */}
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {/* This check if values is >=1 to show full star, else if value >=0.5 show half star, else show an empty star */}
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {/* This check if values is >=1 to show full star, else if value >=0.5 show half star, else show an empty star */}
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="rating-text">{text ? text : null}</span>
    </div>
  );
};

export default Rating;
