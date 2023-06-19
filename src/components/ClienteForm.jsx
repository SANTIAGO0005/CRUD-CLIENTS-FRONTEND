/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
  },
  formTitle: {
    marginBottom: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

const BASE_URL = 'https://client-api-five.vercel.app/api';

function ClienteForm() {

  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [id_number, setId_number] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchClienteDetails();
    }
  }, [id]);

  const fetchClienteDetails = async () => {
    
    try {
      const response = await axios.get(`${BASE_URL}/clients/${id}/`, { headers : { 'Access-Control-Allow-Origin' : '*'}});
      const { name, email, birthday, id_number } = response.data;
      setName(name);
      setEmail(email);
      setBirthday(birthday);
      setId_number(id_number);
    } catch (error) {
      console.error('Error fetching cliente details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clienteData = {
        name,
        email,
        birthday,
        id_number,
      };
      if (id!=='nuevo') {
        await axios.put(`${BASE_URL}/clients/update/${id}/`, clienteData)
        .then(resp=>history.push('/') );
      } else {
        await axios.post(`${BASE_URL}/clients/create/`, clienteData)
        .then(resp=>history.push('/') );
      }

      history.push('/');
    } catch (error) {
      console.error('Error creating/updating cliente:', error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.formTitle}>{id!=='nuevo' ?'Crear Cliente':'Editar Cliente' }</h2>
        <TextField
          className={classes.formField}
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          className={classes.formField}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          className={classes.formField}
          label=""
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <TextField
          className={classes.formField}
          label="Documento"
          value={id_number}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <div className={classes.formActions}>
          <Button type="submit" variant="contained" color="primary" component={Link} to="/">
            {id!=='nuevo' ? 'Guardar':'Actualizar' }
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;
