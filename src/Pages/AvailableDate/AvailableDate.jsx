import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import "./AvailableDate.css";
import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  getAvailableDatetById,
} from "../../API/AvailableDate";


function AvailableDate() {
  const [workDate, setWorkDate] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [foundDate, setFoundDate] = useState(null);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);
  const [newWorkDate, setNewWorkDate] = useState({
    workDate: "",
    doctorId: "",
  });

  useEffect(() => {
    fetchReports();
  }, [reload]);

  const fetchReports = async () => {
    try {
      const data = await getAvailableDates();
      if (data && Array.isArray(data.content)) {
        setWorkDate(data.content);
      } else {
        console.error("Unexpected response data:", data);
      }
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const handleNewWorkChange = (event) => {
    const { name, value } = event.target;
    setNewWorkDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateWorkDate = () => {
    createAvailableDate(newWorkDate)
      .then(() => {
        setReload(!reload);
        setNewWorkDate({
          workDate: "",
          doctorId: "",
        });
      })
      .catch((error) => {
        console.error("Error creating work date:", error);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  const handleDelete = (id) => {
    deleteAvailableDate(id)
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        console.error("Error deleting available date:", error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchBtn = () => {
    getAvailableDatetById(searchId)
      .then((data) => {
        setFoundDate(data);
      })
      .catch((error) => {
        console.error("Error fetching available date by ID:", error);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  return (
    <div className="container">
      <div className="date-create">
        <h1>Work Date</h1>
        <h3>Add Report</h3>

        <input
          type="date"
          placeholder="Work Date"
          name="workDate"
          value={newWorkDate.workDate}
          onChange={handleNewWorkChange}
        />

        <input
          type="text"
          placeholder="Doctor ID"
          name="doctorId"
          value={newWorkDate.doctorId}
          onChange={handleNewWorkChange}
        />

        <button onClick={handleCreateWorkDate}>Create</button>

        {alert && (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        )}
      </div>

      <div className="search-date">
        <h3>Search Work Date by ID</h3>
        <input
          type="text"
          placeholder="Enter Work Date ID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchBtn}>Search</button>
        {foundDate && (
          <div>
            <h3>Found Date:</h3>
            <p>{`ID: ${foundDate.id}`}</p>
            <p>{`Work Date: ${foundDate.workDay}`}</p>
            <p>{`Doctor Name: ${foundDate.doctor.name}`}</p>
            <p>{`Doctor Phone: ${foundDate.doctor.phone}`}</p>
            <p>{`Doctor Email: ${foundDate.doctor.email}`}</p>
            <p>{`Doctor Address: ${foundDate.doctor.address}`}</p>
            <p>{`Doctor City: ${foundDate.doctor.city}`} </p>
          </div>
        )}
      </div>

      <div className="available-dates-list">
        <h2>Dates</h2>
        <ul>
          {workDate.map((work) => (
            <li key={work.id}>

              <p>{`ID: ${work.id}`}</p>
              <p>{`Date: ${work.workDay}`}</p>
              <p>{`Doctor Name: ${work.doctor.name}`}</p>
              <p>{`Doctor Phone: ${work.doctor.phone}`}</p>
              <p>{`Doctor Email: ${work.doctor.email}`}</p>
              <p>{`Doctor Address: ${work.doctor.address}`}</p>
              <p>{`Doctor City: ${work.doctor.city}`} </p>
              <button onClick={() => handleDelete(work.id)}>
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AvailableDate;
