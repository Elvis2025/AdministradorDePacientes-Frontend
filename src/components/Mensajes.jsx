import { PropTypes } from "prop-types"
const Mensajes = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
        {alerta.msg}
    </div>
  )
}

Mensajes.propTypes = {
    alerta: PropTypes.any.isRequired,
}
export default Mensajes