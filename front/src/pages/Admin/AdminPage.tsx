import React, { useEffect, useState } from "react"; 
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const ACCENT_COLOR = "#6c9a76";
const LIGHT_BG = "#f7f9f7";
const CARD_BG = "rgba(255, 255, 255, 0.9)";

const AdminContainer = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
  background-color: ${LIGHT_BG};
  font-family: "Montserrat", sans-serif;

  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2.5rem;
  }
`;

const TableContainer = styled.div`
  margin-top: 30px;
  background-color: ${CARD_BG};
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;

  h2 {
    color: ${ACCENT_COLOR};
    font-size: 1.5rem;
    margin-bottom: 15px;
    border-bottom: 2px solid ${ACCENT_COLOR}30;
    padding-bottom: 5px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 10px;
  text-align: left;
  font-size: 0.95rem;

  th,
  td {
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 12px 10px;
  }

  th {
    background-color: ${ACCENT_COLOR};
    color: white;
    font-weight: 600;
  }

  td input {
    width: 90%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s;
    margin-right: 8px;
  }
`;

const AdminPage: React.FC = () => {
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editedData, setEditedData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail !== "admin@example.com") navigate("/");
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const [servicesRes, mastersRes, clientsRes, bookingsRes] = await Promise.all([
        axios.get("http://127.0.0.1:5000/services/"),
        axios.get("http://127.0.0.1:5000/masters/"),
        axios.get("http://127.0.0.1:5000/clients/"),
        axios.get("http://127.0.0.1:5000/bookings/")
      ]);
      setServices(servicesRes.data);
      setMasters(mastersRes.data);
      setClients(clientsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleInputChange = (endpoint: string, id: number, key: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [`${endpoint}_${id}`]: {
        ...prev[`${endpoint}_${id}`],
        [key]: value
      }
    }));
  };

  const handleUpdate = async (endpoint: string, id: number) => {
    const updatedData = editedData[`${endpoint}_${id}`];
    if (!updatedData) {
      alert("No changes to update.");
      return;
    }
    try {
      await axios.put(`http://127.0.0.1:5000/${endpoint}/${id}`, updatedData);
      fetchAllData();
      alert(`Updated successfully in ${endpoint}`);
    } catch (error) {
      console.error("Error updating row:", error);
      alert("Failed to update record.");
    }
  };

  const handleDelete = async (endpoint: string, id: number) => {
    if (!window.confirm(`Are you sure you want to delete row ${id}?`)) return;
    try {
      await axios.delete(`http://127.0.0.1:5000/${endpoint}/${id}`);
      fetchAllData();
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const renderTable = (data: any[], columns: string[], endpoint: string) => (
    <Table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col}>{col}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.id}>
            {columns.map(col => {
              const readOnlyMasters = endpoint === "masters" && col === "user_id";
              const readOnlyBookings = endpoint === "bookings" && ["user_id", "master_id", "service_id"].includes(col);
              const isReadOnly = readOnlyMasters || readOnlyBookings;
              return (
                <td key={col}>
                  {col === "id" || isReadOnly ? (
                    row[col]
                  ) : (
                    <input
                      defaultValue={row[col]}
                      onChange={e =>
                        handleInputChange(endpoint, row.id, col, e.target.value)
                      }
                    />
                  )}
                </td>
              );
            })}
            <td>
              <button
                onClick={() => handleUpdate(endpoint, row.id)}
                style={{
                  backgroundColor: "#6c9a76",
                  color: "white",
                  border: "none"
                }}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(endpoint, row.id)}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  border: "none"
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <>
      <Header isAuthenticated={true} />
      <AdminContainer>
        <h1>Admin Panel</h1>

        <TableContainer>
          <h2>Services</h2>
          {renderTable(services, ["id", "name", "description"], "services")}
        </TableContainer>

        <TableContainer>
          <h2>Masters</h2>
          {renderTable(masters, ["id", "user_id", "service_id", "bio"], "masters")}
        </TableContainer>

        <TableContainer>
          <h2>Clients</h2>
          {renderTable(clients, ["id", "additional_info"], "clients")}
        </TableContainer>

        <TableContainer>
          <h2>Bookings</h2>
          {renderTable(bookings, ["id", "user_id", "master_id", "service_id", "booking_datetime"], "bookings")}
        </TableContainer>
      </AdminContainer>
    </>
  );
};

export default AdminPage;
