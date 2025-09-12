import { Link } from "react-router-dom";

export default function JumboCategory({ title, description, link, img_cover }) {
	return (
		<div className="card-jumbo rounded-4 p-4 mb-4 mt-4 shadow-sm">
			<img
				className="mb-4"
				src={img_cover}
				alt={title}
				style={{
					width: "100%",
					height: "250px",
					objectFit: "cover",
					borderRadius: "12px"
				}}
			/>
			<h2 className="acid-text">{title}</h2>
			<p className="gray-text">{description}</p>
			<Link to={link} className="btn btn-success">Scopri</Link>
		</div>
	);
}