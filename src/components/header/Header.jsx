import React from "react";
import styles from "./header.module.scss";
import logo from "../../assets/images/dakar_logo.png";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";

const Header = ({ search, setSearch, handleSearch }) => {

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.rightContainer}>
        <div className={styles.searchContainer}>
          <input
            type="number"
            className={styles.search}
            placeholder="Search by Employee ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => handleSearch(search)}
            className={styles.searchBtn}
          >
            <IoSearchOutline />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
