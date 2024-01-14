import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="mt-4">
        <p className="font-bold">Upcoming Uploads</p>
        <Updates />
      </div>
      <div className="mt-4 mb-4">
        <p className="font-bold">User Review</p>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
