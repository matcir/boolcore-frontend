export default function Jumbotron({ title, description, hero }) {
	return (
		<div
			className="jumbotron-wrapper position-relative"
			style={{
				width: "100%",
				height: "430px",
				margin: "0 auto",
				overflow: "hidden"
			}}
		>
			{hero && (
				<div className="jumbotron-hero-bg position-absolute w-100 h-100" style={{ zIndex: 0, overflow: "hidden" }}>
					{hero}
				</div>
			)}
			<div
				className="jumbotron p-3 bg-color-jumbo rounded-4"
				style={{
					position: "absolute",
					left: "50%",
					top: "180px",
					transform: "translateX(-50%)",
					zIndex: 1,
					maxWidth: '550px'
				}}
			>
				<h1 className="display-5 acid-text">{title}</h1>
				<p className="acid-text">{description}</p>
				<div className="mt-4 mb-4">
					<span className='acid-text led-border p-2 rounded-2 text-uppercase mt-5 mb-5'>
						💣Spedizione gratuita per ordini superiori a 99.99€💣
					</span>
				</div>
			</div>
		</div>
	);
}