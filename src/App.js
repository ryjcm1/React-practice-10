import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie"
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState(false)

  const fetchMovieHanddler = useCallback (async() => {
    try {
      setIsLoading(true)
      // const res = await fetch("https://swapi.dev/api/films/");
      const res = await fetch("https://react-practice-10-default-rtdb.firebaseio.com/movies.json")
      if(!res.ok){
        throw new Error('Something went wrong')
      }
      const data = await res.json();

      //tranform data since grabbing from firebase real time storage
      const loadedMovies = []
      for(const key in data){
        loadedMovies.push({
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(loadedMovies);
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, []);

  useEffect(()=>{
    fetchMovieHanddler();
  }, [fetchMovieHanddler]);

  const addMovieHandler = async(movie) =>{
     const res = await fetch('https://react-practice-10-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    const data = await res.json();
    console.log(data)
  }

  let content = <p>Found no movies.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHanddler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
