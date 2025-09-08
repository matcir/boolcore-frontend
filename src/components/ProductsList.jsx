import { useState } from 'react';
import ProductsCard from './ProductsCard';

export default function ProductsList({ products }) {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div>
            <div className="d-flex justify-content-end gap-2 mb-4 view-toggle">
                <button
                    className={`btn ${viewMode === 'grid' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setViewMode('grid')}
                >
                    <i className="bi bi-grid-3x3-gap"></i> Griglia
                </button>
                <button
                    className={`btn ${viewMode === 'list' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setViewMode('list')}
                >
                    <i className="bi bi-list"></i> Lista
                </button>
            </div>
            {viewMode === 'grid' ? (
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
                <div className="d-flex flex-column gap-3">
                    {products?.map((product, index) => (
                        <ProductsCard
                            key={product?.id ?? index}
                            product={product}
                            viewMode={viewMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}