import React, {useState, useEffect} from "react";
import "./datatable.scss";
import employees from "../../datas/employees"

const Datatable = ({columnTitle, data}) => {
    const initialDatas = employees;
 
    // state
    const [clickCount, setClickCount] = useState(0);
    const [clickedColumnIndex, setClickedColumnIndex] = useState(null);
    const [ dataList, setDataList ] = useState(initialDatas);
    const [displayedEntriesCount, setDisplayedEntriesCount] = useState(0);
    const [selectedEntries, setSelectedEntries] = useState(false);

    // grey one entry out of 2
     const getRowClass = (index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';

    };

    const columnName = ["firstname", "lastname", "startDate", "department", "dateOfBirth","street","city","state","code"]
    /**
     * Filter datas by column when the users clicks to the filter icon.
     * @param {number} indexClicked - index of column clicked
     * @param {number} clickCount - counter of click (useState)
     */
    const filterData = (indexClicked, clickCount) => {
        const column = columnName[indexClicked];
        let sortedDatas;
        selectedEntries ? sortedDatas = [...displayedData] : sortedDatas = [...dataList] ; // on utilise la variable initialDatas pour repartir des données initiales à chaque filtrage
        switch (clickCount) {
          case 1:
            sortedDatas.sort((a, b) => (a[column] < b[column] ? -1 : 1));
            break;
          case 2:
            sortedDatas.sort((a, b) => (a[column] > b[column] ? -1 : 1));
            break;
          default:
            break;
        }
        setDataList(sortedDatas);
      };
    // when the user clicks on filter's icon
    const handleClickIcon = (index) => {
        console.log("je suis dans handleClickIcon")
        console.log("clickcount", clickCount)
        // if index is the index of the clicked column
        if (index === clickedColumnIndex) {
            // if the click counter is equal to 2, we reset it to 0 otherwise we add 1
            const newClickCount = clickCount === 2 ? 0 : clickCount + 1;
            setClickCount(newClickCount);
            console.log("clickcount if", newClickCount)
            filterData(index, newClickCount) 
        } else {
            setClickCount(1);
            setClickedColumnIndex(index);
            console.log("clickcount else", clickCount)
            filterData(index, 1);
        }
    }    
    console.log("datalist", dataList)
    console.log("_____________________");
    // Sort datas by entries selected
    const handleClickSelect = (e) => {
        const value = e.target.value;
        console.log("value", value);
        setDisplayedEntriesCount(parseInt(value));
        setSelectedEntries(true);
       
    }
    console.log("displayedDataEntries", displayedEntriesCount)
  
    const displayedData = dataList.slice(0, displayedEntriesCount)
    console.log("displayedData", displayedData);
    
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
                        <select
                            onChange={handleClickSelect}
                        >
                            <option value="10">10</option> 
                            <option value="25">25</option> 
                            <option value="50">50</option> 
                            <option value="100">100</option> 
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
                                    <th className="table-head-row-title" key={`${index}-${elt}`}>
                                        {elt}
                                        <span
                                            className="table-icon"
                                            id={index}
                                            value={elt}
                                            onClick={() => handleClickIcon(index)}
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
                    selectedEntries && displayedData ? (
                        displayedData.map((data, index) => (
                        <tr key={index} className={getRowClass(index)}>
                            <td>{data.firstname}</td>
                            <td>{data.lastname}</td>
                            <td>{data.startDate}</td>
                            <td>{data.department}</td>
                            <td>{data.dateOfBirth}</td>
                            <td>{data.street}</td>
                            <td>{data.city}</td>
                            <td>{data.state}</td>
                            <td>{data.code}</td>
                        </tr>
                        ))
                    ) : (
                        dataList.map((data, index) => (
                            <tr key={index} className={getRowClass(index)}>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                <td>{data.startDate}</td>
                                <td>{data.department}</td>
                                <td>{data.dateOfBirth}</td>
                                <td>{data.street}</td>
                                <td>{data.city}</td>
                                <td>{data.state}</td>
                                <td>{data.code}</td>
                            </tr>
                        ))
                    )
                }
                </tbody>
            </table>
        </>
    )
}

export default Datatable;