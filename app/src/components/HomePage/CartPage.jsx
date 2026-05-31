
import { useEffect, useState } from "react";
import { useCartItems } from "../../context/CartContext.jsx";
import events from "../../data/events.js";
import styles from "./CartPage.module.css";
import { useOrder } from "../../context/OrderContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaRegCalendarAlt, FaBuilding } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const CartPage = () => {
    const { user } = useAuth();
    const { cartItems, removeFromCart, addToCart, clearCart } = useCartItems();
    const { createOrder } = useOrder();
    const [cartDetails, setCartDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Combine cart items with event details
        const details = cartItems.map(cartItem => {
            const event = events.find(e => e.id === cartItem.id);
            return {
                ...cartItem,
                event: event
            };
        });
        setCartDetails(details);

        // Calculate total price
        const total = details.reduce((sum, item) => {
            return sum + (item.event?.price || 0) * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    if (cartDetails.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h2>Your Cart is Empty</h2>
                <p>No events added yet. Start exploring!</p>
            </div>
        );
    }

    function handleCheckout() {
    if (!user) {
      setError("You must be logged in to checkout!");
      return;
    }
    createOrder(cartItems);
    clearCart();
    navigate("/orders");
    // clearCart();
  }



    return (
        <div className={styles.cartPage}>
            <h1>Shopping Cart</h1>
            
            <div className={styles.cartContainer}>
                <div className={styles.cartItems}>
                    {cartDetails.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            {item.event?.image && (
                                <img 
                                    src={item.event.image} 
                                    alt={item.event.name}
                                    className={styles.itemImage}
                                />
                            )}
                            <div className={styles.itemInfo}>
                                <h3>{item.event?.name}</h3>
                                <p className={styles.eventDetails}>
                                    <FaRegCalendarAlt /> {item.event?.date} • <IoTime /> {item.event?.time}
                                </p>
                                <p className={styles.venue}>
                                    <FaBuilding /> {item.event?.venue}, {item.event?.city}
                                </p>
                            </div>

                            <div className={styles.priceQuantity}>
                                <span className={styles.price}>
                                    {item.event?.price === 0 ? "Free" : `${item.event?.price} DKK`}
                                </span>
                                
                                <div className={styles.quantityControl}>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className={styles.btnMinus}
                                    >
                                        −
                                    </button>
                                    <span className={styles.quantity}>{item.quantity}</span>
                                    <button 
                                        onClick={() => addToCart(item.id)}
                                        className={styles.btnPlus}
                                    >
                                        +
                                    </button>
                                </div>

                                <span className={styles.subtotal}>
                                    {item.event?.price === 0 ? "Free" : `${(item.event?.price * item.quantity)} DKK`}
                                </span>
                            </div>

                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className={styles.removeBtn}
                                title="Remove from cart"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.cartSummary}>
                    <h2>Order Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                        <span>{totalPrice} DKK</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className={styles.summaryTotal}>
                        <span>Total</span>
                        <span>{totalPrice} DKK</span>
                    </div>
                    <button className={styles.checkoutBtn} onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;