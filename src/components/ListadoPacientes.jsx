import usePacientes from "../../hooks/usePacientes"
import Paciente from "../components/Paciente";

const ListadoPacientes = () => {

  const {pacientes} = usePacientes();

  // console.log(pacientes);
  return (
    <>
      {pacientes.length ? 
      (        
        <>
            
          <h2 className=" font-black text-3xl text-center">Todos Tus Pacientes</h2>
            <p className=" text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className=" text-indigo-600 font-bold">Pacientes</span>
            </p>
            {pacientes.map((paciente) => (
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            ))}
        </>
      ) : 
        (
          <>
            <h2 className=" font-black text-3xl text-center">No Hay Pacientes</h2>
            <p className=" text-xl mt-5 mb-10 text-center">
              Registra tus pacientes y {''}
              <span className=" text-indigo-600 font-bold">Administralos Aquí</span>
            </p>
          </>
        )
      }
    </>
  )
}

export default ListadoPacientes