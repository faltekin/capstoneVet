import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getDoctors = async () => {
  console.log("Fetching doctors from the database...");
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/doctors`);
    console.log("Doctors fetched successfully:", data.content);
    return data.content;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error; 
  }
};


export const createDoctor = async (doctor) => {
  const { data } = await axios.post(`${BASE_URL}/api/v1/doctors`, doctor);
  return data;
};

export const deleteDoctor = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/api/v1/doctors/${id}`);
  return data;
};

export const updateDoctorFunc = async (doctor) => {
  const { data } = await axios.put(`${BASE_URL}/api/v1/doctors/${doctor.id}`, doctor);
  return data;
};

export const getDoctorById = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/doctors/${id}`);
  return data;
};