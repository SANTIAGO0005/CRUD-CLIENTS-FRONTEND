import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Box,
  TextField,
  makeStyles,
  Paper,
  Modal,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100vh',
    background: 'linear-gradient(to bottom, #004BA8 50%, #EFEFEF 50%)',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
    width: '750px',
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    marginRight: theme.spacing(2),
    color: '#000000',
    width: '680px',
  },
  tableContainer: {
    width: '850px',
    height: '400px',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    color: '#FFFFFF',
    marginBottom: theme.spacing(2),
  },
  searchIcon: {
    color: '#000',
  },
  btnNew: {
    backgroundColor: '#004BA8',
    color: '#FFFFFF',
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#FFF',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
  modalButtonGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ClienteList = () => {
  const classes = useStyles();
  const BASE_URL = 'https://crud-clients-backend-production.up.railway.app/api';
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/clients/filter/?search=${searchQuery}`);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/clients/delete/${id}`, { client_id: id });
      fetchClients();
      setDeleteModalOpen(false);
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

  const handleAddClient = () => {
    history.push('/clients/create');
  };

  const openDeleteModal = (client) => {
    setSelectedClient(client);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h4" align="left" gutterBottom className={classes.title}>
        Listado de clientes
      </Typography>
      <Box className={classes.searchContainer}>
        <IconButton type="submit" color="primary" aria-label="buscar" onClick={handleSearchSubmit}>
          <SearchIcon className={classes.searchIcon} />
        </IconButton>
        <TextField
          className={classes.searchInput}
          type="text"
          placeholder="Buscar"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            className: classes.searchInput,
          }}
        />
      </Box>
      <Paper elevation={3} className={classes.tableContainer}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Documento</TableCell>
                <TableCell>Fecha de Nacimiento</TableCell>
                <TableCell>Fecha de Creacion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(clients)}
              {clients.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.name}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.id_number}</TableCell>
                  <TableCell>{cliente.birthday}</TableCell>
                  <TableCell>{cliente.creation_date}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="editar"
                      component={Link}
                      to={`/clients/${cliente.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="eliminar"
                      onClick={() => openDeleteModal(cliente)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box marginTop={2}>
        <Button
          className={classes.btnNew}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClient}
        >
          Nuevo Cliente
        </Button>
      </Box>

      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <div className={classes.modal}>
          <h2 className={classes.modalTitle}>¿Está seguro de eliminar este cliente?</h2>
          <p>{selectedClient?.name}</p>
          <div className={classes.modalButtonGroup}>
            <Button color="default" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button color="secondary" onClick={() => handleDelete(selectedClient?.id)}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </Box>
  );
};

export default ClienteList;
