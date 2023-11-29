import { BrowserRouter,Route,Routes } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./paginas/Login"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/OlvidePassword"
import Registrar from "./paginas/Registrar"
import NewPassword from "./paginas/newPassword"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import Perfil from "./paginas/Perfil"
import CambiarPassword from "./paginas/CambiarPassword"

import { AuthProvider } from "../context/AuthProvider"
import { ProviderPacientes } from "../context/ProviderPacientes"
import PrivateLayout from "./layout/PrivateLayout"
function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProviderPacientes>

          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login/>}/>
              <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta/>}/>
              <Route path="cambiar-password" element={<OlvidePassword/>}/>
              <Route path="cambiar-password/:token" element={<NewPassword/>}/>
              <Route path="registrar" element={<Registrar/>}/>
            </Route>
            
            <Route path="/admin" element={<PrivateLayout/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path="perfil" element={<Perfil/>}/>
              <Route path="cambiar-clave" element={<CambiarPassword/>}/>

            </Route>
            
          </Routes>
        </ProviderPacientes>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
