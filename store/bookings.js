import React, { createContext, useContext, useState, useCallback } from 'react';

const BookingsContext = createContext(null);

let counter = 1;

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = useCallback((booking) => {
    const id = `b${counter++}`;
    const record = { id, status: 'upcoming', createdAt: Date.now(), ...booking };
    setBookings((prev) => [record, ...prev]);
    return record;
  }, []);

  const cancelBooking = useCallback((id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  }, []);

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error('useBookings must be used within BookingsProvider');
  return ctx;
}
