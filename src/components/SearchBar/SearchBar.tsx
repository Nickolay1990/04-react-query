import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
    onSubmit: (data: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    function checkInput(formData: FormData) {
        const inputData = formData.get("query") as string;
        if (!inputData.trim()) {
            toast.error("Please enter your search query");
            return;
        }
        onSubmit(inputData);
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a className={styles.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                    Powered by TMDB
                </a>
                <form className={styles.form} action={checkInput}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}
