import { Link, useNavigate } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCartItems } from "../../context/CartContext.jsx";
import styles from "./Header.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { CgLogOff } from "react-icons/cg";


const Header = () => {
  const { user, logout } = useAuth();
  const { cartQuantity } = useCartItems();
  console.log("Header user:", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (email) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a
          href="https://www.hackyourfuture.dk/"
          target="_blank"
          className="link"
        >
          <img
            src={hyfLogo}
            alt="HackYourFuture logo"
            className={styles.logo}
          />
        </a>
        {/* Navigation links go here — e.g. link to event list, cart, login */}
        <div className={styles.links}>
          <Link to="/events" className={styles.link}>
            Events
          </Link>

          {user ? (
            <>
              <Link to="/cart" className={styles.cartLink}>
                <FaShoppingCart size={20} />
                {/* <span className={styles.cartIcon}>🛒</span> */}
                {cartQuantity > 0 && (
                  <span className={styles.cartBadge}>{cartQuantity}</span>
                )}
              </Link>

                <Link to="/orders" className={styles.link}>
              <div className={styles.userSection}>
                <div className={styles.avatar}>{getInitials(user?.email)}</div>
              </div>
              </Link>
              <button onClick={handleLogout}>
                <CgLogOff size={25} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
