import React from "react";

// style
import "./select.scss";


const Select = ({data, id, name, value, onChange }) => {
    return (
        <select 
            id ={id} 
            name={name} 
            value={value} 
            onChange={onChange}
        >
        {data.map((item, index) => (
            <option
                key={`${index}-${item}`} 
                value={item.name}>
                    {item.name}
            </option>
        ))}
        </select>
    );
};

export default Select;