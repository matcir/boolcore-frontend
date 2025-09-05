export default function Footer() {
	return (
		<footer className="bg-color-boolcore p-4  ">
			<div className="container ">
				<img
					src="/logo.png"
					alt="BoolCore Logo"
					width="80"
					height="60"
					className="d-inline-block mb-2"
				/>
				<p className="acid-text mb-2">© {new Date().getFullYear()} BoolCore - Tutti i diritti riservati</p>
				<div>
					<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 acid-text">Facebook</a>
					<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 acid-text">Instagram</a>
					<a href="mailto:info@boolcore.com" className="mx-2 acid-text">Contattaci</a>
				</div>
			</div>
		</footer>
	);
}