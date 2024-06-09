import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import "./Report.css";

import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
  getReportById,
} from "../../API/Report";


function Report() {
  const [reports, setReports] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [foundReport, setFoundReport] = useState(null);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
  });

  const [updateReport, setUpdateReport] = useState({
    id: "",
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [reload]);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      if (data && Array.isArray(data.content)) {
        setReports(data.content);
      } else {
        console.error("Unexpected response data:", data);
      }
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const handleNewReportChange = (event) => {
    setNewReport({
      ...newReport,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateReportChange = (event) => {
    setUpdateReport({
      ...updateReport,
      [event.target.name]: event.target.value,
    });
  };

  const handleReportBtn = () => {
    createReport(newReport)
      .then(() => {
        setReload(!reload);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
        });
      })
      .catch((error) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  const handleDelete = (id) => {
    deleteReport(id)
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        console.error("Error deleting available date:", error);
      });
  };

  const handleUpdate = (report) => {
    setIsUpdating(true);
    setUpdateReport({
      id: report.id,
      title: report.title,
      diagnosis: report.diagnosis,
      price: report.price,
      appointmentId: report.appointment.id,
    });
  };

  const handleUpdateBtn = () => {
    updateReportFunc(updateReport)
      .then(() => {
        setReload(!reload);
        setIsUpdating(false);
        setUpdateReport({
          id: "",
          title: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
        });
      })
      .catch((error) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchBtn = () => {
    getReportById(searchId)
      .then((data) => {
        setFoundReport(data);
      })
      .catch((error) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  return (
    <div className="container">
      <div className="customer-create">
        <h1>Report</h1>
        <h3>{isUpdating ? "Update Report" : "Add Report"}</h3>

        <input
          type="text"
          placeholder="title"
          name="title"
          value={isUpdating ? updateReport.title : newReport.title}
          onChange={isUpdating ? handleUpdateReportChange : handleNewReportChange}
        />
        <input
          type="text"
          placeholder="diagnosis"
          name="diagnosis"
          value={isUpdating ? updateReport.diagnosis : newReport.diagnosis}
          onChange={isUpdating ? handleUpdateReportChange : handleNewReportChange}
        />
        <input
          type="text"
          placeholder="price"
          name="price"
          value={isUpdating ? updateReport.price : newReport.price}
          onChange={isUpdating ? handleUpdateReportChange : handleNewReportChange}
        />
        <input
          type="text"
          placeholder="appointmentId"
          name="appointmentId"
          value={isUpdating ? updateReport.appointmentId : newReport.appointmentId}
          onChange={isUpdating ? handleUpdateReportChange : handleNewReportChange}
        />

        <button onClick={isUpdating ? handleUpdateBtn : handleReportBtn}>
          {isUpdating ? "Update" : "Create"}
        </button>
        {alert && (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        )}
      </div>

      <div className="search-report">
        <h3>Search Report by ID</h3>
        <input
          type="text"
          placeholder="Enter report ID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchBtn}>Search</button>
        {foundReport && (
          <div>
            <h3>Found Report:</h3>
            <p>{`ID: ${foundReport.id}`}</p>
            <p>{`Title: ${foundReport.title}`}</p>
            <p>{`Diagnosis: ${foundReport.diagnosis}`}</p>
            <p>{`Price: ${foundReport.price}`}</p>
            <p>{`Appointment ID: ${foundReport.appointment.id}`}</p>
          </div>
        )}
      </div>

      <div className="report-list">
        <h2>Reports</h2>
        <ul>
          {reports.map((report) => (
            <li key={report.id}>

              <p>{`ID: ${report.id}`}</p>
              <p>{`Title: ${report.title}`}</p>
              <p>{`Diagnosis: ${report.diagnosis}`}</p>
              <p>{`Price: ${report.price}`}</p>
              <p>{`Appointment ID: ${report.appointment.id}`}</p>
              <button onClick={() => handleDelete(report.id)}>
                <DeleteIcon />
              </button>
              <button onClick={() => handleUpdate(report)}>
                <UpdateIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Report;
