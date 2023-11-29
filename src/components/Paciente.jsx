import PropType from 'prop-types'
import usePacientes from '../../hooks/usePacientes'


const Paciente = ({paciente}) => {
    const {editar,eliminarPacientes} = usePacientes();

    const { email,fecha,nombre,propietario, sintomas, _id} = paciente
    const fomatDate = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-DO',{dateStyle: 'long'}).format(nuevaFecha)
    }

  return (
    <div className=' mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
        <p className='font-bold uppercase text-gray-800 my-3'>Nombre:{''}
            <span className=' font-normal normal-case'> {nombre}</span>
        </p>
        <p className='font-bold uppercase text-gray-800 my-3'>Propietario:{''}
            <span className=' font-normal normal-case'> {propietario}</span>
        </p>
        <p className='font-bold uppercase text-gray-800 my-3'>Correo:{''}
            <span className=' font-normal normal-case'> {email}</span>
        </p>
        <p className='font-bold uppercase text-gray-800 my-3'>Fecha de Registro:{''}
            <span className=' font-normal normal-case'> {fomatDate(fecha)}</span>
        </p>
        <p className='font-bold uppercase text-gray-800 my-3'>Historial clinico:{''}
            <span className=' font-normal normal-case'> {sintomas}</span>
        </p>
        {/* <p className='font-bold uppercase text-gray-800'>Nombre:{''}
            <span className=' font-normal normal-case'> {nombre}</span>
        </p> */}
        <dir className=" flex justify-between my-5">
            <button
                type='button'
                className=' py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg'
                onClick={()=>editar(paciente)}
            >Editar

            </button>
            <button
                type='button'
                className=' py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg'
                onClick={()=> eliminarPacientes(_id)}
            >Eliminar

            </button>

        </dir>
    </div>
  )
}

Paciente.propTypes = {
    paciente: PropType.any.isRequired,
}
export default Paciente