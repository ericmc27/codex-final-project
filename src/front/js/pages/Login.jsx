import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginInputs } from "../component/login.js";
import { Context } from "../store/appContext.js";
import { ForgotPasswordModal } from "../component/forgotPassword.js";

const Login = () => {
  const [clientData, setClientData] = React.useState({ email: '', password: '' })
  const [lawyerData, setLawyerData] = React.useState({ email: '', password: '' })
  const { actions } = useContext(Context)
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleChange = (e, userType) => {
    let { name, value } = e.target

    if (name !== "password") {
      value = value.toUpperCase()
    }

    if (userType === "Client") {
      setClientData(prev => ({ ...prev, [name]: value }))
    } else {
      setLawyerData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="d-flex">
      <form
        onSubmit={(e) => (actions.login(e, clientData, "Client"))}
        style={{ height: "440px", width: "440px", margin: "80px auto 0px auto", backgroundColor: "white" }}
        className="border d-flex flex-column rounded">

        <LoginInputs clientData={clientData} handleChange={handleChange} userType={"Client"} />
        <button
          type='btn'
          style={{ width: "350px", margin: "30px auto 0px auto" }}
          className='btn btn-dark border'
        >
          Login
        </button>
        <label className="m-auto">Don't have an account? <Link className="text-decoration-none" to={"/signup"} state={{ userType: "Client" }}>Sign up</Link></label>

         {/* Forgot Password */}

        <label className="m-auto">Forgot your password? <a  href="#"onClick={(e) => {e.preventDefault();setIsModalOpen(true);}} className="forgot-password-link text-decoration-none">Click Here</a> </label>
        {isModalOpen && (
          <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        )}
      </form>


      <form
        onSubmit={(e) => (actions.login(e, lawyerData, "Lawyer"))}
        style={{ height: "440px", width: "440px", margin: "80px auto 0px auto", backgroundColor:"#3E362E", color:"#e8e7df"}}
        className="border border-2 d-flex flex-column rounded">

        <LoginInputs lawyerData={lawyerData} handleChange={handleChange} userType={"Lawyer"} />
        <button
          type='btn'
          style={{ width: "350px", margin: "30px auto 0px auto", backgroundColor: "#e8e7df", color:"#FF8C00"}}
          className='btn btn-primary border'
        >
          Login
        </button>
        <label className="m-auto">Don't have an account? <Link style={{color:"#FF8C00"}} className="text-decoration-none" to={"/signup"} state={{ userType: "Lawyer" }}>Sign up</Link></label>

        {/* Forgot Password */}
        
        <label className="m-auto">Forgot your password? <a style={{color:"#FF8C00"}}  href="#"onClick={(e) => {e.preventDefault();setIsModalOpen(true);}} className="forgot-password-link text-decoration-none">Click Here</a> </label>
        {isModalOpen && (
          <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        )}
      </form>
    </div>



  )

}

export default Login;