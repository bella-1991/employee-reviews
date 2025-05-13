import React, { useState } from 'react';
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import StarRating from '../starRating/StarRating';
import keygen from '../../helpers/keygen';
import styles from "./addReview.module.scss";

const AddReview = ({ show, closeModal, submitForm }) => {
  const [state, setState] = useState({
    loading: false,
    success: false,
    failed: false,
    isValid: true,
    isDisabled: false,
  });
  const [elements, setElements] = useState({
    name: '',
    surname: '',
    review: '',
    rating: '',
  });

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
    setElements({ ...elements, [name]: value });
  };

  const selectRating = rating => {
    handleChange('rating', rating);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if all required fields are empty
    const inValid = Object.values(elements).some((value) => value === '');

    if (inValid) {
      setState({ ...state, isValid: false, success: false });
      return;
    }

    const formElements = {
      id: keygen(),
      name: `${elements.name} ${elements.surname}`,
      review: elements.review,
      rating: elements.rating,
    }

    setState({ ...state, loading: true, success: false, failed: false, isDisabled: true });
    submitForm(formElements);
  }

  return show && (
    <div className={styles.addReviewModalContainer}>
      <div className={styles.addReviewModalInner}>
        <div className={styles.addReviewHeader}>
          Submit your Review
          <button onClick={() => closeModal(false)} className={styles.addReviewModalClose}>
            <IoMdClose />
          </button>
        </div>
        
        <form
          onSubmit={(e) => handleSubmit(e)}
          target="_self"
          name='Add review form'
          className={styles.formComponent}
        >
          <div className={styles.formGroup}>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              id='name'
              type='text'
              aria-describedby='name'
              placeholder='Ex. Emily'
              value={elements.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className={`${(!state.isValid && elements.name === '' && styles.invalid) || ''}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='surname'>Surname</label>
            <input
              name='surname'
              id='surname'
              type='text'
              aria-describedby='surname'
              placeholder='Ex. Rose'
              value={elements.surname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className={`${(!state.isValid && elements.surname === '' && styles.invalid) || ''}`}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor='name'>Review</label>
            <textarea
              name='review'
              id='review'
              placeholder='Write your review here...'
              value={elements.review}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className={`${(!state.isValid && elements.review === '' && styles.invalid) || ''}`}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth} ${styles.inline} ${(!state.isValid && elements.rating === '' && styles.invalid) || ''}`}>
            <label htmlFor='name'>Review</label>
            <StarRating rating={elements.rating} unselected selectRating={selectRating} />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <button type='submit' className={styles.addReviewButton}>
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddReview
