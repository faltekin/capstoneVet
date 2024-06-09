
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import "./Animal.css";
import { getCustomers } from "../../API/Customer";


import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
  getAnimalByName,
  getAnimalByCustomerName,
  getAnimalById,
} from "../../API/Animal";


function Animal() {
  const [animals, setAnimals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [updatingAnimal, setUpdatingAnimal] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");

  const [searchId, setSearchId] = useState("");
  const [foundAnimal, setFoundAnimal] = useState(null);

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: { id: "" },
  });

  useEffect(() => {
    getInitialData();
  }, [reload]);

  const getInitialData = async () => {
    try {
      const animalData = await getAnimals();
      const customerData = await getCustomers();
      if (Array.isArray(animalData.content)) {
        setAnimals(animalData.content);
      } else {
        console.error("Hata animal", animalData);
      }
      if (Array.isArray(customerData.content)) {
        setCustomers(customerData.content);
      } else {
        console.error("Hata customers:", customerData);
      }
    } catch (error) {
      console.error("Hata fetching data:", error);
    }
  };

  const handleNewAnimal = (event) => {
    const { name, value } = event.target;
    if (name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [name]: value,
      });
    }
  };

  const handleNewAnimalBtn = () => {
    createAnimal(newAnimal)
      .then(() => {
        console.log("Animal created successfully:", newAnimal);
        setReload(!reload);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: { id: "" },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleDelete = (animalId) => {
    deleteAnimal(animalId)
      .then(() => {
        setReload(!reload);
      })
      .catch((error) => {
        console.error("Error deleting animal:", error);
      });
  };

  const handleUpdateIcon = (animal) => {
    setUpdatingAnimal(animal);
    setNewAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: { id: animal.customer.id },
    });
  };

  const handleUpdateAnimalBtn = () => {
    updateAnimalFunc({ ...newAnimal, id: updatingAnimal.id })
      .then(() => {
        setReload(!reload);
        setUpdatingAnimal(null);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: { id: "" },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleSearchByName = () => {
    getAnimalByName(searchName)
      .then((data) => {
        setAnimals(data.content);
      })
      .catch((error) => {
        console.error("Error fetching animals by name:", error);
      });
  };

  const handleSearchByCustomerName = () => {
    getAnimalByCustomerName(searchCustomerName)
      .then((data) => {
        setAnimals(data.content);
      })
      .catch((error) => {
        console.error("Error fetching animals by customer name:", error);
      });
  };

  const handleResetButton = async () => {
    try {
      const animalData = await getAnimals();
      if (animalData && Array.isArray(animalData.content)) {
        setAnimals(animalData.content);
      } else {
        console.error("Unexpected response data for customer:", animalData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchBtn = () => {
    getAnimalById(searchId)
      .then((data) => {
        setFoundAnimal(data);
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
      <div className="animal-create">
        <h1>Animal Management</h1>
        <h3>Add Animal</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Species"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder="Colour"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />
        <input
          type="date"
          placeholder="dateOfBirth"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />
        <select value={newAnimal.customer.id} name="customer" onChange={handleNewAnimal}>
          <option value="" disabled>
            Select customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button onClick={handleNewAnimalBtn}>Create</button>
        {updatingAnimal && (
          <button onClick={handleUpdateAnimalBtn}>Update</button>
        )}
        {alert === 1 && (
          <Alert severity="error">Please review the information and try again!</Alert>
        )}
      </div>
      <div className="animal-search">
        <h3>Search Animals</h3>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearchByName}>Search</button>
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchCustomerName}
          onChange={(e) => setSearchCustomerName(e.target.value)}
        />
        <button onClick={handleSearchByCustomerName}>Search</button>
      </div>

      <div className="search-animal">
        <h3>Search Animal by ID</h3>
        <input
          type="text"
          placeholder="Enter animal ID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchBtn}>Search</button>
        {foundAnimal && (
          <div>
            <h3>Found Animal:</h3>
            <p>{`name: ${foundAnimal.name}`}</p>
            <p>{`species: ${foundAnimal.species}`}</p>
            <p>{`breed: ${foundAnimal.breed}`}</p>
            <p>{`gender: ${foundAnimal.gender}`}</p>
            <p>{`Colour: ${foundAnimal.colour}`}</p>
            <p>{`Date of Birth: ${foundAnimal.dateOfBirth}`}</p>
            <p>{`Customer Name: ${foundAnimal.customer.name}`}</p>
          </div>
        )}
      </div>  


      <div className="list">
        <h3>Animal List</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Colour</th>
                <th>Date of Birth</th>
                <th>Customer Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.colour}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customer.name}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(animal)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(animal.id)}>
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

export default Animal;
