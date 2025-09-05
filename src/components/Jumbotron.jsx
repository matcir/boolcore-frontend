export default function Jumbotron({ title, description }) {
	return <>
		<div className="jumbotron mt-5 p-5 bg-color-jumbo  rounded-4">
			<h1 className="display-4 acid-text">{title}</h1>
			<p className="leadn acid-text">{description}</p>
		</div>
	</>
}