import React from "react";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

import profilePic from "../../assets/images/profile_pic.png";
import styles from "./reviews.module.scss";

const Reviews = ({ employee }) => {
  const { name, position } = employee || {};

  return employee && (
    <div className={styles.reviewModule}>
      <div className={styles.profilePicContainer}>
        <img src={profilePic} alt={name} />
        <div className={styles.profileDetails}>
          <p>{name}</p>
          <span>{position}</span>
        </div>
      </div>
      <div className={styles.reviewContents}>
        <div className={styles.reviewHeader}>
          <h4>Employee Reviews</h4>
          <button className={styles.addReviewButton}>
            <FaPlus />
            <span>Add Review</span>
          </button>
        </div>
        <div className={styles.reviewDetails}>
          {employee?.reviews.slice(0,4).map(review => (
            <div className={styles.review}>
              <h6>{review.name}</h6>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
