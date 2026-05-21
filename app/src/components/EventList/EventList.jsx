// import events from "../../data/events.js";
import { useEvents } from "../../hooks/useEvents.js";
import EventCard from "../EventCard/EventCard.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Pagination from "../Pagination/Pagination.jsx"
import styles from "./EventList.module.css";
import { useState } from "react";
import api from "../../api.js";
import { Link } from "react-router-dom";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {


const { data: events, isLoading } = useEvents(api("/events"));

  const [searchInput, setSearchInput] = useState("");
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.city.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

      <ul className={styles.list}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </>
  );
}
