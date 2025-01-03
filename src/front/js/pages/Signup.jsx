import React from "react";
import { CommonFields } from "../component/signup";
import { AreaOfNeed } from "../component/signup";
import { LawyerFields } from "../component/signup";
import { Context } from "../store/appContext"

const Signup = () => {
  const [userType, setUserType] = React.useState("client")
  const [userData, setUserData] = React.useState({ name: '', email: '', password: '', phone: '', address: '' })
  const [areaOfNeed, setAreaOfNeed] = React.useState({areaOfNeed: ''})
  const [lawyerFields, setLawyerFields] = React.useState({ photo: '', specialty: '', barNumber: '', lawFirm: '', professionalExperience: '', credentials: '' })
  const { actions } = React.useContext(Context)

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name !== "password") {
      value = value.toUpperCase()
    }

    setUserData(prev => ({ ...prev, [name]: value }))
    setAreaOfNeed(prev => ({ ...prev, [name]: value }))
    setLawyerFields(prev => ({ ...prev, [name]: value }))
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
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Client</label>

        <input
          onChange={changeUserType}
          style={{ marginLeft: "20px", width: "45px", height: "30px" }}
          className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaults"
          value={"lawyer"}
          checked={userType === "lawyer"}
        />

        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Lawyer</label>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Lawyer</label>
      </div>

      {userType === "client" ?
        <form onSubmit={(e) => (actions.signupClient(e, userData, areaOfNeed))} className="m-auto border border-1" style={{ width: "400px" }}>
          <CommonFields userData={userData} handleChange={handleChange} />
          <AreaOfNeed areaOfNeed={areaOfNeed} handleChange={handleChange} />
        </form>
        :
        <form onSubmit={(e) => (actions.signupLawyer(e, userData, lawyerFields))} className="m-auto border border-1" style={{ width: "400px" }}>
          <CommonFields userData={userData} handleChange={handleChange} />
          <LawyerFields lawyerFields={lawyerFields} handleChange={handleChange} />
        </form>

      }


    </>

  );
}

export default Signup;