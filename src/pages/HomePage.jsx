import Jumbotron from "../components/Jumbotron";
import JumboCategory from "../components/JumboCategory";
import LatestArrivals from "../components/LatestArrivals";
import BestSellers from "../components/BestSellers";
import Smoke from "../Layout/Smoke";

export default function HomePage() {
    return (
        <>

            <div className=" text-center">
                <Jumbotron
                    title="Benvenuto!"
                    description="Scopri le nostre offerte."
                    hero={<Smoke key="hero" height={500} textSize={80} textY={140} />}
                />
            </div>
            <div className="container text-center">

                <div className="row align-items: center;">

                    <div className="col-md-4 d-flex">
                        <JumboCategory
                            title="PC Fissi"
                            description="Scopri la nostra selezione di computer desktop."
                            link="/categories/pc-fissi"
                            img_cover="./img/desktop.jpg"
                        />
                    </div>
                    <div className="col-md-4 d-flex">
                        <JumboCategory
                            title="Portatili"
                            description="Scopri la nostra selezione di computer Laptop."
                            link="/categories/portatili"
                            img_cover="./img/notebook.jpg"
                        />
                    </div>
                    <div className="col-md-4 d-flex">
                        <JumboCategory
                            title="Accessori"
                            description="Tastiere, mouse, cuffie e molto altro per il tuo setup."
                            link="/categories/accessori"
                            img_cover="./img/accessori.jpg"
                        />
                    </div>


                    <section className="mt-4">
                        <h1 className="acid-text text-uppercase text-center mb-2 mt-5">ultimi arrivi</h1>
                        <LatestArrivals />
                    </section>
                    <section className="mt-4 mb-5">
                        <h1 className="acid-text text-uppercase text-center mb-2 mt-5">più venduti</h1>
                        <BestSellers />
                    </section>

                </div>

            </div>

        </>
    );
}