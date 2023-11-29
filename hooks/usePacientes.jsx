import { useContext } from "react"
import PacientesContext from "../context/ProviderPacientes"


const usePacientes = () => {
  return useContext(PacientesContext)
 
}

export default usePacientes