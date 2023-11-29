import AdminNav from "../components/AdminNav"
import useAuth from '../../hooks/useAuth'
import { useEffectOnce } from "use-effect-once";
import { useState } from "react";
import Mensajes from '../components/Mensajes'

const Perfil = () => {

    const {auth,perfilUpdates} = useAuth()
    const [alerta,setAlerta] = useState({})
    const {msg} = alerta
    // console.log(auth);
    const [perfil,setPerfil] = useState({})
    useEffectOnce(()=>{
        setPerfil(auth)
    },[auth])

    const handleSubmit = async e =>{
        e.preventDefault();
        const {nombre, email} = perfil
        if([nombre,email].includes('')){
            setAlerta({
                msg: 'Los campos Correo y Nombre son obligatorios',
                error: true
            })
            return
        }

        const  response = await perfilUpdates(perfil)
        setAlerta(response)
        // if(response.error === false){
        //     setTimeout(()=>{
        //         setAlerta({})
        //         cerrarSeccion
        //     },5000)
        //     return
        // }
        setTimeout(()=>{
            setAlerta({})
        },3000)

    }

  return (
    <>
        <AdminNav/>
        <h2 className=" font-black text-3xl text-center mt-10 text-gray-800">Editar Perfil</h2>
        <p className=" text-xl mt-5 mb-10 text-center">Actualiza tu {''} 
        <span className="text-indigo-600 font-bold" >Perfil aquí</span></p>
    
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg&& <Mensajes
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className=" my-3">
                        <label 
                            htmlFor="nombre"
                            className=" uppercase font-bold text-gray-600"    
                        >Nombre</label>
                        <input
                            id="nombre" 
                            type="text"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="nombre"
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => {
                                setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>
                    <div className=" my-3">
                        <label 
                            htmlFor="web"
                            className=" uppercase font-bold text-gray-600"    
                        >Sitio Web</label>
                        <input
                            id="web" 
                            type="text"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="sitio web"
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => {
                                setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>
                    <div className=" my-3">
                        <label 
                            htmlFor="telefono"
                            className=" uppercase font-bold text-gray-600"    
                        >Teléfono</label>
                        <input
                            id="telefono" 
                            type="text"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="telefono"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => {
                                setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>
                    <div className=" my-3">
                        <label 
                            htmlFor="correo"
                            className=" uppercase font-bold text-gray-600"    
                        >Correo </label>
                        <input
                            id="correo" 
                            type="text"
                            className=" bg-gray-100 w-full p-2 mt-5 rounded-lg"
                            placeholder="correo"
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => {
                                setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })
                                setAlerta({})
                            }}
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Guardar Cambios"
                        className=" bg-indigo-700 px10 py-3 font-bold text-white rounded-lg uppercase w-full mt-8 hover:bg-indigo-800 cursor-pointer"
                    />

                </form>
            </div>
        </div>
    </>

  )
}

export default Perfil