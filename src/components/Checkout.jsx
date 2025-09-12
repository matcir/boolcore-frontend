import { useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function Checkout() {
    const { items, total, totalItems } = useCart();

    const shippingConfig = {
        freeShippingThreshold: 100,
        shippingCost: 6.99
    };

    const freeShipping = total >= shippingConfig.freeShippingThreshold;
    const shippingPrice = freeShipping ? 0 : shippingConfig.shippingCost;
    const finalTotal = total + shippingPrice;
    const amountNeeded = shippingConfig.freeShippingThreshold - total;

    const [formData, setFormData] = useState({
        billing: {
            name: '',
            last_name: '',
            email: '',
            address: '',
            city: '',
            cap: '',
            country: 'Italia',
            payment_method: ''
        },
        shipping: {
            name: '',
            last_name: '',
            address: '',
            city: '',
            cap: '',
            country: 'Italia'
        },
        sameAsBilling: true
    });

    const handleInputChange = (e, section) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: value
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invoiceData = {
            name: formData.billing.name,
            last_name: formData.billing.last_name,
            email: formData.billing.email,
            address: formData.billing.address,
            city: formData.billing.city,
            cap: formData.billing.cap,
            country: formData.billing.country,
            payment: formData.billing.payment_method,
            products: items.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const response = await fetch('http://localhost:3000/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Ordine creato con successo!');
                console.log('Invoice creata:', result);
            } else {
                throw new Error('Errore nella creazione dell\'ordine');
            }
        } catch (error) {
            console.error('Errore:', error);
            alert('Si è verificato un errore durante il checkout');
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning text-center">
                    <h4>Il carrello è vuoto</h4>
                    <p>Non ci sono prodotti da acquistare.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <h1 className="mb-4">Checkout</h1>

            <div className="row">
                <div className="col-lg-4 order-lg-2 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Riepilogo Ordine</h5>
                        </div>
                        <div className="card-body">
                            {items.map(item => (
                                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <small className="d-block">{item.product_name}</small>
                                        <small className="text-muted">Qty: {item.quantity}</small>
                                    </div>
                                    <small>€ {(item.price * item.quantity).toFixed(2)}</small>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            <h6 className="mb-0">Prodotti nel carrello</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Prodotti ({totalItems})</span>
                                <span>€ {total.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Spedizione</span>
                                <span>
                                    {freeShipping ? (
                                        <span className="text-success">Gratuita</span>
                                    ) : (
                                        `€ ${shippingPrice.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            {!freeShipping && amountNeeded > 0 && (
                                <div className="alert alert-info py-2 mb-2">
                                    <small>
                                        <i className="bi bi-info-circle me-1"></i>
                                        Aggiungi € {amountNeeded.toFixed(2)}
                                        per la spedizione gratuita!
                                    </small>
                                </div>
                            )}
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                                <span>TOTALE</span>
                                <span>€ {finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-lg-8 order-lg-1">
                    <form onSubmit={handleSubmit}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">Dati di Fatturazione</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="billingName" className="form-label">Nome *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="billingName"
                                            name="name"
                                            value={formData.billing.name}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="billingLastName" className="form-label">Cognome *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="billingLastName"
                                            name="last_name"
                                            value={formData.billing.last_name}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="billingEmail" className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="billingEmail"
                                            name="email"
                                            value={formData.billing.email}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="billingTelefono" className="form-label">Telefono *</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="billingTelefono"
                                            name="telefono"
                                            value={formData.billing.telefono}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="billingAddress" className="form-label">Indirizzo *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="billingAddress"
                                        name="address"
                                        value={formData.billing.address}
                                        onChange={(e) => handleInputChange(e, 'billing')}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="billingCity" className="form-label">Città *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="billingCity"
                                            name="city"
                                            value={formData.billing.city}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="billingCAP" className="form-label">CAP *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="billingCAP"
                                            name="cap"
                                            value={formData.billing.cap}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="billingProvincia" className="form-label">Provincia *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="billingProvincia"
                                            name="provincia"
                                            value={formData.billing.provincia}
                                            onChange={(e) => handleInputChange(e, 'billing')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="paymentMethod" className="form-label">Metodo di Pagamento *</label>
                                    <select
                                        className="form-select"
                                        id="paymentMethod"
                                        name="payment_method"
                                        value={formData.billing.payment_method}
                                        onChange={(e) => handleInputChange(e, 'billing')}
                                        required
                                    >
                                        <option value="">Seleziona metodo</option>
                                        <option value="carta_credito">Carta di Credito</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bonifico">Bonifico Bancario</option>
                                        <option value="contrassegno">Contrassegno</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="sameAsBilling"
                                        name="sameAsBilling"
                                        checked={formData.sameAsBilling}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="sameAsBilling">
                                        Usa gli stessi dati per la spedizione
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                {!formData.sameAsBilling && (
                                    <>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="shippingName" className="form-label">Nome *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="shippingName"
                                                    name="name"
                                                    value={formData.shipping.name}
                                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="shippingLastName" className="form-label">Cognome *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="shippingLastName"
                                                    name="last_name"
                                                    value={formData.shipping.last_name}
                                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="shippingAddress" className="form-label">Indirizzo *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="shippingAddress"
                                                name="address"
                                                value={formData.shipping.address}
                                                onChange={(e) => handleInputChange(e, 'shipping')}
                                                required
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="shippingCity" className="form-label">Città *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="shippingCity"
                                                    name="city"
                                                    value={formData.shipping.city}
                                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="shippingCAP" className="form-label">CAP *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="shippingCAP"
                                                    name="cap"
                                                    value={formData.shipping.cap}
                                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="shippingProvincia" className="form-label">Provincia *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="shippingProvincia"
                                                    name="provincia"
                                                    value={formData.shipping.provincia}
                                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mb-4"></div>

                        <button type="submit" className="btn btn-dark btn-lg w-100">
                            Vai al Pagamento
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}