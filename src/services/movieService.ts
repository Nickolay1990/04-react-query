import axios from "axios";
import { type Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

export interface MovieResults {
    results: Movie[];
    total_pages: number;
}

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;

export async function fetchMovies(data: string, page: number): Promise<MovieResults> {
    const params = {
        query: data,
        page,
    };

    const result = await axios.get<MovieResults>(`https://api.themoviedb.org/3/search/movie`, {
        params,
    });

    return result.data;
}
