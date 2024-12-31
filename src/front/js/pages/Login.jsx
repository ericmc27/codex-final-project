import React, { useActionState, useContext } from "react";
import { LoginInputs } from "../component/login.js";
import { Context } from "../store/appContext.js";

const Login = () => {
  const [clientData, setClientData] = React.useState({ email: '', password: '' })
  const [lawyerData, setLawyerData] = React.useState({ email: '', password: '' })
  const { actions } = useContext(Context)

  const handleChange = (e, userType) => {
      let { name, value } = e.target

      if(name !== "password"){
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
        style={{ height: "440px", width: "440px", margin: "80px auto 0px auto" }}
        className="border border-2 d-flex flex-column rounded">

        <LoginInputs clientData={clientData} handleChange={handleChange} userType={"Client"} />
        <button
          type='btn'
          style={{ width: "350px", margin: "30px auto 0px auto" }}
          className='btn btn-primary border'
        >
          Login
        </button>

      </form>


      <form
        onSubmit={(e) => (actions.login(e, lawyerData, "Lawyer"))}
        style={{ height: "440px", width: "440px", margin: "80px auto 0px auto" }}
        className="border border-2 d-flex flex-column rounded">

        <LoginInputs lawyerData={lawyerData} handleChange={handleChange} userType={"Lawyer"} />
        <button
          type='btn'
          style={{ width: "350px", margin: "30px auto 0px auto" }}
          className='btn btn-primary border'
        >
          Login
        </button>

      </form>
    </div>



  )

}

export default Login;