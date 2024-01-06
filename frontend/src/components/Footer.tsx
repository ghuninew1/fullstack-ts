import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="h-footer w-full p-2 text-center text-sm text-neutral-600 shadow-lg shadow-slate-700 dark:text-neutral-300 dark:shadow-slate-500">
            © 2023 Copyright:
            <Link
                className="ml-2 text-neutral-700 dark:text-neutral-300"
                to={"/"}
            >
                GhuniNew©
            </Link>
        </footer>
    );
}
