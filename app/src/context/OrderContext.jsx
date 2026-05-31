import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../api.js";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user, token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createOrder(events) {
    const response = await fetch(api("/orders"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ userId: user.id, events }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order!");
    }

    const order = await response.json();
    return order;
  }

  async function getOrders() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(api("/orders"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const orders = await response.json();
      const userOrders = orders.filter(order => order.userId === user.id);
      setOrders(userOrders);
    } catch (err) {
      setError(err.message || "An error occurred while fetching orders");
    } finally {
      setIsLoading(false);
    }
  }
      

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        getOrders,
        orders,
        isLoading,
        error
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}