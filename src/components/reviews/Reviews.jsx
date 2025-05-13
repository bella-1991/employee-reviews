import React, { useState } from "react";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import StarRating from "../starRating/StarRating";
import profilePic from "../../assets/images/profile_pic.png"; 
import { useToast } from "../../context/ToastContext";
import styles from "./reviews.module.scss";
import AddReview from "../addReview/AddReview";
import Pagination from "../pagination/Pagination";

const Reviews = ({ employee }) => {
  const { id, name, position, reviews } = employee || {};
  const [currentPage, setCurrentPage] = useState(1);
  const rpp = 4
  const pages = reviews && Math.floor((((reviews.length) + rpp - 1) / rpp));
  const [showModal, setShowModal] = useState(false);
  const { setToast } = useToast();

  async function postData(url = "", data = {}) {
    const tempEmp = { ...employee };
    tempEmp.reviews.push(data);

    return fetch(url, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(tempEmp),
    });
  }

  const submitForm = (data) => {
    postData(`/api/employees/${employee.id}`, data)
      .then((response) => {
        // on success
        if (response.ok) {
          setToast("Your Review just got submitted");
        } else {
          setToast("Something went wrong");
        }
      })
      .catch(() => {
        setToast("Something went wrong");
      });
    setShowModal(false);
  };

  const filterByResultPerPage = (results, currentPage, rpp) => { 
    if (!results ) return;

    const indexOfLast = currentPage * rpp;
    const indexOfFirst = indexOfLast - rpp;
    const currentList = results.slice(indexOfFirst, indexOfLast);

    return currentList
  }

  return (
    employee && (
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
            <button
              onClick={() => setShowModal(true)}
              className={styles.addReviewButton}
            >
              <FaPlus />
              <span>Add Review</span>
            </button>
          </div>
          <div className={styles.reviewDetails}>
            {reviews && filterByResultPerPage(reviews, currentPage, 4).map((review) => (
              <div key={review.id} className={styles.review}>
                <h6>{review.name}</h6>
                <StarRating rating={review.rating} />
                <p>{review.review}</p>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={pages} setCurrentPage={setCurrentPage} />
        </div>
        <AddReview
          show={showModal}
          closeModal={setShowModal}
          employee={id}
          submitForm={submitForm}
        />
      </div>
    )
  );
};

export default Reviews;
