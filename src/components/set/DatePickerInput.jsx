"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DatePickerInput({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) onDateChange(date); // biar bisa kirim ke parent
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Tanggal Lahir</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Pilih tanggal"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
}
