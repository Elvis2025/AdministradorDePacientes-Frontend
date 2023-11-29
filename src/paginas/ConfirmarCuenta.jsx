import { useParams,Link } from "react-router-dom"
import {  useState } from "react";
import {useEffectOnce} from 'use-effect-once'
import axios from "axios";
import Mensajes from "../components/Mensajes";

const ConfirmarCuenta = () => {
  
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({msg: '',error:false});
  // const {msg} = alerta;
  const params = useParams()
  const {id} = params;
  const url = `${import.meta.env.VITE_BACKEND_URL}confirmar/${id}`;
  useEffectOnce(() => {
    
    const confirmarCuenta = async () => {
      console.log(url);
      try {
        const {data} = await axios.get(url);  
      
        setCuentaConfirmada(true)       
        setAlerta({
          msg: data.msg,
          error: false
        })
       
        
      } catch (error) {      
        
        // if(valor){
          setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        
      }
      setCargando(false)
    }
  
    // console.log(data)
    console.log(alerta);
    confirmarCuenta();
  },[])
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl mt-6">Confirma tu Cuenta y Administra {""}<br/><span className=" text-gray-700">Tus Pacientes</span>
        </h1>
      </div>
      <div className=" mt-16 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {!cargando &&
           <Mensajes
            alerta= {alerta}
          />
        }
        {cuentaConfirmada && (
          <div className="text-center">
            <Link
              className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800" 
              to="/"> Inicia Sección
            </Link>
          </div>
        )}
        
          
      </div>
    </>
  )
}

export default ConfirmarCuenta