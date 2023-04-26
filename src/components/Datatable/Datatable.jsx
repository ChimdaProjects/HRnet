import React, {useState, useEffect} from "react";
import "./datatable.scss";

const Datatable = ({columnTitle, data}) => {
    const datas = data.datas;
    console.log("datas", data);
 
    // state
    const [clickCount, setClickCount] = useState(0);
    const [clickedColumnIndex, setClickedColumnIndex] = useState(null);
    const [datasTable, setDatasTable] = useState(data.datas);
    
    console.log("datatable", datasTable);
    console.log("click count", clickCount)
    // grey one entry out of 2
     const getRowClass = (index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };
    let sortedDatas = null;
    // when the user clicks on filter's icon
    const handleClickIcon = (index, e) => {
        const id = e.target.id;
        console.log("value", id);
        // if index is the index of the clicked column
        if (index === clickedColumnIndex) {
            // if the click counter is equal to 2, we reset it to 0 otherwise we add 1
            setClickCount(clickCount === 2 ? 0 : clickCount + 1); 
        } else {
            setClickCount(1);
            setClickedColumnIndex(index);
        }
        console.log("index", index);
        if (index === 0) {
            console.log("je suis là!")
            // filter by ascending order ( A - Z);
            if (clickCount === 1) {
                
            sortedDatas = 
            datasTable.sort((a, b) => (a.firstname < b.firstname) ? -1 : 1 );
            console.log("sortedDatas A-Z", sortedDatas)
    
            setDatasTable(sortedDatas);
            } else if 
            
            (clickCount === 2) {
                sortedDatas = 
                datasTable.sort((a, b) => (a.firstname > b.firstname) ? -1 : 1 );
                console.log("sortedDatas Z-A", sortedDatas)
        
                setDatasTable(sortedDatas); 
            } else {
                setDatasTable(data.datas);
            }
            
        }
            
        }   


   
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
                        {columnTitle.map((elt, index) => 
                            {
                                let iconElement;
                                if (index !== clickedColumnIndex || clickCount === 0) {
                                    iconElement = (
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{ color: "#e1e2e5" }}
                                            id = {index}
                                            
                                        ></i>
                                    );
                                } else if (clickCount === 1) {
                                    iconElement = (
                                        <i
                                            className="fa-solid fa-sort-up"
                                            style={{ color: "#888EE0" }}
                                            id = {index}
                                        ></i>
                                    );
                                } else if (clickCount === 2) {
                                    iconElement = (
                                        <i
                                            className="fa-solid fa-sort-down"
                                            style={{ color: "##888EE0" }}
                                            id = {index}
                                        ></i>
                                    );
                                }
                                return (
                                    <th className="table-head-row-title" key={index}>
                                        {elt}
                                        <span
                                            className="table-icon"
                                            id={index}
                                            value={elt}
                                            onClick={(e) => handleClickIcon(index, e)}
                                        >
                                            {iconElement}
                                        </span>
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody className="table-body">
                    {
                        datasTable && (
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
                        )))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Datatable;