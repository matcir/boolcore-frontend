import { Outlet } from "react-router-dom"

import Footer from "../src/components/Footer"

export default function DefaultLayout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}