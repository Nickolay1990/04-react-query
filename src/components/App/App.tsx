import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { type MovieResults } from "../../services/movieService";
import css from "./App.module.css";

export default function App() {
    const [selectedCard, setSelectedCard] = useState<Movie | null>(null);
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isPending, isError, isSuccess } = useQuery<MovieResults>({
        queryKey: ["movies", keyword, currentPage],
        queryFn: () => fetchMovies(keyword, currentPage),
        enabled: keyword !== "",
        placeholderData: keepPreviousData,
    });

    const totalPages: number = data?.total_pages ?? 1;

    useEffect(() => {
        if (data?.results.length === 0) {
            toast.error("No movies found for your request.");
        }
    }, [data]);

    function handleFormSubmit(searchWord: string) {
        setKeyword(searchWord);
        setCurrentPage(1);
    }

    function selectCard(movie: Movie | null): void {
        setSelectedCard(movie);
    }

    return (
        <>
            <SearchBar onSubmit={handleFormSubmit} />
            <Toaster />
            {isSuccess && totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                    forcePage={currentPage - 1}
                    containerClassName={css.pagination}
                    activeClassName={css.active}
                    nextLabel="→"
                    previousLabel="←"
                />
            )}

            {isPending && keyword !== "" && <Loader />}
            {isError && <ErrorMessage />}
            {isSuccess && <MovieGrid onSelect={selectCard} movies={data.results} />}
            {selectedCard && <MovieModal movie={selectedCard} onClose={() => setSelectedCard(null)} />}
        </>
    );
}
