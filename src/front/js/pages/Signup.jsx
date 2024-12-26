import React from "react";
import { CommonFields } from "../component/signup";
import { Context } from "../store/appContext"

const Signup = () => {
  const [userData, setUserData] = React.useState({ name: '', email: '', password: '', phone: '', address: '' })
  const { actions } = React.useContext(Context)

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name !== "password") {
      value = value.toUpperCase()
    }

    setUserData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
          <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
      </div>

      <form onSubmit={(e) => (actions.signup(e, userData))} className="m-auto border border-1" style={{ width: "400px" }}>
        <CommonFields userData={userData} handleChange={handleChange} />
      </form>
    </>

  );
}

export default Signup;