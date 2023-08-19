import { FC, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Order } from './models/Order.ts';
import { fetchAllOrders } from './lib/api';
import './App.css';
import OrderDetails from "./components/OrderDetails";
import OrdersTable from "./components/OrdersTable";
import ApprovedOrdersReport from "./components/ApprovedOrdersReport";
import TravelingOrdersReport from "./components/TravelingOrdersReport";


const App: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function getOrders() {
            try {
                const fetchedOrders = await fetchAllOrders();
                const convertedOrders = fetchedOrders.map(order => ({
                    ...order,
                    createDate: new Date(order.createDate),
                    shippingPromise: new Date(order.shippingPromise)
                }));
                setOrders(convertedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }

        getOrders();
    }, []);

    return (
        <center className="container">
            <div className="app-bg">
                <Router>
                    <div className="app-content">
                        <h1 className="main-title">Order Management</h1>
                        {/* Navegación */}
                        <nav className="app-nav">
                            <Link className="nav-link" to="/"><span className="nav-icon">🏠</span> Home</Link>
                            <span className="nav-divider"> | </span>
                            <Link className="nav-link" to="/approved-orders-report"><span className="nav-icon">⏳</span> Close to Shipping Promise Report</Link>
                            <span className="nav-divider"> | </span>
                            <Link className="nav-link" to="/traveling-orders-report"><span className="nav-icon">🚚</span> Traveling Orders Report</Link>
                        </nav>
                        {/* Rutas */}
                        <Routes>
                            <Route path="/" element={<OrdersTable orders={orders} />} />
                            <Route path="/order/:id" element={<OrderDetails />} />
                            <Route path="/approved-orders-report" element={<ApprovedOrdersReport />} />
                            <Route path="/traveling-orders-report" element={<TravelingOrdersReport />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </center>
    );
};

export default App;
