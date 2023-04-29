import React, {useState, useEffect} from "react";
import "./datatable.scss";
import employees from "../../datas/employees"

const Datatable = ({columnTitle, data}) => {
    const dataForm = data.datas;
    const initialDatas = employees;
 
    // state
    const [clickCount, setClickCount] = useState(0);
    const [clickedColumnIndex, setClickedColumnIndex] = useState(null);
    const [ dataList, setDataList ] = useState(initialDatas);
    const [displayedEntriesCount, setDisplayedEntriesCount] = useState(10);
    const [selectedEntries, setSelectedEntries] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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
        setDataList((prevState) => {
        // copy of prevState
        let sortedDatas = [...prevState];
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
        return sortedDatas;
    });
};
    // when the user clicks on filter's icon
    const handleClickIcon = (index) => {
        // if index is the index of the clicked column
        if (index === clickedColumnIndex) {
            // if the click counter is equal to 2, we reset it to 0 otherwise we add 1
            const newClickCount = clickCount === 2 ? 0 : clickCount + 1;
            setClickCount(newClickCount);
            filterData(index, newClickCount) 
        } else {
            setClickCount(1);
            setClickedColumnIndex(index);
            filterData(index, 1);
        }
    }    
    console.log("datalist", dataList)
  
    // search term
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    // filter dataList by searchTerm
    const filterDataList = () => {
        const results = 
            dataList.filter(data => {
            // Filter the dataList based on the searchTerm
            return Object.values(data).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        // Store the filtered results in dataList
        setDataList(results);
    };
    // datalist filter when there is a change in searchTerm
    useEffect(()=> {
        if(!searchTerm) {
            setDataList(initialDatas);
        } else {
            filterDataList();
        }
        
    }, [searchTerm]);

    // PAGINATION
    // Sort datas by entries selected
    const handleClickSelect = (e) => {
        const value = e.target.value;
        console.log("value", value);
        setDisplayedEntriesCount(parseInt(value));
        setSelectedEntries(true);
       
    }
    const [currentPage, setCurrentPage] = useState(1);

    // Calcule le nombre total de pages
    const pageCount = Math.ceil(dataList.length / displayedEntriesCount);
  
    // Extrait les données pour la page actuelle
    const start = (currentPage - 1) * displayedEntriesCount;
    const end = start + displayedEntriesCount;
    const displayedData = dataList.slice(start, end);

    // Change de page
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

      
    console.log("search term", searchTerm);
  
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
                }
                </tbody>
            </table>
            <div>
                {Array.from({ length: pageCount }).map((_, index) => (
                <button key={index} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
                ))}
            </div>
        </>
    )
}

export default Datatable;