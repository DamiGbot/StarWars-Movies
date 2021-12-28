import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
	const [movies, setMovies] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);

		try {
			const res = await fetch("https://swapi.dev/api/films/");
			if (!res.ok) {
				throw new Error("Something went Wrong!!!");
			}
			const data = await res.json();

			const transformedMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					releaseDate: movieData.release_date,
					openingText: movieData.opening_crawl,
				};
			});
			setMovies(transformedMovies);
		} catch (err) {
			setError(err.message);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	let content = <p>Fetch Movies...</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading Files...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
};

export default App;
