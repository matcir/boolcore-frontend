import { useState, useEffect } from "react";
import Smoke from "./Smoke";

export default function Presentaction() {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShow(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	if (!show) return null;

	return (
		<div style={{
			width: "100vw",
			height: "100vh",
			position: "fixed",
			top: 0,
			left: 0,
			zIndex: 9999,
			background: "#0b121f"
		}}>
			<Smoke key="presentation" height={window.innerHeight} textSize={60} textY={0} />
		</div>
	);
}