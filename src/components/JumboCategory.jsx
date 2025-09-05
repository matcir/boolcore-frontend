export default function JumboCategory({ title, description, link, img_cover }) {
	return (
		<>
			<div className="card-jumbo rounded-4 p-4 mb-4 mt-4 shadow-sm">
				<img className="mb-4" src={img_cover} alt="" style={{ width: "100%", borderRadius: "12px" }} />
				<h2 className="acid-text">{title}</h2>
				<p className="gray-text">{description}</p>
				<a href={link} className="btn btn-success">Scopri</a>
			</div>
		</>
	)
}