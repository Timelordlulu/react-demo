import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyComponent() {
  const [date, setDate] = useState(new Date());
  const handleChange = date => setDate(date);
  var submit = document.getElementById("submit");
  submit.onclick = function() {
    console.log(date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear());
  }
  return <DatePicker selected={date} onChange={handleChange} />;
}
