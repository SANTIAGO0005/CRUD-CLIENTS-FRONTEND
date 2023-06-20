import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#004BA8",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.primary}`,
    borderRadius: theme.spacing(1),
    backgroundColor: "#FFFFFF",
  },
  formTitle: {
    marginBottom: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  formActions: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const BASE_URL = "https://crud-clients-backend-production.up.railway.app/api";

function ClienteForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [id_number, setId_number] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchClienteDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchClienteDetails = async () => {
    
      try {
        const response = await axios.get(`${BASE_URL}/clients/${id}/`);
        const { name, email, birthday, id_number } = response.data;
        setName(name);
        setEmail(email);
        setBirthday(birthday);
        setId_number(id_number);
      } catch (error) {
        console.error("Error fetching client details:", error);
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
      if (id !== "create") {
        await axios.put(`${BASE_URL}/clients/update/${id}/`, clienteData);
      } else {
        await axios.post(`${BASE_URL}/clients/create/`, clienteData);
      }

      history.push("/");
    } catch (error) {
      console.error("Error creating/updating client:", error);
    }
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.formTitle}>
          {id ? "Create Client" : "Edit Client"}
        </h2>
        <TextField
          className={classes.formField}
          label="Name"
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
          label="Birthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          className={classes.formField}
          label="ID Number"
          value={id_number}
          onChange={(e) => setId_number(e.target.value)}
          required
        />
        <div className={classes.formActions}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {id!== "create" ? "Save" : "Update"}
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ClienteForm;

