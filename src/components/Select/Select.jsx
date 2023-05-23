import React from "react";
import PropTypes from 'prop-types';

// style
import "./select.scss";

const Select = ({ data, id, name, value, onChange, className }) => {

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
    >
      {data.map((item, index) => (
        <option key={`${index}-${item}`} value={item.abbreviation}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      abbreviation: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
export default Select;
