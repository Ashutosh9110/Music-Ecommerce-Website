import React, { useState, useEffect, useRef } from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryIntervalRef = useRef(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      }));

      setMovies(transformedMovies);

      // ✅ If successful, clear retry loop
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }

    } catch (err) {
      setError(err.message);

      // ✅ If error, retry every 5 seconds (only set interval once)
      if (!retryIntervalRef.current) {
        retryIntervalRef.current = setInterval(fetchMovies, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Cancel retry manually
  const cancelRetry = () => {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
    setError("Retry cancelled by user.");
  };

  // Cleanup retry interval when unmounting
  useEffect(() => {
    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, []);

  return (
    <div className="text-center mt-4">
      <button onClick={fetchMovies} className="btn btn-primary">
        Fetch Movies
      </button>

      {isLoading && <p>Loading...</p>}
      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <p>{error}</p>
          {error.includes("Retrying") && (
            <button onClick={cancelRetry} className="btn btn-danger">
              Cancel Retry
            </button>
          )}
        </div>
      )}

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
    </div>
  );
};

export default Movie;
