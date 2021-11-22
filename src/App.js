import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  // function fetchMovieHanddler(){
  //   fetch('https://swapi.dev/api/films/')
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((data) => {
  //     const transformedMovies = data.results.map(movieData =>{
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_data,
  //       }
  //     })
  //     setMovies(transformedMovies)
  //   })
  // }

  // const fetchMovieHanddler = async () => {
  //   const res = await fetch("https://swapi.dev/api/films/");
  //   const data = await res.json();
  //   const transformedMovies = data.results.map((movieData) => {
  //     return {
  //       id: movieData.episode_id,
  //       title: movieData.title,
  //       openingText: movieData.opening_crawl,
  //       releaseDate: movieData.release_data,
  //     };
  //   });
  //   setMovies(transformedMovies);
  // };

  const fetchMovieHanddler = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("https://swapi.dev/api/films/");
      const data = await res.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_data,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false)
    } catch (err) {
      console.log("error: " + err.message);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHanddler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
