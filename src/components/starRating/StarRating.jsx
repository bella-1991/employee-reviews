import React, { useState } from "react";
import styles from "./starRating.module.scss";

const StarRating = ({ rating, unselected = false, selectRating }) => {
  const [unselectedRating, setUnselectedRating] = useState('');

  const handleSelectRating = (index, e) => {
    e.preventDefault();
    setUnselectedRating(index);
    selectRating(index);
  };

  if (unselected) {
    rating = 5;
  }

  return (
    <div className={styles.starRatingContainer}>
      {[...Array(rating)].map((e, i) =>
        unselected ? (
          <button
            key={i}
            onClick={(e) => handleSelectRating(i+1, e)}
            className={`${i < unselectedRating ? styles.selected : styles.unselected}`}
          />
        ) : (
          <span key={i} className={styles.fullStar} />
        )
      )}
    </div>
  );
};

export default StarRating;
