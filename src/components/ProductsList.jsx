import { useState } from 'react';
import ProductsCard from './ProductsCard';
import Jumbotron from './Jumbotron';

export default function ProductsList({ products }) {
    const [viewMode, setViewMode] = useState('grid');

    console.log(products)
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
                            {products?.map((product, index) => (
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
                            {products?.map((product, index) => (
                                <div key={product?.id ?? index} className='d-flex flex-column'>
                                    <ProductsCard
                                        product={product}
                                        viewMode={viewMode}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </section>

        </>
    )
}