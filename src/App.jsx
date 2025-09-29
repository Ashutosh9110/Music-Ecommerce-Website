import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Header from "./components/Header";
import About from "./components/About";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Home from "./components/Home";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Async/await version
  const fetchMovieHandler = async () => {
    try {
      setIsLoading(true); // show loader
      const response = await fetch("https://swapi.dev/api/films"); // ✅ use swapi.dev (correct API)
      if (!response.ok) {
        throw new Error("Failed to fetch movies!");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // hide loader
    }
  };

  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <div className="text-center mt-4">
                <button onClick={fetchMovieHandler} className="btn btn-primary">
                  Fetch Movies
                </button>

                {/* ✅ Loader */}
                {isLoading && <p>Loading...</p>}

                {/* ✅ Display movies once fetched */}
                {!isLoading && movies.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {movies.map((movie) => (
                      <li key={movie.id} className="mt-3">
                        <h2>{movie.title}</h2>
                        <h4>Release Date: {movie.releaseDate}</h4>
                        <p>{movie.openingText}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <h2 className="text-center mt-4">Products</h2>
                <Products />
              </div>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
