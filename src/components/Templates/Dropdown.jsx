import React from "react";

const Dropdown = ({ title, options, func }) => {
  const handleChange = (event) => {
    if (func) {
      func(event.target.value); // Pass selected value to parent component
    }
  };

  return (
    <div className="select">
      <select
        defaultValue="0"
        onChange={handleChange}
        name="format"
        id="format"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
