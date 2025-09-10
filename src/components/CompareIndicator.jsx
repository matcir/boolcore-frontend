import { Link } from "react-router-dom";
import { useCompare } from "../contexts/CompareContext";

export default function CompareIndicator() {
    const { compareCount } = useCompare();

    if (compareCount === 0) {
        return null;
    }

    return (
        <Link
            to="/confronta"
            className="btn btn-outline-primary position-relative me-2"
            title="Vai al confronto prodotti"
        >
            <i className="bi bi-bar-chart"></i>
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                {compareCount}
            </span>

        </Link>
    );
}