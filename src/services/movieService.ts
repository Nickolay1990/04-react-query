import axios from "axios";
import { type Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

export interface MovieResults {
    results: Movie[];
    total_pages: number;
}

export async function fetchMovies(data: string, page: number): Promise<MovieResults> {
    const params = {
        query: data,
        page,
    };

    const result = await axios.get<MovieResults>(`https://api.themoviedb.org/3/search/movie`, {
        params,
        headers: { Authorization: `Bearer ${myKey}` },
    });

    return result.data;
}
