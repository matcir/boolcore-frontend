import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

export default function ThanksPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate])

    return (
        <div className="container py-5">
            <div className="card text-center py-5">
                <h1>GRAZIE PER IL TUO ORDINE.</h1>
                <p className="fs-4">Tra qualche secondo verrai reinderizzato alla Home Page.</p>
            </div>
        </div>
    )
}