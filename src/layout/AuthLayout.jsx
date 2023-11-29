import {Outlet} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-6 gap-1 p-5">
            <Outlet />
        </main>
    </>
 )
}

export default AuthLayout