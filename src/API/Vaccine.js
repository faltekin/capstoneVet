import axios from "axios";

export const getVaccines = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccinations"
  );
  console.log(data);
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/${id}`
  );
  return data;
};

export const createVaccine = async (vaccine) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations`,
    vaccine
  );
  return data;
};


export const getVaccineById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/${id}`
  );
  return data;
};


export const searchByVaccinationRange = async (startDate, endDate) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/searchByVaccinationRange`,
      {
        params: {
          startDate: startDate,
          endDate: endDate,
        }
      }
    );
    return data;
  } catch (error) {
    console.error('Error in vaccine:', error);
    throw error;
  }
};

export const searchVaccineByAnimalId = async (id) => {
  try {
    console.log("Searching vaccine by animal ID:", id);
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/searchByAnimal`,
      {
        params: {
          id: id
        }
      }
    );
    console.log("Vaccine by animal ID result:", data);
    return data;
  } catch (error) {
    console.error('Error in vaccine:', error);
    throw error;
  }
};



