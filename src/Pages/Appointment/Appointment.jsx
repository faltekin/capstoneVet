import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import "./Appointment.css";
import { getDoctors } from "../../API/Doctor";
import { getAnimals } from "../../API/Animal";


import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentById,
  searchAppointmentsByDoctorAndDateRange,
  searchAppointmentsByAnimalAndDateRange
} from "../../API/Appointment";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [alert, setAlert] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [foundAppointment, setFoundAppointment] = useState(null);

  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: { id: "" },
    animal: { id: "" },
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: { id: "" },
    animal: { id: "" },
  });

  useEffect(() => {
    if (reload) {
      getInitialData();
      setReload(false);
    }
  }, [reload]);

  const getInitialData = async () => {
    try {
      const appointmentData = await getAppointments();
      const doctorData = await getDoctors();
      const animalData = await getAnimals();

      console.log("Fetched appointments:", appointmentData);
      console.log("Fetched doctors:", doctorData);
      console.log("Fetched animals:", animalData);

      if (appointmentData && Array.isArray(appointmentData.content)) {
        setAppointments(appointmentData.content);
      } else {
        console.error("Unexpected response data for appointments:", appointmentData);
      }

      if (doctorData && Array.isArray(doctorData)) {
        setDoctors(doctorData);
      } else {
        console.error("Unexpected response data for doctors:", doctorData);
      }

      if (animalData && Array.isArray(animalData.content)) {
        setAnimals(animalData.content);
      } else {
        console.error("Unexpected response data for animals:", animalData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNewAppointment = (event) => {
    const { name, value } = event.target;
    if (name === "doctor") {
      setNewAppointment((prevState) => ({
        ...prevState,
        doctor: { id: value }
      }));
    } else if (name === "animal") {
      setNewAppointment((prevState) => ({
        ...prevState,
        animal: { id: value }
      }));
    } else {
      setNewAppointment((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
    console.log(newAppointment);
  };

  const handleNewAppointmentBtn = () => {
    createAppointment(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          doctor: { id: "" },
          animal: { id: "" },
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
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateAppointmentInputs = (event) => {
    const { name, value } = event.target;
    if (name === "doctor") {
      setUpdateAppointment((prevState) => ({
        ...prevState,
        doctor: { id: value }
      }));
    } else if (name === "animal") {
      setUpdateAppointment((prevState) => ({
        ...prevState,
        animal: { id: value }
      }));
    } else {
      setUpdateAppointment((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleUpdateAppointmentBtn = () => {
    updateAppointmentFunc(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          appointmentDate: "",
          doctor: { id: "" },
          animal: { id: "" },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (appointment) => {
    setUpdateAppointment({
      appointmentDate: appointment.appointmentDate,
      doctor: appointment.doctor,
      animal: appointment.animal,
      id: appointment.id,
    });
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchBtn = () => {
    getAppointmentById(searchId)
      .then((data) => {
        setFoundAppointment(data);
      })
      .catch((error) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };

  const handleDoctorDateSearchBtn = () => {
    searchAppointmentsByDoctorAndDateRange(startDate, endDate, doctorId)
      .then((data) => {
        setAppointments(data.content);
        console.log("Search successful:", data);
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
  };

  const handleAnimalDateSearchBtn = () => {
    searchAppointmentsByAnimalAndDateRange(startDate, endDate, animalId)
      .then((data) => {
        setAppointments(data.content);
        console.log("Search successful:", data);
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
  };
  


  const handleResetButton = async () => {
    try {
      const appointmentData = await getAppointments();
      if (appointmentData && Array.isArray(appointmentData.content)) {
        setAppointments(appointmentData.content);
      } else {
        console.error("Unexpected response data for appointments:", appointmentData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="appointment-create">
        <h1>Appointment Management</h1>

        <h3>Add Appointment</h3>
        <input
          type="datetime-local"
          placeholder="Appointment date"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select
          value={newAppointment.doctor.id}
          name="doctor"
          onChange={handleNewAppointment}
          >
          <option value="" disabled={true}>
          Select doctor
          </option>
          {doctors.map((doctor) => {
          return (
          <option key={doctor.id} value={doctor.id}>
          {doctor.name}
          </option>
          );
          })}
          </select>
          <select
            value={newAppointment.animal.id}
            name="animal"
            onChange={handleNewAppointment}
          >
          <option value="" disabled={true}>
            Select animal
          </option>
          {animals.map((animal) => {
            return (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            );
          })}
        </select>

        <button onClick={handleNewAppointmentBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
    </div>

    <div className="appointment-update">
      <h3>Update Appointment</h3>

      <input
        type="datetime-local"
        placeholder="Appointment date"
        name="appointmentDate"
        value={updateAppointment.appointmentDate}
        onChange={handleUpdateAppointmentInputs}
      />

      <select
        value={updateAppointment.doctor.id}
        name="doctor"
        onChange={handleUpdateAppointmentInputs}
      >
        <option value="" disabled>
          Select doctor
        </option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <select
        value={updateAppointment.animal.id}
        name="animal"
        onChange={handleUpdateAppointmentInputs}
      >
        <option value="" disabled>
          Select animal
        </option>
        {animals.map((animal) => (
          <option key={animal.id} value={animal.id}>
            {animal.name}
          </option>
        ))}
      </select>

      <button onClick={handleUpdateAppointmentBtn}>Update</button>
      {alert === 2 && (
        <Alert severity="error">Please select an appointment!</Alert>
      )}
    </div>




  <div className="search-appointment">
    <h3>Search Appointment ID</h3>
    <input
      type="text"
      placeholder="Enter Appointment ID"
      value={searchId}
      onChange={handleSearchChange}
    />
    <button onClick={handleSearchBtn}>Search</button>
    {foundAppointment && (
      <div>
        <h3>Found Appointment:</h3>
        <p>{`Doctor Name: ${foundAppointment.doctor.name}`}</p>
        <p>{`Animal Name: ${foundAppointment.animal.name}`}</p>
        <p>{`Appointment Date: ${foundAppointment.appointmentDate}`}</p>
      </div>
    )}
  </div>

  <div>
    <h3>Search Appointment by Doctor and Date</h3>
    
    <input
      type="date"
      placeholder="start-date "
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />

    <input
      type="date"
      placeholder="end-date "
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />

    <select
      value={doctorId}
      onChange={(e) => setDoctorId(e.target.value)}
    >
      <option value="" disabled={true}>
        Select doctor
      </option>
      {doctors.map((doctor) => {
        return (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        );
      })}
    </select>

    <button onClick={handleDoctorDateSearchBtn}>Search</button>
  </div>  

  <div>
  <h3>Search Appointment by Animal and Date</h3>

  <input
    type="date"
    placeholder="start-date "
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />

  <input
    type="date"
    placeholder="end-date "
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />

  <select
    value={animalId}
    onChange={(e) => setAnimalId(e.target.value)}
  >
    <option value="" disabled={true}>
      Select animal
    </option>
    {animals.map((animal) => {
      return (
        <option key={animal.id} value={animal.id}>
          {animal.name}
        </option>
      );
    })}
  </select>

  <button onClick={handleAnimalDateSearchBtn}>Search</button>
</div>
   


  <div className="list">
    <h3>Appointment List</h3>

    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Appointment Date</th>
            <th>Animal</th>
            <th>Customer</th>
            <th>Customer Phone</th>
            <th>Doctor Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.doctor.name}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.animal.name}</td>
              <td>{appointment.animal.customer.name}</td>
              <td>{appointment.animal.customer.phone}</td>
              <td>{appointment.doctor.phone}</td>
              <td>
                <span onClick={() => handleUpdateIcon(appointment)}>
                  <UpdateIcon />
                </span>
                <span onClick={() => handleDelete(appointment.id)}>
                  <DeleteIcon />
                </span>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <button onClick={handleResetButton}>Reset Appointments</button>
    </div>

  </div>

  

</div>
);
}

export default Appointment;


