import { Link } from "react-router-dom"

export default function NotFoundPage() {
    return (
        <>
            <div className="container text-center py-5">
                <h1 className="text-light display-1">404</h1>
                <h3 className="acid-text">Oops!</h3>
                <h4 className="text-light">
                    Siamo spiacenti, questa pagina non esiste. Home sweet home?
                </h4>

                <Link to="/">
                    <button className="btn btn-success mt-4 px-4 py-2 rounded">
                        Torna alla Home
                    </button>
                </Link>
            </div>
        </>
    )
}