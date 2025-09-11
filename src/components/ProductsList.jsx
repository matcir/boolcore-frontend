import { useState } from 'react';
import ProductsCard from './ProductsCard';
import Jumbotron from './Jumbotron';

const PAGE_SIZE = 20;

export default function ProductsList({ products }) {
    const [viewMode, setViewMode] = useState('grid');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    };

    const visibleProducts = products?.slice(0, visibleCount);

    return (
        <>
            <section >


                <div className="container">
                    <div className="d-flex justify-content-end gap-2 mb-4 view-toggle">
                        <button
                            className={`btn ${viewMode === 'grid' ? 'btn-light' : 'btn-outline-light'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <i className="bi bi-grid-3x3-gap"></i> Griglia
                        </button>
                        <button
                            className={`btn ${viewMode === 'list' ? 'btn-light' : 'btn-outline-light'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <i className="bi bi-list"></i> Lista
                        </button>
                    </div>

                    {viewMode === 'grid' ? ( //GRIGLIA
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                            {visibleProducts?.map((product, index) => (
                                <div key={product?.id ?? index} className="col">
                                    <ProductsCard
                                        product={product}
                                        viewMode={viewMode}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        //LISTA
                        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 g-3">
                            {visibleProducts?.map((product, index) => (
                                <div key={product?.id ?? index} className='d-flex flex-column'>
                                    <ProductsCard
                                        product={product}
                                        viewMode={viewMode}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {visibleCount < products?.length && (
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-primary m-3" onClick={handleLoadMore}>
                                Carica altri
                            </button>
                        </div>
                    )}
                </div>


            </section>

        </>
    )
}