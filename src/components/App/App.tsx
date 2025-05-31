import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import ToasterMessage from "../Toaster/Toaster";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Movie | null>(null);

    async function handleFormSubmit(data: string) {
        setIsError(false);
        setIsLoading(true);
        setMovies([]);

        try {
            const res = await fetchMovies(data);
            if (res.length === 0) {
                const notify = () => toast.error("No movies found for your request.");
                notify();
            } else {
                setMovies(res);
            }
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    function selectCard(movie: Movie | null): void {
        setSelectedCard(movie);
    }

    return (
        <>
            <SearchBar onSubmit={handleFormSubmit} />
            <ToasterMessage />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            <MovieGrid onSelect={selectCard} movies={movies} />
            {selectedCard && <MovieModal movie={selectedCard} onClose={setSelectedCard} />}
        </>
    );
}
