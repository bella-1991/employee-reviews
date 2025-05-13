import { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Reviews from "./components/reviews/Reviews";
import img from "./assets/images/searching.png";
import "./styles/style.scss";
import styles from "./app.module.scss";

function App() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { 
    const fetchJobs = async () => {
      const apiUrl = "/api/employees";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        setEmployees(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (str) => {
    console.log(str);
    if (str) {
      findEmployee(str);
    }
  };

  const findEmployee = (id) => {
    const emp = employees.find((each) => each.id == id);

    setEmployee(emp);
  };

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <main className={styles.main}>
        {search ? (
          <Reviews employee={employee} />
        ) : (
          <div className={styles.searchImgContainer}>
            <img src={img} alt="Search image" className={styles.searching} />
            <p>Search for an employee to load reviews</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
