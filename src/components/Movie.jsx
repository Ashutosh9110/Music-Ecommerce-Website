import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

const FIREBASE_URL = "https://react-movie-base-185d9-default-rtdb.firebaseio.com/movies";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const retryIntervalRef = useRef(null);

  // ✅ Fetch Movies from Firebase
  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${FIREBASE_URL}.json`);
      if (!response.ok) {
        throw new Error("Something went wrong... Retrying");
      }

      const data = await response.json();
      const loadedMovies = [];

      // Firebase returns an object, not an array
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);

      // ✅ Clear retry loop if success
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }
    } catch (err) {
      setError(err.message);

      // ✅ Retry every 5 seconds if it fails
      if (!retryIntervalRef.current) {
        retryIntervalRef.current = setInterval(fetchMovies, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    return () => {
      if (retryIntervalRef.current) clearInterval(retryIntervalRef.current);
    };
  }, [fetchMovies]);

  // ✅ Cancel Retry
  const cancelRetry = useCallback(() => {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
    setError("Retry cancelled by user.");
  }, []);

  // ✅ Add movie (POST to Firebase)
  const addMovieHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const openingText = e.target.openingText.value.trim();
    const releaseDate = e.target.releaseDate.value.trim();

    if (!title || !openingText || !releaseDate) {
      alert("Please fill all fields");
      return;
    }

    const newMovie = { title, openingText, releaseDate };

    try {
      const response = await fetch(`${FIREBASE_URL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) throw new Error("Failed to add movie"); 
      const data = await response.json();

      // ✅ Add movie locally with Firebase-generated ID
      setMovies((prev) => [...prev, { id: data.name, ...newMovie }]);
      e.target.reset();
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Delete movie (DELETE from Firebase)
  const deleteMovieHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${FIREBASE_URL}/${id}.json`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete movie");

      // ✅ Update state locally
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ Memoized Movie List
  const movieList = useMemo(
    () =>
      movies.map((movie) => (
        <li key={movie.id} className="mt-3" style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <h2>{movie.title}</h2>
          <h4>Release Date: {movie.releaseDate}</h4>
          <p>{movie.openingText}</p>
          <button className="btn btn-danger" onClick={() => deleteMovieHandler(movie.id)}>
            Delete
          </button>
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
            <button type="submit" className="btn btn-dark">Add Movie</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {/* Loader */}
      {isLoading && <p>Loading...</p>}

      {/* Error handling */}
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

      {/* Movies list */}
      {!isLoading && movies.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>{movieList}</ul>
      )}
    </div>
  );
};

export default Movie;
