import { useState } from "react"
import { Link } from "react-router-dom"
import Mensajes from "../components/Mensajes"
import axios from "axios"
const OlvidePassword = () => {
  const [email,setEmail] = useState('');
  const [alerta,setAlerta] = useState({});
  const {msg} = alerta;

  const handleSubmit = async(e)=> {
    e.preventDefault();
    if(email === ''){
      setAlerta({msg: 'El Email es obligatorio', error: true})
      return
    }

    try {
     const url = `${import.meta.env.VITE_BACKEND_URL}cambiar-password`
      const {data } = await axios.post(url,{email})

      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl mt-32">Recupera {""}        
        <span className=" text-gray-600"> tu cuenta</span>
        </h1>
      </div>
      <div className="mt-28">
        <div className="md:mt-5 shadow-lg px-5 py-1 rounded-xl bg-white">
          {msg && 
            <Mensajes
              alerta={alerta}
            />
          }
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="email" 
                placeholder="correo electronico"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            

            <input 
              type="submit"
              value="Recuperar Cuenta"
              className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            />
          </form>
          <nav className="mt-1 lg:flex lg:justify-between">
            
            <p className="block text-center my-5 text-gray-500">
              ¿No tienes una cuenta?
              <Link
                className=" text-indigo-400 hover:text-indigo-800" 
                to="/registrar"> Regístrate aquí
              </Link>
            </p>
            <Link
              className="block text-center my-5 text-gray-500 hover:text-indigo-400" 
              to="/">Iniciar Sección</Link>
            
          </nav>
        </div>
      </div>

    </>
  )
}

export default OlvidePassword