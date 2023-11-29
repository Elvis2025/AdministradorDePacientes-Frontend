import { useState } from "react"
import { Link } from "react-router-dom" 
import axios from 'axios'
import Mensajes from "../components/Mensajes";
// import { handleSubmit } from "../helpers/functiosHerpers";
const Registrar = () => {
  const [nombre,setNombre] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [cambiarPassword,setCambiarPassword] = useState('');
  const [alerta,setAlerta] = useState('');

  function msgTime(){
    setTimeout(()=>{
      setAlerta({})
     },2550)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if([nombre,email,password,cambiarPassword].includes('')){
        setAlerta({msg: 'Hay campos vacios',error: true});
        msgTime()
        return
    }
    if(password !== cambiarPassword){
        setAlerta({msg: 'los password no coinciden',error: true});
        msgTime()
        return;
    }
    if(password.length < 6){
        setAlerta({msg: 'El Password es muy corto, agregar minimo 6 caracteres',error: true});
        msgTime();
        return
    }
    setAlerta({})
    // Crear el Usuario en la api
    try {
      
        const url = `${import.meta.env.VITE_BACKEND_URL}`
        await axios.post(url,{nombre,email,password})
        setAlerta({
            msg: 'Creado Correctamente, revisa tu email'
        })
        msgTime();
    } catch (error) {
        setAlerta({
            msg: error.response.data.msg,
            error: true
        })
        msgTime();
        console.log(error.response);
    }

    console.log('campos completos');
  }
  
  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl mt-6">Inicia Seccion y Administra tus {""}        
        <span className=" text-gray-700">Pacientes</span>
        </h1>
      </div>
      <div className=" mt-16 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
            {msg && <Mensajes
                alerta={alerta}
            />}
          <form >
            <div className="">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input
                type="text" 
                placeholder="nombre"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                
              />
            </div>
            <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="text" 
                placeholder="email"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
                
              />
            </div>
            <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}

              />
            </div>
            <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                confirmar password
              </label>
              <input
                type="password" 
                placeholder="confirmar password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={cambiarPassword}
                onChange={e => setCambiarPassword(e.target.value)}
              />
            </div>

            <input 
              type="submit"
              value="Crear Cuenta"
              className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-1 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
              onClick={handleSubmit}
              
            />
            
          </form>
          <nav className="mt-2 lg:flex lg:justify-between">
           
           <p className="block text-center my-2 text-gray-500">
             ¿Ya tienes una cuenta?
             <Link
               className=" text-indigo-400 hover:text-indigo-800" 
               to="/"> Inicia Sección
             </Link>
           </p>
           <Link
             className="block text-center my-2 text-gray-500 hover:text-indigo-400" 
             to="/cambiar-password">Olvide mi Password</Link>
         
          </nav>
      </div>
      
    </>
  )
}

export default Registrar