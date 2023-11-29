import { useState,useEffect } from "react"
import Mensajes from "./Mensajes"
import usePacientes from "../../hooks/usePacientes"
// import { useEffectOnce } from "use-effect-once"
// import { useNavigate } from "react-router-dom"

const Formulario = () => {
    const [nombre,setNombre] =useState('')
    const [propietario,setPropietario] =useState('')
    const [email,setEmail] =useState('')
    const [fecha,setFecha] =useState('')
    const [sintomas,setSintomas] =useState('')
    const [id,setId] = useState(null)

    const [alerta,setAlerta]= useState({})
    const {msg} = alerta;

    const { guardarPacientes,pacientes } = usePacientes()

    useEffect(()=>{

        if(pacientes?.nombre){
            setNombre(pacientes.nombre)
            setPropietario(pacientes.propietario)
            setEmail(pacientes.email)
            setFecha(pacientes.fecha)
            setSintomas(pacientes.sintomas)
            setId(pacientes._id)
        }
        // console.log('render');
    },[pacientes])
    // console.log(pacienteE);

    // const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        guardarPacientes({nombre,propietario,email,fecha,sintomas,id})
        setAlerta({
            msg: 'Guardado Correctamente',
            error: false
        })
        setTimeout(()=>{
            setAlerta({})
        },2550)
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
    return (
      <>
        <h2 className=" font-black text-3xl text-center">Administrador de Pacientes</h2>
        <p className=" text-lg text-center mt-5 mb-10"> Añade tus Pacientes y {''}
            <span className=" text-indigo-600 font-bold">Administralos</span>
        </p>
        {msg && 
            <Mensajes
                alerta={alerta}
            />
        }
        <form  
            className=" bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}

        >
            <div>
                <label 
                    htmlFor="mascota"
                    className=" text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                <input 
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => {
                        setNombre(e.target.value)
                        setAlerta({})
                    }}

                />
            </div>
            <div className="mt-5">
                <label 
                    htmlFor="propietario"
                    className=" text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => {
                        setPropietario(e.target.value)
                        setAlerta({})
                    }}

                />
            </div>
            <div className=" mt-5">
                <label 
                    htmlFor="email"
                    className=" text-gray-700 uppercase font-bold"
                    >Correo Electrónico</label>
                <input 
                    id="email"
                    type="text"
                    placeholder="correo del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                        setAlerta({})
                    }}
                />
            </div>
            <div className=" mt-5">
                <label 
                    htmlFor="fecha"
                    className=" text-gray-700 uppercase font-bold"
                    >Fecha de Registro</label>
                <input 
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => {
                        setFecha(e.target.value)
                        setAlerta({})
                    }}
                />
            </div>
            <div className=" mt-5">
                <label 
                    htmlFor="sintomas"
                    className=" text-gray-700 uppercase font-bold"
                    >Historia Clínica</label>
                <textarea 
                    id="sintomas"
                    placeholder="Describe el historial de tu paciente..."
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => {
                        setSintomas(e.target.value)
                        setAlerta({})
                    }}

                />
            </div>
            <input 
                type="submit" 
                className=" bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors mt-8 rounded-lg" 
                // value="Agregar Pacientes"
                value={id? 'Guardar Cambios': 'Agregar Pacientes'}
                
            />
        </form>
      </>
  )
}

export default Formulario