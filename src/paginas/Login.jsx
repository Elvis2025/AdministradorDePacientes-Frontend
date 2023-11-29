import { Link,useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import Mensajes from "../components/Mensajes"
import axios from "axios"

const Login = () => {
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [alerta,setAlerta] = useState({})
  const {setAuth} = useAuth();
  const {msg} = alerta;
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_BACKEND_URL}login`
  const handleSubmit = async (e)=>{
    e.preventDefault();
    // console.log(e);
    if(email === '' || password === ''){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })     
      return
    }
    try {
      const {data} = await axios.post(url,{email,password})
      // console.log(data.msg);
      localStorage.setItem('token',data.token)
      setAuth(data)
      // console.log(data);
      navigate('/admin')
    } catch (error) {
      console.log(error.response);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    // console.log(e)


  }

  return (
    <>       
        <div className="">
            <h1 className="text-indigo-600 font-black text-6xl mt-14">Inicia Sesión y Administra tus <span className=" text-gray-700">Pacientes</span>
            </h1>
        </div>
        <div className="mt-8">
          <div className="md:mt-5 shadow-lg px-6 py-4 rounded-xl bg-white">
            {msg && 
              <Mensajes
                alerta={alerta}
              />
            }
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <label 
                  className="uppercase text-gray-600 block text-xl font-bold">
                  Correo Electrónico
                </label>
                <input
                  type="email" 
                  placeholder="correo electronico"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={email}
                  onChange={e => {
                      setEmail(e.target.value)
                      setAlerta({})
                      }}
                />
              </div>
              <div className="my-5">
                <label 
                  className="uppercase text-gray-600 block text-xl font-bold">
                  Contraseña
                </label>
                <input
                  type="password" 
                  placeholder="contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={
                    (e) => {
                      setPassword(e.target.value)
                      setAlerta({})
                    }}

                />
              </div>

              <input 
                type="submit"
                value="Iniciar Sesión"
                className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
              />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
            
                <p className="block text-center my-5 text-gray-500">
                  ¿No tienes una cuenta?
                  <Link
                    className=" text-indigo-400 hover:text-indigo-800" 
                    to="/registrar"> Regístrate aquí
                  </Link>
                </p>
                <Link
                  className="block text-center my-5 text-gray-500 hover:text-indigo-400" 
                  to="/cambiar-password">Olvide mi Contraseña</Link>
              
            </nav>
          </div>
      </div>
      
    </>
  )
}

export default Login