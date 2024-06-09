import axios from "axios";

export const getAppointments = async () => {
  const { data } = await
  axios.get (
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments");
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`
  );
  return data;
};

export const createAppointment = async (appointment) => {
  const { data } = await axios.post (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments`,
    appointment
  );
  return data;
};

export const updateAppointmentFunc = async (appointment) => {
  const { data } = await axios.put(   `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${appointment.id}`,
  appointment
  );
  return data;
};

export const getAppointmentById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`
  );
  return data;
};

export const searchAppointmentsByDoctorAndDateRange = async (startDate, endDate, doctorId, pageNumber = 0, pageSize = 10) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/searchByDoctorAndDateRange`,
      {
        params: {
          startDate: startDate,
          endDate: endDate,
          id: doctorId,
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      }
    );
    return data;
  } catch (error) {
    console.error('Error in searchAppointmentsByDoctorAndDateRange:', error);
    throw error;
  }
};


export const searchAppointmentsByAnimalAndDateRange = async (startDate, endDate, animalId, pageNumber = 0, pageSize = 10) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/searchByAnimalAndDateRange`,
      {
        params: {
          startDate: startDate,
          endDate: endDate,
          id: animalId,
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      }
    );
    return data;
  } catch (error) {
    console.error('Error in searchAppointmentsByAnimalAndDateRange:', error);
    throw error;
  }
};


