import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const ProviderPacientes = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  const urlBase = "http://localhost:4000/api/pacientes";

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios(urlBase, config);
        setPacientes(data);
      } catch (error) {
        console.log(error.response?.data?.msg || error.message);
      }
    };

    obtenerPacientes();
  }, [auth]);

  const guardarPacientes = async (paciente) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      // EDITAR
      try {
        const { data } = await axios.put(
          `${urlBase}/${paciente.id}`,
          paciente,
          config
        );
        console.log("data seve",data);

        const pacientesActualizados = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );
console.log("data after save",data);
console.log("data after pacientesActualizados",pacientesActualizados);
        setPacientes(pacientesActualizados);
        setPaciente({});
      } catch (error) {
        console.log(error);
      }
    } else {
     try {
        console.log("Nuevo paciente");
        const { data } = await axios.post(urlBase, paciente, config);
        console.log("respuesta backend NUEVO:", data);
        
        const pacienteNuevo = data.pacienteGuardado ?? data;
        
        console.log("respuesta backend pacienteNuevo:", pacienteNuevo);
        setPacientes(prevPacientes => [pacienteNuevo, ...prevPacientes]);
      } catch (error) {
        console.log(error.response?.data?.msg || error.message);
      }
    }
  };

  const editar = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPacientes = async (id) => {
    
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${urlBase}/${id}`, config);

      const pacientesActualizados = pacientes.filter(
        (pacienteState) => pacienteState._id !== id
      );

      setPacientes(pacientesActualizados);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPacientes,
        editar,
        paciente,
        eliminarPacientes,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

ProviderPacientes.propTypes = {
  children: PropTypes.any.isRequired,
};

export { ProviderPacientes };
export default PacientesContext;
