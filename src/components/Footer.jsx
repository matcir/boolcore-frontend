import { Link } from "react-router-dom";
export default function Footer() {
	return (
		<footer className="bg-color-footer p-4">
			<div className="container">
				<img
					src="/logo.png"
					alt="BoolCore Logo"
					width="80"
					height="60"
					className="d-inline-block mb-2"
				/>
				<div className="d-flex d-flex justify-content-between align-items-center flex-wrap mt-3 ">
					<ul className="list-unstyled d-flex mb-0">
						<li><a href="/products?category=pc" className="acid-text mx-2">PC Fissi</a></li>
						<li><a href="/products?category=portatili" className="acid-text mx-2">Portatili</a></li>
						<li><a href="/products?category=accessori" className="acid-text mx-2">Accessori</a></li>
					</ul>
					<div>
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 acid-text"><i className="bi bi-facebook m-1"></i>Facebook</a>
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 acid-text"><i className="bi bi-instagram m-1"></i>Instagram</a>
						<a href="mailto:info@boolcore.com" className="mx-2 acid-text">Contattaci</a>
					</div>
				</div>
				<p className="acid-text mb-2 mt-3">© {new Date().getFullYear()} BoolCore - Tutti i diritti riservati</p>
			</div>
		</footer>
	);
}