export default function JumboCategory({ title, description, link }) {
	return (
		<>
			<div className="bg-light rounded-4 p-4 mb-4 mt-4 shadow-sm">
				<h2 className="acid-text">{title}</h2>
				<p>{description}</p>
				<a href={link} className="btn btn-success">Scopri</a>
			</div>
		</>
	)
}