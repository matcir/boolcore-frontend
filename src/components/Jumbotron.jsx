export default function Jumbotron({ title, description }) {
	return <>
		<div className="jumbotron mt-5 p-5 bg-color-jumbo  rounded-4">
			<h1 className="display-3 acid-text">{title}</h1>
			<p className=" acid-text">{description}</p>
		</div>
	</>
}