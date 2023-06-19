/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export const useActions =()=>{
    const BASE_URL = "https://client-api-five.vercel.app/api";
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();
  
    useEffect(() => {
      fetchClients();
    }, []);
  
    const fetchClients = async () => {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
      
      try {
        const response = await axios.get(`${BASE_URL}/clients/filter/?search=${searchQuery}`);
  
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.post(`${BASE_URL}/clients/delete/`, { client_id: id });
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    };
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      fetchClients();
    };
  
    const handleAddClient =() => {
      history.push('/cliente/nuevo');
  
    };

    return {
        handleAddClient,
        handleDelete,
        handleSearchSubmit,
        handleSearch,
        setClients,
        searchQuery,
        clients,
    }
}