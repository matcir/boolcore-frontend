import { Outlet } from "react-router-dom"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function DefaultLayout() {
	return (
		<>
			<Navbar />
			<main className="bg-color-boolcore">
				<Outlet />

			</main>
			<Footer />
		</>
	)
}