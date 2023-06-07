import React from "react";
import PropTypes from "prop-types";

// style
import "./select.scss";

/**
 * This component represents a select dropdown.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.data - The array of select options.
 * @param {string} props.id - The ID of the select element.
 * @param {string} props.name - The name of the select element.
 * @param {string} props.value - The selected value of the select element.
 * @param {function} props.onChange - The function to handle the select change event.
 * @param {string} props.className - The CSS class name for styling purposes.
 * @returns {JSX} - The select component.
 */
function Select({
  data, id, name, value, onChange, className,
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
    >
      {data.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <option key={`${index}-${item}`} value={item.abbreviation}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      abbreviation: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
export default Select;
