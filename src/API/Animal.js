import axios from "axios";

export const getAnimals = async () => {
  const { data } = await
  axios.get (
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals");
    console.log(data);
  return data;
};

export const deleteAnimal = async (id) => {
  const { data } = await axios.delete (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${id}`
  );
  return data;
};

export const createAnimal = async (animal) => {
  const { data } = await axios.post (
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals`,
    animal
  );
  return data;
};

export const updateAnimalFunc = async (animal) => {
  const { data } = await axios.put(   `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${animal.id}`,
  animal
  );
  return data;
};

export const getAnimalByName = async (name) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/searchByName?name=${name}`
  );
   
  return data;
};

export const getAnimalById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${id}`
  );
  return data;
};

export const getAnimalByCustomerName = async (customerName) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/searchByCustomer?customerName=${customerName}`
  );
   
  return data;
};
