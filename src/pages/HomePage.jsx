import Jumbotron from "../components/Jumbotron";
import JumboCategory from "../components/JumboCategory";
import LatestArrivals from "../components/LatestArrivals";
import BestSellers from "../components/BestSellers";

export default function HomePage() {
    return (
        <>

            <div className="container text-center">
                <div>
                    <span className='acid-text border border-danger p-2 rounded-2 text-uppercase'>💣Spedizione gratuita per ordini superiori a 99.99€💣</span>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <Jumbotron title="Benvenuto su BoolCore!" description="Scopri i nostri prodotti e le offerte speciali." />
                    </div>
                    <div className="col-md-4">
                        <JumboCategory
                            title="PC Fissi"
                            description="Scopri la nostra selezione di computer desktop."
                            link="/categories/pc-fissi"
                            img_cover="./img/desktop.jpg"
                        />
                    </div>
                    <div className="col-md-4">
                        <JumboCategory
                            title="Portatili"
                            description="Scopri la nostra selezione di computer Laptop."
                            link="/categories/portatili"
                            img_cover="./img/notebook.jpg"
                        />
                    </div>
                    <div className="col-md-4">
                        <JumboCategory
                            title="Accessori"
                            description="Tastiere, mouse, cuffie e molto altro per il tuo setup."
                            link="/categories/accessori"
                            img_cover="./img/accessori.jpg"
                        />
                    </div>


                    <section className="mt-4">
                        <h1 className="acid-text text-uppercase text-center">ultimi arrivi</h1>
                        <LatestArrivals />
                    </section>
                    <section className="mt-4">
                        <h1 className="acid-text text-uppercase text-center">più venduti</h1>
                        <BestSellers />
                    </section>

                </div>

            </div>

        </>
    );
}