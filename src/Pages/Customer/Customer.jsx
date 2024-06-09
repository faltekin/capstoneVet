import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import "./Customer.css";

import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
  getCustomerByName,
  getCustomerById,
} from "../../API/Customer";


function Customer() {
  const [customers, setCustomers] = useState([]); 
  const [reload, setReload] = useState(true);
  const [alert, setAlert] = useState(0);
  const [customerSearch, setCustomerSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const [foundCustomer, setFoundCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  
  useEffect(() => {
    fetchCustomers();
  }, [reload]);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      if (data && Array.isArray(data.content)) {
        setCustomers(data.content); 
        
      } else {
        console.error("Unexpected response data:", data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  
  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
    console.log(newCustomer);
  };

  const handleNewCustomerBtn = () => {
    console.log(newCustomer);
    createCustomer(newCustomer)
      .then(() => {
        setReload(!reload);
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };
  console.log(customers);

  
  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(!reload);
    });
  };

  
  const handleUpdateCustomerInputs = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCustomerBtn = () => {
    updateCustomerFunc(updateCustomer)
      .then(() => {
        setReload(!reload);
        setUpdateCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  const handleUpdateIcon = (customer) => {
    console.log(customer);
    setUpdateCustomer(customer);
  };

  
  const handleSearchCustomerByName = () => {
    getCustomerByName(customerSearch).then((data) => {
      if (data && Array.isArray(data.content)) {
        setCustomers(data.content);
      } else {
        console.error("Unexpected response data:", data);
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchBtn = () => {
    getCustomerById(searchId)
      .then((data) => {
        setFoundCustomer(data);
      })
      .catch((error) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  };


  const handleResetButton = async () => {
    try {
      const costumerData = await getCustomers();
      if (costumerData && Array.isArray(costumerData.content)) {
        setCustomers(costumerData.content);
      } else {
        console.error("Unexpected response data for customer:", costumerData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      
      <div className="customer-create">
        <h1>Customer Management</h1>
        <h3>Add Customer</h3>

        <input
          type="text"
          placeholder="Name Surname"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newCustomer.email}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="City"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />

        <button onClick={handleNewCustomerBtn}>Create</button>
        {alert === 1 ? (
          <Alert severity="error">
            Please review the information and try again!
          </Alert>
        ) : null}
      </div>

      
      <div className="customer-update">
        <h3>Update Customer</h3>

        <input
          type="text"
          placeholder="Name Surname"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={updateCustomer.email}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputs}
        />
        <button onClick={handleUpdateCustomerBtn}>Update</button>
        {alert === 2 ? (
          <Alert severity="error">Please select a customer!</Alert>
        ) : null}
      </div>

      
      <div className="search-customer-name">
        <h3>Search Customer</h3>
        <input
          type="text"
          placeholder="Enter name..."
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchCustomerByName}>
          Search
        </button>

      </div>

      <div className="search-customer-id">
        <h3>Search Customer by ID</h3>
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchBtn}>Search</button>
        {foundCustomer && (
          <div>
            <h3>Found Customer:</h3>
            <p>{`Name: ${foundCustomer.name}`}</p>
            <p>{`Phone: ${foundCustomer.phone}`}</p>
            <p>{`Address: ${foundCustomer.address}`}</p>
            <p>{`City: ${foundCustomer.city}`}</p>
            <p>{`Email: ${foundCustomer.email}`}</p>
          </div>
        )}
      </div> 


      <div className="customer-list">
        <h3>Customer List</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.email}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(customer)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(customer.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="customer-reset">
          <button onClick={handleResetButton}>Reset List</button>
        </div> 

      </div>

      
       

    </div>
  );
}
export default Customer;
