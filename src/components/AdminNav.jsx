import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="flex gap-8">
        <Link 
            to="/admin/perfil"
            className=" font-bold uppercase text-gray-500"
        >
            Perfil
        </Link>
        <Link 
            to="/admin/cambiar-clave"
            className=" font-bold uppercase text-gray-500"
        >
            Cambiar Contraseña
        </Link>
    </nav>
  )
}

export default AdminNav