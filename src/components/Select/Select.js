import React from "react";

// style
import "./select.scss";


const Select = ({data, id, name, value, onChange, className }) => {
    return (
        <select 
            id ={id} 
            name={name} 
            value={value} 
            onChange={onChange}
            className={className}
        >
        {data.map((item, index) => (
            <option
                key={`${index}-${item}`} 
                value={item.abbreviation}>
                    {item.name}
            </option>
        ))}
        </select>
    );
};

export default Select;