import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./ListPage";
import MovieDetails from "./MovieDetails";
import NavbarComp from "./NavbarComp";
import useAxios from "./useAxios";

function App() {
  const [movies, setMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState("Top 250 movies:");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    data: moviesData,
    isPending,
    error,
  } = useAxios("https://imdb-api.com/en/API/Top250Movies/k_81r0u9kp");

  useEffect(() => {
    if (!isPending && moviesData) {
      setMovies(moviesData.items);
    }
    if (error) {
      setErrorMsg(error.message);
    }
  }, [moviesData, isPending, error]);

  return (
    <Router>
      <NavbarComp
        setMovies={setMovies}
        search={search}
        setSearch={setSearch}
        setShownMovies={setShownMovies}
        checked={checked}
        setChecked={setChecked}
        setErrorMsg={setErrorMsg}
      ></NavbarComp>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ListPage
                movies={movies}
                shownMovies={shownMovies}
                search={search}
                checked={checked}
                error={errorMsg}
              />
            }
          />
          <Route path="/:id" element={<MovieDetails movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
