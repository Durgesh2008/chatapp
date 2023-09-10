import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
const host = process.env.REACT_APP_SERVER_URL;




const Register = () => {
  const navigate = useNavigate();
  const [Value, setValue] = useState({
    name: '', password: "", cpassword: '', email: ''
  })
  const onchangef = (e) => {
    setValue({ ...Value, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
    else {
      navigate('/setavtar')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handlevalidation() {
    let { name, password, cpassword } = Value;
    if (name.length < 3) {
      notify("username  at least 3 charcter");
      return false
    } else if (password.length < 5) {
      notify("Password e at least 5 charcter");
      return false
    } else if (password !== cpassword) {
      notify("Password and confirm password mush be same");
      navigate("/")
      return false
    }
    return true
  }
  const PostData = async (e) => {
        e.preventDefault();
    try {
      if (handlevalidation()) {
        const { name, password, email } = Value;
        const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, password, email
          })
        })

        const data = await response.json();

        if (data.success === false) {
          notify('Invalid user')
        } else {
          localStorage.setItem('chat-app-user', (JSON.stringify(data)))

          navigate('/setavtar')
        }

      }

    } catch (error) {
      notify('invalid user')
    }
   
  }

  const notify = (message) => {
    toast.error(message);

  }

  return (
    <>
      <section className="text-gray-600 h-[100vh] body-font md:flex items-center justify-center  shadow-sm">
        <div className="container w-3/4  bg-[#D3D3D3] mx-auto flex px-5 py-24 flex-col items-center md:flex-1 ">
             <h1 className='mb-4 text-[black] text-2xl self-center font-semibold   '>SIGN UP</h1>
            <form className='w-3/4 lg:flex-grow  md:flex-1 flex flex-col  md:text-left items-center md:justify-center md:mx-3'>
              <div className="relative z-0 w-full mb-3 border group rounded">
                <input onChange={onchangef}  type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Value.name} required />
                <label htmlFor="floating_email" className="peer-focus:font-medium ml-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
              </div>
              <div className="relative z-0 w-full mb-3 group rounded border">
                <input onChange={onchangef}  type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Value.email} required />
                <label htmlFor="email" className="peer-focus:font-medium absolute ml-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>
              </div>
              <div className="relative z-0 w-full mb-3 group rounded border">
                <input onChange={onchangef}  type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Value.password}required />
                <label htmlFor="floating_password" className="peer-focus:font-medium ml-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>
              <div className="relative z-0 w-full mb-3 group rounded border">
                <input onChange={onchangef}  type="password" name="cpassword"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  value={Value.cpassword}  required />
                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium ml-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
              </div>
              <button  onClick={PostData}  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transform active:scale-75 transition-transform">Register</button>
            </form>
            <p className="my-4">Already have account? <Link className='text-[#e96868]' to="/login">Login here</Link></p>
        </div>
      </section>



      <ToastContainer position="bottom-right"
        autoClose={1700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />



    </>
  )
}

export default Register
