import Jumbotron from "../components/Jumbotron";
import JumboCategory from "../components/JumboCategory";

export default function HomePage() {
    return (
        <>
            <div className="bg-color-boolcore">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Jumbotron title=" Benvenuto su BoolCore!" description="Scopri i nostri prodotti e le offerte speciali." />
                        </div>
                        <div className="col-md-6">
                            <JumboCategory
                                title="PC Fissi  "
                                description="Scopri la nostra selezione di computer desktop."
                                link="/products?category=pc"
                            />
                        </div>
                        <div className="col-md-6">
                            <JumboCategory
                                title="Portatili"
                                description="Scopri la nostra selezione di computer Laptop."
                                link="/products?category=accessori"
                            />
                        </div>
                        <div className="col-md-6">
                            <JumboCategory
                                title="Accessori"
                                description="Tastiere, mouse, cuffie e molto altro per il tuo setup."
                                link="/products?category=accessori"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}