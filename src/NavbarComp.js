import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import useAxios from "./useAxios";

const NavbarComp = ({
  setMovies,
  search,
  setSearch,
  setShownMovies,
  checked,
  setChecked,
  setErrorMsg,
}) => {
  const [showFilterOptions, setShowFO] = useState(false);

  const {
    data: moviesData,
    isPending,
    error,
  } = useAxios("https://imdb-api.com/en/API/Top250Movies/k_81r0u9kp");

  const getMovieList = () => {
    if (!isPending && moviesData) {
      setMovies(moviesData.items);
    }
    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const loadSearch = () => {
    setMovies([]);
    axios
      .get(
        `https://imdb-api.com/API/AdvancedSearch/k_81r0u9kp?title=${search}${
          checked ? "&genres=" + checked.toString() : ""
        }`
      )
      .then((res) => {
        console.log(res.data.results);
        res.data.results.length !== 0
          ? setMovies(res.data.results)
          : searchByTitle();
      });
    setShownMovies("Movies by filter: " + checked.toString());
    setSearch("");
  };

  const searchByTitle = () => {
    axios
      .get(`https://imdb-api.com/en/API/SearchAll/k_81r0u9kp/${search}`)
      .then((res) => {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
    setShownMovies("Didn't find by filter... we found this instead");
  };

  return (
    <div className="search">
      <Link to={`/`} className="home-btn" onClick={getMovieList}>
        <span>Top 250 movies</span>
      </Link>

      <button
        className="filter-btn"
        onClick={() => {
          setShowFO(!showFilterOptions);
          document.body.classList.toggle("stop-scroll");
        }}
      >
        Filter
      </button>
      {showFilterOptions && (
        <Filter
          checked={checked}
          setChecked={setChecked}
          setShowFO={setShowFO}
        ></Filter>
      )}
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link
        to={`/`}
        className="search-btn"
        onClick={() => {
          if (search) loadSearch();
        }}
      >
        Search
      </Link>
    </div>
  );
};

export default NavbarComp;
