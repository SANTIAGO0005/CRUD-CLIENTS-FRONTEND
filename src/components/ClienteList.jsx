import React from 'react';
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
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useActions } from '../hooks/useActions';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    width: '750px',
  },
  searchInput: {
    marginRight: theme.spacing(2),
  },
  tableContainer: {
    width: '750px',
    height: '400px',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const ClienteList = () => {
  const classes = useStyles();
  const {
    handleAddClient,
    handleDelete,
    handleSearch,
    handleSearchSubmit,
    clients = [],
    searchQuery,
  } = useActions();

  return (
    <Box className={classes.container}>
      <Typography variant="h6" align="left" gutterBottom>
        Listado de clientes
      </Typography>
      <Box className={classes.searchContainer}>
        <TextField
          className={classes.searchInput}
          type="text"
          placeholder="Buscar"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
        />
        <IconButton type="submit" color="primary" aria-label="buscar" onClick={handleSearchSubmit}>
          <SearchIcon />
        </IconButton>
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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.name}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.id_number}</TableCell>
                  <TableCell>{cliente.birthday}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="editar"
                      component={Link}
                      to={`/cliente/${cliente.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="eliminar"
                      onClick={() => handleDelete(cliente.id)}
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
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClient}
        >
          Nuevo Cliente
        </Button>
      </Box>
    </Box>
  );
};

export default ClienteList;
