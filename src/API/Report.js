import axios from "axios";

export const getReports = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/reports"
  );
  console.log(data);
  return data;
};

export const deleteReport = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`
  );
  return data;
};

export const createReport = async (report) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports`,
    report
  );
  return data;
};

export const updateReportFunc = async (report) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${report.id}`,
    report
  );
  return data;
};

export const getReportById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`
  );
  return data;
};