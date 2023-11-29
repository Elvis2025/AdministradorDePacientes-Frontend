import { createContext,useEffect,useState } from "react";
// import { useEffectOnce } from "use-effect-once";
import axios from "axios";
import PropTypes from 'prop-types'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();


const ProviderPacientes = ({children}) => {
    const [pacientes,setPacientes] = useState([])
    const [pacienteE,setPacienteE] = useState({})
    const {auth} = useAuth()
    const url = `http://localhost:4000/api/pacientes`
    
    useEffect(()=>{
        const obtenerPacientes =async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    return
                }
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await axios(url,config)
                // console.log(data);
                setPacientes(...pacientes,data)
                
                // console.log(pacientes);
                
            } catch (error) {
                console.log(error.response.data.msg);

            }
        }
        obtenerPacientes();
    },[auth])
    const guardarPacientes = async (paciente)=>{
        // console.log(paciente);
        const token = localStorage.getItem('token')
                // console.log(token);
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            console.log('editanto a',paciente.id);
            const url = `http://localhost:4000/api/pacientes/${paciente.id}`

            try {
                const {data} = await axios.put(url,paciente,config)
                console.log(data);
                const pacienteActualizado = pacientes.map(pacientesState => pacientesState._id === data._id ? data : pacientesState)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('Nuevo paciente');
            try {
                
                
                await axios.post(url,paciente,config)
               
            } catch (error){ 
                console.log(error.response.data.msg);
            }
        }
        
    }

    const editar = (idPaciente)=>{
        console.log('editando a',idPaciente);
        setPacienteE(idPaciente)
    }

    const eliminarPacientes = async (id)=>{
        const confirmar = confirm('Deseas eliminar este paciente?')
        const url = `http://localhost:4000/api/pacientes/${id}`
        const token = localStorage.getItem('token')
                // console.log(token);
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        console.log(confirmar);
        if(confirmar){
            try {
                const {data} = await axios.delete(url,config)
                console.log(data, 'eliminado');
                const pacientesUpdate = pacientes.filter( pacientesS => pacientesS._id !== id)
                setPacientes(pacientesUpdate);
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <PacientesContext.Provider
        value={{
            pacientes,
            guardarPacientes,
            editar,
            pacienteE,
            eliminarPacientes
        }}
    >
        {children}
    </PacientesContext.Provider>
  )
}

ProviderPacientes.propTypes ={
    children: PropTypes.any.isRequired,
}

export {
    ProviderPacientes
}
export default PacientesContext