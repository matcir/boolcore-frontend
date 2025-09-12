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

                <div className="row">
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