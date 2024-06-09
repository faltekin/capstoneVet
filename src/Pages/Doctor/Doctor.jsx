import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import { getDoctors, deleteDoctor, createDoctor, updateDoctorFunc, getDoctorById } from "../../API/Doctor";
import "./Doctor.css";



function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [doctorById, setDoctorById] = useState(null);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: ""
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: ""
  });

  useEffect(() => {
    fetchDoctors();
  }, [reload]);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value
    });
  };

  const handleNewDoctorBtn = () => {
    createDoctor(newDoctor)
      .then(() => {
        setReload(!reload);
        setNewDoctor({
          name: "",
          email: "",
          address: "",
          city: "",
          phone: ""
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleDelete = (id) => {
    deleteDoctor(id)
      .then(() => setReload(!reload))
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  const handleUpdateDoctorInputs = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdateDoctorBtn = () => {
    updateDoctorFunc(updateDoctor)
      .then(() => {
        setReload(!reload);
        setUpdateDoctor({
          name: "",
          email: "",
          address: "",
          city: "",
          phone: ""
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (doctor) => {
    setUpdateDoctor({
      name: doctor.name,
      email: doctor.email,
      address: doctor.address,
      city: doctor.city,
      phone: doctor.phone,
      id: doctor.id
    });
  };

  const handleDoctorSearchChange = (event) => {
    setDoctorSearch(event.target.value);
  };

  const handleDoctorSearchBtn = async () => {
    try {
      const doctor = await getDoctorById(doctorSearch);
      setDoctorById(doctor);
    } catch (error) {
      console.error("Error fetching doctor by ID:", error);
      setAlert(3);
      setTimeout(() => {
        setAlert(0);
      }, 3000);
    }
  };

  return (
    <>
      <div className="container">
        <div className="doctor-create">
          <h1>Doctor Management</h1>
          <h3>Add Doctor</h3>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newDoctor.name}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={newDoctor.phone}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={newDoctor.email}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newDoctor.address}
            onChange={handleNewDoctor}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newDoctor.city}
            onChange={handleNewDoctor}
          />
          <button onClick={handleNewDoctorBtn}>Create</button>
          {alert === 1 && (
            <Alert severity="error">
              Please review the information and try again!
            </Alert>
          )}
        </div>

        <div className="doctor-update">
          <h3>Update Doctor</h3>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={updateDoctor.email}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputs}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputs}
          />
          <button onClick={handleUpdateDoctorBtn}>Update</button>
          {alert === 2 && (
            <Alert severity="error">Please select doctor!</Alert>
          )}
        </div>

        <div className="doctor-list">
          <h3>Doctor List</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name Surname</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.address}</td>
                    <td>{doctor.city}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <span onClick={() => handleUpdateIcon(doctor)}>
                        <UpdateIcon />
                      </span>
                      <span onClick={() => handleDelete(doctor.id)}>
                        <DeleteIcon />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doctor-search">
          <h3>Search Doctor by ID</h3>
          <input
            type="text"
            placeholder="Doctor ID"
            value={doctorSearch}
            onChange={handleDoctorSearchChange}
          />
          <button onClick={handleDoctorSearchBtn}>Search</button>
          {alert === 3 && (
            <Alert severity="error">Doctor not found!</Alert>
          )}
          {doctorById && (
            <div className="doctor-details">
              <h3>Doctor Details</h3>
              <p>ID : {doctorById.id}</p>
              <p>Name: {doctorById.name}</p>
              <p>Phone: {doctorById.phone}</p>
              <p>Address: {doctorById.address}</p>
              <p>City: {doctorById.city}</p>
              <p>Email: {doctorById.email}</p>
            </div>
          )}
        </div>
        <Outlet />
        
        
       

      </div>
    </>
  );
}

export default Doctor;
