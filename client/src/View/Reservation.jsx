import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths, isBefore, addDays } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay } from "date-fns";
import "./Reservation.css";
import { Link } from "react-router-dom";
import { fetchProducts } from '../service/ApiService';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="rv-header">
      <div className="col col-start">
        <span className="rv-year">{format(currentMonth, "yyyy")}</span>
        <p className="rv-month">{format(currentMonth, "M")}월</p>
      </div>
      <div className="col col-end">
        <Icon
          icon="bi:arrow-left-circle-fill"
          className="rv-icon"
          onClick={prevMonth}
        />
        <Icon
          icon="bi:arrow-right-circle-fill"
          className="rv-icon"
          onClick={nextMonth}
        />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col Reservation-days-col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="body rv-row rv-days">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, products }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const today = new Date();

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const isPastDate = isBefore(addDays(day, 1), today); // 수정된 부분
      const isDisabled = !isSameMonth(day, monthStart);
      const isCurrentMonth = isSameMonth(day, currentMonth);
      days.push(
        <div
          className={`col rv-cell ${
            isDisabled
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : isPastDate
              ? "rv-not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              isDisabled || isPastDate ? "text rv-not-valid" : ""
            }
          >
            {formattedDate}
            <br />
            {isPastDate ? (
              <div className="rv-finish">
                <p className="rv-finish-text">예약종료</p>
              </div>
            ) : (
              isCurrentMonth && (
                <div className="rv-camping-box">
                  {products.map((product) => (
                    <div key={product.productId}>
                      <Link to={`/ReservationPayment/${product.name}`} className="rv-camping-link">
                        {product.name}
                      </Link>
                      <br />
                    </div>
                  ))}
                </div>
              )
            )}
          </span>
        </div>
      );
      day = addDays(day, 1);
    } 
    rows.push(
      <div className="rv-row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const Reservation = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        console.log('Fetched products:', data); // 데이터 확인용
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <div className="Reservation-calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        products={products}
      />
    </div>
  );
};
