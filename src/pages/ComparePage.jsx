import { useEffect, useState } from "react";
import { useCompare } from "../contexts/CompareContext";
import { Link } from "react-router-dom";

const toSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export default function ComparePage() {
    const { compareItems, removeFromCompare, clearCompare } = useCompare();
    const [detailedProducts, setDetailedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetailedProducts = async () => {
            if (compareItems.length === 0) {
                setDetailedProducts([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const promises = compareItems.map(product => {
                    const slug = product.slug || toSlug(product.product_name || product.name || '');
                    return fetch(`http://localhost:3000/api/products/${slug}`)
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`Errore ${res.status}: ${res.statusText}`);
                            }
                            return res.json();
                        })
                        .catch(error => {
                            console.error('Errore nel caricamento del prodotto:', error);
                            return { error: true, message: error.message, product };
                        });
                });

                const results = await Promise.all(promises);
                const successfulResults = results.filter(result => !result.error);
                setDetailedProducts(successfulResults);
                const failedResults = results.filter(result => result.error);
                if (failedResults.length > 0) {
                    failedResults.forEach(failed => {
                        removeFromCompare(failed.product.id);
                    });
                }

            } catch (error) {
                console.error('Errore nel caricamento dei dettagli:', error);
                setError('Errore nel caricamento dei prodotti');
            } finally {
                setLoading(false);
            }
        };

        fetchDetailedProducts();
    }, [compareItems, removeFromCompare]);

    if (loading) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center ">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container ">
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    if (compareItems.length === 0) {
        return (
            <div className="container ">
                <div className="text-center pt-5">
                    <i className="bi bi-bar-chart display-1 text-muted"></i>
                    <h2 className="mt-3">Nessun prodotto da confrontare</h2>
                    <p className="text-muted">Aggiungi alcuni prodotti per iniziare il confronto</p>
                    <Link to="/" className="btn btn-primary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Torna ai prodotti
                    </Link>
                </div>
            </div>
        );
    }

    const getFieldValue = (product, field) => {
        if (product.details && product.details[field]) {
            return product.details[field];
        }
        if (product[field]) {
            return product[field];
        }
        return '-';
    };

    const formatFieldName = (fieldName) => {
        const fieldMap = {
            product_name: 'Nome Prodotto',
            price: 'Prezzo',
            description: 'Descrizione',
            category: 'Categoria',
            ram: 'RAM',
            processor: 'Processore',
            storage: 'Storage',
            graphic_card: 'Scheda Grafica',
            os: 'Sistema Operativo',
            psu: 'Alimentatore',
            case: 'Case',
            motherboard: 'Scheda Madre',
            inches: 'Dimensioni (pollici)',
            color: 'Colore',
            dpi: 'DPI',
            audio_type: 'Tipo Audio',
            impedance: 'Impedenza',
            connectivity: 'Connettività',
            keyboard_layout: 'Layout Tastiera',
            keyboard_type: 'Tipo Tastiera',
            frequency: 'Frequenza'
        };
        return fieldMap[fieldName] || fieldName;
    };

    const getAllFields = () => {
        const fields = new Set();
        detailedProducts.forEach(product => {
            ['product_name', 'price', 'description', 'category'].forEach(field => fields.add(field));
            if (product.details) {
                Object.keys(product.details).forEach(key => fields.add(key));
            }
        });
        return Array.from(fields);
    };

    const allFields = getAllFields();

    return (
        <div className="container pt-5">
            <div className="d-flex justify-content-between align-items-center text-light mb-4">
                <div>
                    <h1>
                        <i className="bi bi-bar-chart me-2"></i>
                        Confronto Prodotti
                    </h1>
                </div>
                <div>
                    <button
                        className="btn btn-outline-danger me-2"
                        onClick={clearCompare}
                    >
                        <i className="bi bi-trash me-1"></i>
                        Pulisci tutto
                    </button>
                    <Link to="/products" className="btn btn-outline-primary">
                        <i className="bi bi-plus me-1"></i>
                        Aggiungi prodotti
                    </Link>
                </div>
            </div>
            <div className="d-none d-md-block">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col" style={{ width: '200px' }}>Caratteristiche</th>
                                {detailedProducts.map((product, index) => (
                                    <th key={index} scope="col" className="text-center">
                                        <div className="position-relative">
                                            <img
                                                src={`http://localhost:3000/${product.images?.[0]}`}
                                                alt={product.product_name}
                                                className="img-fluid rounded mb-2"
                                                style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                                }}
                                            />
                                            <button
                                                className="btn btn-sm btn-outline-light position-absolute top-0 end-0"
                                                onClick={() => removeFromCompare(product.id)}
                                                title="Rimuovi dal confronto"
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
                                        </div>
                                        <h6 className="mb-0">{product.product_name}</h6>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allFields.map((field, fieldIndex) => (
                                <tr key={fieldIndex}>
                                    <td className="fw-bold bg-light">{formatFieldName(field)}</td>
                                    {detailedProducts.map((product, productIndex) => (
                                        <td key={productIndex} className="text-center">
                                            {field === 'price' && getFieldValue(product, field) !== '-'
                                                ? `€${parseFloat(getFieldValue(product, field)).toFixed(2)}`
                                                : getFieldValue(product, field)
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-md-none">
                <div className="row">
                    {detailedProducts.map((product, index) => (
                        <div key={index} className="col-12 mb-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`http://localhost:3000/${product.images?.[0]}`}
                                            alt={product.product_name}
                                            className="img-fluid rounded me-3"
                                            style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                                            }}
                                        />
                                        <h6 className="mb-0">{product.product_name}</h6>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removeFromCompare(product.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                                <div className="card-body">
                                    {allFields.map((field, fieldIndex) => (
                                        <div key={fieldIndex} className="row mb-2">
                                            <div className="col-5 fw-bold">{formatFieldName(field)}:</div>
                                            <div className="col-7">
                                                {field === 'price' && getFieldValue(product, field) !== '-'
                                                    ? `€${parseFloat(getFieldValue(product, field)).toFixed(2)}`
                                                    : getFieldValue(product, field)
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}