import Jumbotron from "../components/Jumbotron";
import JumboCategory from "../components/JumboCategory";
import LatestArrivals from "../components/LatestArrivals";

export default function HomePage() {
    return (
        <>
            <div className="bg-color-boolcore">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <Jumbotron title="Benvenuto su BoolCore!" description="Scopri i nostri prodotti e le offerte speciali." />
                        </div>
                        <div className="col-md-4">
                            <JumboCategory
                                title="PC Fissi"
                                description="Scopri la nostra selezione di computer desktop."
                                link="/products?category=pc"
                                img_cover="./img/desktop.jpg"
                            />
                        </div>
                        <div className="col-md-4">
                            <JumboCategory
                                title="Portatili"
                                description="Scopri la nostra selezione di computer Laptop."
                                link="/products?category=portatili"
                                img_cover="./img/notebook.jpg"
                            />
                        </div>
                        <div className="col-md-4">
                            <JumboCategory
                                title="Accessori"
                                description="Tastiere, mouse, cuffie e molto altro per il tuo setup."
                                link="/products?category=accessori"
                                img_cover="./img/accessori.jpg"
                            />
                        </div>
                    </div>
                    <section className="mt-3">
                        <h1 className="acid-text text-uppercase text-center">ultimi arrivi</h1>
                        <LatestArrivals />
                    </section>
                </div>
            </div>
        </>
    );
}