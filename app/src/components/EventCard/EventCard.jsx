import styles from "./EventCard.module.css";
import { FaRegCalendarAlt, FaBuilding } from "react-icons/fa";
import { IoTime } from "react-icons/io5";


const EventCard = ({ event }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{event.category}</span>
        {event.soldOut && <span className={styles.soldOut}>Sold Out</span>}
      </div>
      <h3 className={styles.title}>{event.name}</h3>
      <p>
        <FaRegCalendarAlt /> {event.date} • <IoTime /> {event.time}
      </p>
      <p>
        <FaBuilding /> {event.venue}, {event.city}
      </p>
      {/* <p>{event.description.slice(0, 100)}...</p> */}
      <div className={styles.footer}>
        <span className={styles.price}>
          {event.price === 0 ? "Free " : `${event.price} DKK `}
        </span>{" "}
        |{" "}
        <span>
          {event.ticketAvailable > 0
            ? `${event.ticketAvailable} tickets left`
            : " Sold Out"}
        </span>
      </div>
    </div>
  );
};
export default EventCard;
