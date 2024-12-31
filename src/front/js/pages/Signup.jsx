import React from "react";
import { CommonFields } from "../component/signup";
import { Context } from "../store/appContext"

const Signup = () => {
  const [userType, setUserType] = React.useState("client")
  const [userData, setUserData] = React.useState({ name: '', email: '', password: '', phone: '', address: '' })
  const { actions } = React.useContext(Context)

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name !== "password") {
      value = value.toUpperCase()
    }

    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const changeUserType = (e) => {
    const { value } = e.target
    setUserType(value)
  }

  return (
    <>
      <div style={{ margin: "30px 0px 20px 0px" }} className="form-check form-switch d-flex justify-content-center">
        <input
          onChange={changeUserType}
          style={{ width: "45px", height: "30px" }}
          className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
          value={"client"}
          checked={userType === "client"}
        />

        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Client</label>

        <input
          onChange={changeUserType}
          style={{ marginLeft: "20px", width: "45px", height: "30px" }}
          className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaults"
          value={"lawyer"}
          checked={userType === "lawyer"}
        />

        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Lawyer</label>
      </div>

      {userType === "client" ?
        <form onSubmit={(e) => (actions.signupClient(e, userData))} className="m-auto border border-1" style={{ width: "400px" }}>
          <CommonFields userData={userData} handleChange={handleChange} />
          <select name="players">
            <option value={""} selected hidden>Lawyer Type</option>
            <option value={"lebron"}>Lebron</option>
            <option value={"curry"}>Curry</option>
          </select>
        </form>
        :
        <form onSubmit={(e) => (actions.signupClient(e, userData))} className="m-auto border border-1" style={{ width: "400px" }}>
          <CommonFields userData={userData} handleChange={handleChange} />
        </form>
      }
    </>

  );
}

export default Signup;