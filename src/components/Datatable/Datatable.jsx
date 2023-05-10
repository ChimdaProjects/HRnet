import React, { useState, useEffect, useMemo } from "react";
import "./datatable.scss";
import Pagination from "../../components/Pagination/Pagination";

const Datatable = ({ columnTitle, datas }) => {

    const initialDatas = datas["0"].concat(datas["formData"]);
   
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ entriesPerPage, setEntriesPerPage ] = useState(10);
    const [ clickCount, setClickCount ] = useState(0);
    const [ clickedColumnIndex, setClickedColumnIndex ] = useState(null);
    const [ indexColumn, setIndexColumn ] = useState(null);
    const [ dataList, setDataList ] = useState(initialDatas);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ indexOfLastEntry, setIndexOfLastEntry ] = useState(10);
    const [ indexOfFirstEntry, setIndexOfFirstEntry ] = useState(0);
    console.log("dataList", dataList)
    // grey one entry out of 2
    const getRowClass = (index) => {
        return index % 2 === 0 ? "even-row" : "odd-row";
    };

    const columnName = [
        "firstname",
        "lastname",
        "startDate",
        "department",
        "dateOfBirth",
        "street",
        "city",
        "state",
        "code",
    ];

    useEffect(() => {
        let newResults = [...initialDatas];

        if (searchTerm) {
            newResults = newResults.filter((data) => {
            // Filter the dataList based on the searchTerm
                return Object.values(data).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        if (indexColumn) {
            const column = columnName[indexColumn];
            console.log("column", column)
            switch (clickCount) {
            case 1:
                newResults.sort((a, b) => (a[column] < b[column] ? -1 : 1));
                break;
            case 2:
                newResults.sort((a, b) => (a[column] > b[column] ? -1 : 1));
                break;
            default:
                break;
            }
        }

    setDataList(newResults);
    }, [searchTerm, indexColumn, clickCount, currentPage, entriesPerPage]);

    useEffect(() => {
        const indexOfLastEntry = currentPage * entriesPerPage;
        const indexOfFirstEntry = (currentPage - 1) * entriesPerPage;

        setIndexOfLastEntry(indexOfLastEntry);
        setIndexOfFirstEntry(indexOfFirstEntry);
    }, [currentPage, entriesPerPage]);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
   
    // Sort datas by entries selected
    const handleClickSelect = (e) => {
        const value = e.target.value;
        setEntriesPerPage(parseInt(value));
        setCurrentPage(1);
    };

    // when the user clicks on filter's icon
    const handleClickIcon = (index) => {
        // if index is the index of the clicked column
        if (index === clickedColumnIndex) {
        // if the click counter is equal to 2, we reset it to 0 otherwise we add 1
            const newClickCount = clickCount === 2 ? 0 : clickCount + 1;
            setClickCount(newClickCount);
        } else {
            setClickCount(1);
            setClickedColumnIndex(index);
        }

        setIndexColumn(index);
    };

    // search term
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
    <>
        <h2 className="datatable-title">Current Employee</h2>
        <div className="datatable-features">
            <div className="datatable-sort">
            <p>
                Show
                <select onChange={handleClickSelect}>
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
                {columnTitle.map((elt, index) => {
                let iconElement;
                if (index !== clickedColumnIndex || clickCount === 0) {
                    iconElement = (
                    <i
                        className="fa-solid fa-sort"
                        style={{ color: "#e1e2e5" }}
                        id={index}
                    ></i>
                    );
                } else if (clickCount === 1) {
                    iconElement = (
                    <i
                        className="fa-solid fa-sort-up"
                        style={{ color: "#888EE0" }}
                        id={index}
                    ></i>
                    );
                } else if (clickCount === 2) {
                    iconElement = (
                    <i
                        className="fa-solid fa-sort-down"
                        style={{ color: "##888EE0" }}
                        id={index}
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
                })}
            </tr>
            </thead>
            <tbody className="table-body">
                {
                    dataList?.filter((_, index) => index >= indexOfFirstEntry && index < indexOfLastEntry)
                    .map((data, index) => (
                        <tr key={index} className={getRowClass(index)}>
                            <td>{ data.firstname }</td>
                            <td>{ data.lastname }</td>
                            <td>{ data.startDate }</td>
                            <td>{ data.department }</td>
                            <td>{ data.dateOfBirth }</td>
                            <td>{ data.street }</td>
                            <td>{ data.city }</td>
                            <td>{ data.state }</td>
                            <td>{ data.code }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Pagination
            entriesPerPage = { entriesPerPage }
            totalEntries = { dataList.length }
            paginate = { handlePageChange }
            start = { indexOfFirstEntry }
            end = { indexOfLastEntry }
            currentPage={ currentPage }
            setCurrentPage = { setCurrentPage }

        />
    </>
  );
};

export default Datatable;