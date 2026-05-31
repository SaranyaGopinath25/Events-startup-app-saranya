import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import styles from "./OrdersPage.module.css";
import { useOrder } from "../../context/OrderContext.jsx";
import { useEvents } from "../../hooks/useEvents.js";
import { FaRegCalendarAlt, FaBuilding } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const OrdersPage = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const { orders, isLoading, error, getOrders } = useOrder();

    console.log("Orders:", orders);

    const { data: events } = useEvents(api("/events"));

   useEffect(() => {
    if (user) {
        getOrders();
    }
}, [user]);

    if (!user) {
        return null; // Redirecting
    }

    if (isLoading) {
        return (
            <div className={styles.ordersPage}>
                <h1>My Orders</h1>
                <div className={styles.loadingContainer}>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.ordersPage}>
                <h1>My Orders</h1>
                <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className={styles.ordersPage}>
                <h1>My Orders</h1>
                <div className={styles.emptyOrders}>
                    <p>You haven't placed any orders yet.</p>
                    <p>Start shopping and create your first order!</p>
                </div>
            </div>
        );
    }

    const getEventById = (id) => {
    return events?.find(event => event.id === id);
};

    return (
        <div className={styles.ordersPage}>
            <h1>My Orders</h1>

            <div className={styles.ordersList}>
                {orders.map((order,index) => (
                    <div key={order.id} className={styles.orderCard}>
                        <div className={styles.orderHeader}>
                            <div className={styles.orderInfo}>
                                <h3>Order #{index + 1}</h3>
                                <h4>{getEventById(order.events[0]?.id)?.name}</h4>
                                <span><FaRegCalendarAlt /> {getEventById(order.events[0]?.id)?.date}   </span>    
                                <span>    <IoTime /> {getEventById(order.events[0]?.id)?.time}</span>
                                <p><FaBuilding /> {getEventById(order.events[0]?.id)?.venue}, {getEventById(order.events[0]?.id)?.city}</p>
                                
                            </div>
                        </div>

                        <div className={styles.orderDetails}>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Tickets:</span>
                                <span className={styles.value}>{order.events[0]?.quantity || 0}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Price:</span>
                                <span className={styles.value}>{getEventById(order.events[0]?.id)?.price || 0}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.label}>Total:</span>
                                <span className={styles.value}>{getEventById(order.events[0]?.id)?.price * order.events[0]?.quantity || 0} DKK</span>
                            </div>
                        </div>

                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
