import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const retryIntervalRef = useRef(null);

  // ✅ Fetch movies
  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("https://react-movie-base-185d9-default-rtdb.firebaseio.com/movies.json");
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

      // ✅ Clear retry loop if successful
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }
    } catch (err) {
      setError(err.message);

      // ✅ Retry every 5 seconds
      if (!retryIntervalRef.current) {
        retryIntervalRef.current = setInterval(fetchMovies, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Fetch on mount
  useEffect(() => {
    fetchMovies();
    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, [fetchMovies]);

  // ✅ Cancel retry
  const cancelRetry = useCallback(() => {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
    setError("Retry cancelled by user.");
  }, []);

  // ✅ Add movie manually
  const addMovieHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const openingText = e.target.openingText.value.trim();
    const releaseDate = e.target.releaseDate.value.trim();

    if (!title || !openingText || !releaseDate) {
      alert("Please fill all fields");
      return;
    }

    const newMovie = {
      id: Math.random().toString(),
      title,
      openingText,
      releaseDate,
    };

    setMovies((prev) => [...prev, newMovie]);
    e.target.reset();
    setShowForm(false); // hide form after adding
  };

  // ✅ Memoize movie list
  const movieList = useMemo(
    () =>
      movies.map((movie) => (
        <li key={movie.id} className="mt-3">
          <h2>{movie.title}</h2>
          <h4>Release Date: {movie.releaseDate}</h4>
          <p>{movie.openingText}</p>
        </li>
      )),
    [movies]
  );

  return (
    <div className="text-center mt-4">
      {/* ✨ Add Movie Button or Form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn btn-success mb-4">
          Do you have any amazing movies for us?
        </button>
      ) : (
        <form
          onSubmit={addMovieHandler}
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            textAlign: "left",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <div className="mb-3">
            <label>Title</label>
            <input name="title" type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label>Opening Text</label>
            <textarea name="openingText" className="form-control" rows="3"></textarea>
          </div>

          <div className="mb-3">
            <label>Release Date</label>
            <input name="releaseDate" type="text" className="form-control" />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-dark">
              Add Movie
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ✅ Loader */}
      {isLoading && <p>Loading...</p>}

      {/* ✅ Error handling */}
      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <p>{error}</p>
          {error.includes("Retrying") && (
            <button onClick={cancelRetry} className="btn btn-danger mt-2">
              Cancel Retry
            </button>
          )}
        </div>
      )}

      {/* ✅ Movies list */}
      {!isLoading && movies.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>{movieList}</ul>
      )}
    </div>
  );
};

export default Movie;
