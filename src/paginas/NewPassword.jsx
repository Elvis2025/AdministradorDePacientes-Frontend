/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react"
import { useEffectOnce } from "use-effect-once"
import { useParams,Link } from "react-router-dom"
import Mensajes from "../components/Mensajes"
import axios from "axios"


const NewPassword = () => {
    const [password,setPassword] = useState('')
    const [alerta,setAlerta] = useState({})
    const [tokenValido,setTokenValido] = useState(false)
    const [tokenModificado,setTokenModificado] = useState(false)
    const params = useParams();
    const {token} = params
    const url = `${import.meta.env.VITE_BACKEND_URL}cambiar-password/${token}`;
    console.log(url);
    // console.log(token);
    useEffectOnce(()=>{
        const comprobarToken = async()=>{
            try {
                await axios(url);

                setAlerta({
                    msg: 'Escribe tu nuevo Password',
                    error: false

                })
                setTokenValido(true)
            } catch (error) {
                // console.log(error.response);
                setAlerta({
                    msg: 'Hubo un error al reestablecer tu Password',
                    error: true
                })
            }
        }
        comprobarToken();
    },[])
    const {msg} = alerta
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(password === ''){
            setAlerta({
                msg: 'Este campo es obligatorio para cambiar el password',
                error: true
            })
            return
        }
        if(password.length < 6){
            setAlerta({
                msg: 'El Password debe de ser mínimo de 6 caracteres',
                error: true
            })
            return
        }
        try {
            // console.log(password);
            const {data} = await axios.post(url,{password})
            // console.log(data);
            setAlerta({
                msg: data.msg,
                error:false
            })
            setTokenModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl mt-6">Reestablece tu {""}        
                <span className=" text-gray-700">Password</span>
            </h1>
      </div>
      <div className=" mt-16 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        {msg && 
            <Mensajes
                alerta={alerta}

            />
        }
        {tokenValido && (
    	<>  
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold">
                        Nuevo Password
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}

                    />              
                </div>
                <div className=" text-center">
                    <div className=" flex justify-between gap-10">
                        <input 
                            type="submit"
                            value="Cambiar Password"
                            className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-1 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                            //   onClick={}
                                
                        />
                        
                        {tokenModificado &&                  


                        <Link
                            className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-1 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" 
                            to="/"> Inicia Sección
                        </Link>}
                    </div>
                    
                </div>
            </form>
            
         

            
        </>
        )}        
      </div>
    </>
  )
}

export default NewPassword