
import { Route, Routes } from "react-router-dom";
import Customer from "./Pages/Customer/Customer.jsx";
import Animal from "./Pages/Animal/Animal.jsx";
import Doctor from "./Pages/Doctor/Doctor.jsx";
import AvailableDate from "./Pages/AvailableDate/AvailableDate.jsx";
import Appointment from "./Pages/Appointment/Appointment.jsx";
import Report from "./Pages/Report/Report.jsx";
import Vaccine from "./Pages/Vaccine/Vaccine.jsx";
import Navbar from "./Component/Navbar";
import Landing from "./Pages/Landing/Landing";

import './App.css'

function App() {


  return (
    <>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/work" element={<AvailableDate />} />
          <Route path="/doctor" element={<Doctor />}>
            <Route index={true} element={<AvailableDate />} />
          </Route>
          <Route path="/availableDate" element={<AvailableDate />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/vaccine" element={<Vaccine />} />
          <Route path="/report" element={<Report />} />
          
        </Routes>   
    </>
  )
}

export default App
