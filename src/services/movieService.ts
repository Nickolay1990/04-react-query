import axios from "axios";
import { type Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResults {
    results: Movie[];
}

export async function fetchMovies(data: string): Promise<Movie[]> {
    const result = await axios.get<MovieResults>(`https://api.themoviedb.org/3/search/movie?query=${data}`, {
        headers: { Authorization: `Bearer ${myKey}` },
    });
    return result.data.results;
}
