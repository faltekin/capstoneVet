import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import "./Vaccine.css";
import { getAnimals } from "../../API/Animal";

import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  getVaccineById,
  searchByVaccinationRange,
  searchVaccineByAnimalId
  
} from "../../API/Vaccine";


function Vaccine(){
    const [vaccines, setVaccines] = useState([]);
    const [animalWithoutCustomer, setAnimalWithoutCustomer] = useState([]);
    const [reload, setReload] = useState(true);
    const [alert, setAlert] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [vaccineSearch, setVaccineSearch] = useState("");
    const [vaccineById, setVaccineById] = useState(null);
    const [vaccineSearchByAnimal, setVaccineSearchByAnimal] = useState("");
    const [vaccineByAnimalId, setVaccineByAnimalId] = useState(null);
    const [animalId, setAnimalId] = useState('');
    const [vaccinesFound, setVaccinesFound] = useState([]);
    const [loading, setLoading] = useState(false);

    const [newVaccine, setNewVaccine] = useState({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animalWithoutCustomer: { id: "" },
    });

    useEffect(() => {
        getInitialData();
      }, [reload]);
    
    const getInitialData = async () => {
        try {
          const vaccineData = await getVaccines();
          const animalData = await getAnimals();
          if (Array.isArray(vaccineData.content)) {
            setVaccines(vaccineData.content);
          } else {
            console.error("Unexpected response data for vaccines:", vaccineData);
          }
          if (Array.isArray(animalData.content)) {
            setAnimalWithoutCustomer(animalData.content);
          } else {
            console.error("Unexpected response data for animals:", animalData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    const handleSearch = async () => {
      try {
        setLoading(true);
        const data = await searchVaccineByAnimalId(animalId);
        setVaccines(data.content); 
      } catch (error) {
        console.error('Error searching vaccine:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleNewVaccine = (event) => {
        const { name, value } = event.target;
        if (name === "animal") {
          setNewVaccine({
            ...newVaccine,
            animalWithoutCustomer: {
              id: value,
            },
          });
        } else {
          setNewVaccine({
            ...newVaccine,
            [name]: value,
          });
        }
    };

    const handleResetButton = async () => {
      try {
        const vaccineData = await getVaccines();
        if (vaccineData && Array.isArray(vaccineData.content)) {
          setVaccines(vaccineData.content);
        } else {
          console.error("Unexpected response data for appointments:", vaccineData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleVaccineDateSearchBtn = () => {
      searchByVaccinationRange(startDate, endDate)
        .then((data) => {
          setVaccines(data.content);
          console.log("Search successful:", data);
        })
        .catch((error) => {
          console.error("Error during search:", error);
        });
    };

    const handleNewVaccineBtn = () => {
        createVaccine(newVaccine)
          .then(() => {
            console.log("Vaccine created successfully:", newVaccine);
            setReload(!reload);
            setNewVaccine({
                name: "",
                code: "",
                protectionStartDate: "",
                protectionFinishDate: "",
                animalWithoutCustomer: { id: "" },
            });
          })
          .catch((error) => {
            setAlert(1);
            setTimeout(() => {
              setAlert(0);
            }, 3000);
          });
    };

    const handleDelete = (vaccineId) => {
        deleteVaccine(vaccineId)
          .then(() => {
            setReload(!reload);
          })
          .catch((error) => {
            console.error("Error deleting vaccine:", error);
          });
    };




    const handleVaccineSearchChange = (event) => {
      setVaccineSearch(event.target.value);
    };
  
    const handleVaccineSearchBtn = async () => {
      try {
        const vaccine = await getVaccineById(vaccineSearch);
        setVaccineById(vaccine);
      } catch (error) {
        console.error("Error fetching doctor by ID:", error);
        setAlert(3);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      }
    };


    return (
        <div className="container">
          <div className="vaccine-create">
            <h1>Vaccine Management</h1>
            <h3>Add Vaccine</h3>
            <input
            type="text"
            placeholder="Name"
            name="name"
            value={newVaccine.name}
            onChange={handleNewVaccine}
            />
            <input
            type="text"
            placeholder="Code"
            name="code"
            value={newVaccine.code}
            onChange={handleNewVaccine}
            />
            <input
            type="date"
            placeholder="Protection Start Date"
            name="protectionStartDate"
            value={newVaccine.protectionStartDate}
            onChange={handleNewVaccine}
            />
            <input
            type="date"
            placeholder="Protection Finish Date"
            name="protectionFinishDate"
            value={newVaccine.protectionFinishDate}
            onChange={handleNewVaccine}
            />

            <select
              value={newVaccine.animalWithoutCustomer.id}
              name="animal"
              onChange={handleNewVaccine}
            >
              <option value="" disabled>
                Select Animal
              </option>
              {animalWithoutCustomer.map((animalWithout) => (
                <option key={animalWithout.id} value={animalWithout.id}>
                  {animalWithout.name}
                </option>
              ))}
            </select>
    
            <button onClick={handleNewVaccineBtn}>Create</button>

            {alert === 1 && (
              <Alert severity="error">
                Please review the information and try again!
              </Alert>
            )}
          </div>

          <div className="vaccine-search">
          <h3>Search Vaccine by ID</h3>
          <input
            type="text"
            placeholder="Vaccine ID"
            value={vaccineSearch}
            onChange={handleVaccineSearchChange}
          />
          <button onClick={handleVaccineSearchBtn}>Search</button>
          {alert === 3 && (
            <Alert severity="error">Vaccine not found!</Alert>
          )}
          {vaccineById && (
            <div className="vaccine-details">
              <h3>Vaccine Details</h3>
              <p>name : {vaccineById.name}</p>
              <p>code: {vaccineById.code}</p>
              <p>protectionStartDate: {vaccineById.protectionStartDate}</p>
              <p>protectionFinishDate: {vaccineById.protectionFinishDate}</p>
            </div>
          )}
        </div> 

        <div className="vaccine-by-animal">
          <h1>Vaccine Search</h1>
          <label htmlFor="animalId">Animal ID:</label>
          <input
            type="text"
            id="animalId"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            Search
          </button>

          {loading && <p>Loading...</p>}

          <ul>
            {vaccinesFound.map(vaccine => (
              <li key={vaccine.id}>
                
                {vaccine.name} - {vaccine.protectionStartDate} to {vaccine.protectionFinishDate}
              </li>
            ))}
          </ul>
        </div>


          <div className="vaccine-by-range">
            <h3>searchByVaccinationRange</h3>
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

          <button onClick={handleVaccineDateSearchBtn}>Search</button>
          </div>  

        
          <div className="vaccine-list">
            <h3>Vaccine List</h3>
    
            <div className="table-container">
              <table className="table">
                    <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Protection Start Date</th>
                                <th>Protection Finish Date</th>
                            </tr>
                    </thead>
                    <tbody>
                    {vaccines.map((vaccine) => (
                    <tr key={vaccine.id}>
                    <td>{vaccine.id}</td>  
                    <td>{vaccine.name}</td>
                    <td>{vaccine.code}</td>
                    <td>{vaccine.protectionStartDate}</td>
                    <td>{vaccine.protectionFinishDate}</td>
                      <td>
                        <span onClick={() => handleDelete(vaccine.id)}>
                          <DeleteIcon />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button onClick={handleResetButton}>Reset List</button>
            </div>


          </div>
    
            

    
        </div>
        
    );


}

export default Vaccine;
