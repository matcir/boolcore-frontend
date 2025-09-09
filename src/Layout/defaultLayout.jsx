import { Outlet } from "react-router-dom"

import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Jumbotron from "../components/Jumbotron"

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