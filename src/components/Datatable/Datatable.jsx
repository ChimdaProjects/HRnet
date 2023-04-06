import React, {useState, useEffect} from "react";
import "./datatable.scss";
const Datatable = ({columnTitle, data}) => {
    const datas = data.datas;
    console.log("datas", data);
 
    // state
    const [clickCount, setClickCount] = useState(0);
    // display icon & filter (not working for the moment)
    const handleClickIcon = () => {
        if (clickCount > 1) {
            setClickCount(0);
        } else {
            setClickCount(clickCount + 1);
        }
    };
    
    let iconElement;
    if (clickCount === 0) {
        iconElement = <i class="fa-solid fa-sort" style={{color: '#e1e2e5'}}></i>;
    } else if (clickCount === 1) {
        iconElement =  <i class="fa-solid fa-sort-up" style={{color: '#888EE0'}}></i>;
    } else {
        iconElement = <i class="fa-solid fa-sort-down" style={{color: '##888EE0'}}></i>;
    }

    // grey one entry out of 2
    const getRowClass = (index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    // searching term (not working)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
    setSearchTerm(event.target.value);
    };
    /*useEffect(() => {
        const results = datas.filter(elt =>
          datas.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
      }, [searchTerm]);*/
    
    
    return (
        <>
            <h2 className="datatable-title">Current Employee</h2>
            <div className="datatable-features">
                <div className="datatable-sort">
                    <p>Show
                        <select>
                            <option>10</option> 
                            <option>25</option> 
                            <option>50</option> 
                            <option>100</option> 
                        </select>
                    entries
                    </p>
                </div>
                <div className="datatable-search">
                    <label htmlFor="search">Search :</label>
                    <input
                        id="search"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <table className="table">
            <thead className="table-head">
                <tr className="table-head-row">
                    {columnTitle.map((elt, index)=> {
                        return <th className="table-head-row-title" key={index}>
                            {elt} 
                            <span className="table-icon" id={index} onClick={handleClickIcon}>
                                {iconElement}  
                            </span>
                        </th>   
                    })}
                </tr>
            </thead>
            <tbody className="table-body">
                {datas && (
                    Object.keys(datas).map((key, index) => (
                    <tr key={index} className={getRowClass(index)}>
                        <td>{datas[key].firstname}</td>
                        <td>{datas[key].lastname}</td>
                        <td>{datas[key].startDate}</td>
                        <td>{datas[key].department}</td>
                        <td>{datas[key].dateOfBirth}</td>
                        <td>{datas[key].adress.street}</td>
                        <td>{datas[key].adress.city}</td>
                        <td>{datas[key].adress.state}</td>
                        <td>{datas[key].adress.code}</td>
                    </tr>
                )))}
            </tbody>
      </table>
        </>
    )
}

export default Datatable;