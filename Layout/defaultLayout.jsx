import { Outlet } from "react-router-dom"

export default function defaultLayout() {
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