import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Mensajes from "../components/Mensajes"
import useAuth from "../../hooks/useAuth"
// import { useNavigate } from "react-router-dom"

const CambiarPassword = () => {
    const [alerta,setAlerta] = useState({});
    const [password,setPassword] = useState({});
    const {msg} = alerta
    const {cambiarPassword,cerrarSeccion} = useAuth()
    const handleSubmit = async e =>{
        e.preventDefault()
        if(Object.values(password).length < 3){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        if(Object.values(password)[1] !== Object.values(password)[2]){
            setAlerta({
                msg: 'Las Contraseñas no coinciden',
                error: true
            })
            return
        }
        if(Object.values(password)[1] === Object.values(password)[0]){
            setAlerta({
                msg: 'Tu contraseña actual y la nueva son iguales',
                error: true
            })
            return
        }
        if(Object.values(password)[1].length < 6){
            setAlerta({
                msg: 'Tu contraseña debe de tener minimo 6 caracteres',
                error: true
            })
            return
        }
        const validacionPass = await cambiarPassword(password)

        setAlerta(validacionPass)
       
        if(validacionPass.error === false){
            setTimeout(()=>{
                setAlerta({})
                cerrarSeccion()
            },5000)
            
            return
        }
        setTimeout(()=>{
            setAlerta({})
        },3000)

    }
  return (
    <>
        <AdminNav/>
        <h2 className=" font-black text-3xl text-center mt-10 text-gray-800">Cambiar Contraseña</h2>
        <p className=" text-xl mt-5 mb-10 text-center">Modifica tu {''} 
        <span className="text-indigo-600 font-bold" >Contraseña aquí</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg&& <Mensajes
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className=" my-3">
                        <label 
                            htmlFor="clave"
                            className=" uppercase font-bold text-gray-600"    
                        >Contraseña Actual</label>
                        <input
                            id="clave" 
                            type="password"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="contraseña actual"
                            name="clave_A"
                            // value={claveA}
                            // onChange={e => setClaveA(e.target.value)}
                            onChange={e => {
                                setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>
                    <div className=" my-3">
                        <label 
                            htmlFor="Nclave"
                            className=" uppercase font-bold text-gray-600"    
                        >Nueva Contraseña</label>
                        <input
                            id="Nclave" 
                            type="password"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="nueva contraseña"
                            name="N_clave"
                            // value={Nclave}
                            onChange={e => {
                                setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>
                    <div className=" my-3">
                        <label 
                            htmlFor="Nclave2"
                            className=" uppercase font-bold text-gray-600"    
                        >Confirma tu nueva Contraseña</label>
                        <input
                            id="Nclave2" 
                            type="password"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="confirma tu contraseña"
                            name="N_clave2"
                            // value={Cclave}
                            onChange={e => {
                                setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Cambiar Contraseña"
                        className=" bg-indigo-700 px10 py-3 font-bold text-white rounded-lg uppercase w-full mt-8 hover:bg-indigo-800 cursor-pointer"
                    />                  

                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword