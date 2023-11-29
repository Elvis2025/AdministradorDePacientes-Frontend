import { useState, createContext } from "react";
import { PropTypes } from "prop-types"
import axios from "axios";
import { useEffectOnce } from "use-effect-once";

// import { useEffectOnce } from "use-effect-once";

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    // const {children} = props;
    const [cargando,setCargando] = useState(true)
    const [auth,setAuth] = useState({})
    useEffectOnce(()=>{
        const autenticarUser = async ()=>{
            const url = `${import.meta.env.VITE_BACKEND_URL}perfil`
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }    
            }
            try {
                const {data} = await axios(url,config)
                // console.log(data);
                setAuth(data)
            } catch (error) {
                console.log(error.response);
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUser();
    },[])
    
    const cerrarSeccion = ()=>{
        localStorage.removeItem('token')
        setAuth({})
    }


    const perfilUpdates = async(perfil)=>{
        
            const url = `${import.meta.env.VITE_BACKEND_URL}perfil/${perfil._id}`
            console.log(url);
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }    
            }

            try {
              
                await axios.put(url,perfil,config)

                return {
                    msg: 'Actualizado correctamente',
                    error: false
                }                
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
    }

    const cambiarPassword = async (pass) =>{
        const url = `${import.meta.env.VITE_BACKEND_URL}restablecer-password`
            console.log(url);
            console.log(pass.clave_A);
            console.log(pass.N_clave);
            console.log(pass.N_clave2);
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }    
            }
            try {
                const {data} = await axios.put(url,pass, config)

                return{
                    msg: data.msg,
                    error: false
                }
            } catch (error) {
                return{
                    msg: error.response.data.msg,
                    error: true
                };
            }
    }
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSeccion,
                perfilUpdates,
                cambiarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
AuthProvider.propTypes = {
    children: PropTypes.any.isRequired,    
}

export default AuthContext
