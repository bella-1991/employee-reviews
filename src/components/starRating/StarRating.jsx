import React from 'react';
import { getRating } from '../../helpers/rating';

import styles from './starRating.module.scss';

const StarRating = ({
  rating,
}) => {

  return (
    <div className={styles.starRatingContainer}>
      {[...Array(rating)].map((e, i) => <span key={i} className={styles.fullStar} />)}
    </div>
  );
};

export default StarRating;