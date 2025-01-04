import React from "react";
import { CommonFields } from "../component/signup";
import { AreaOfNeed } from "../component/signup";
import { LawyerFields } from "../component/signup";
import { Context } from "../store/appContext"
import { useLocation } from "react-router-dom";

const Signup = () => {
  const location = useLocation()
  const [userType, setUserType] = React.useState(location.state?.userType || "Client")
  const [userData, setUserData] = React.useState({name: '', email: '', password: '', phone: '', address: '', areaOfNeed: '', specialty: ''})
  // const [lawyerFields, setLawyerFields] = React.useState({ photo: '', specialty: '', barNumber: '', lawFirm: '', credentials: '' })
  const { actions } = React.useContext(Context)

  console.log(userData)
  const handleChange = (e) => {
    let { name, value } = e.target

    if (name !== "password" && name !== "areaOfNeed" && name !== "specialty") {
      value = value.toUpperCase()
    }

    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const changeUserType = (e) => {
    const { value } = e.target
  
    if(value !== userType){
      setUserData({name: '', email: '', password: '', phone: '', address: '', areaOfNeed: '', specialty: ''})
      setUserType(value)
    }
  }

  return (
    <>
      <div style={{ margin: "30px 0px 20px 0px" }} className="form-check form-switch d-flex justify-content-center">
        <input
          onChange={changeUserType}
          style={{ width: "45px", height: "30px" }}
          className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
          value={"Client"}
          checked={userType === "Client"}
        />


        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Client</label>

        <input
          onChange={changeUserType}
          style={{ marginLeft: "20px", width: "45px", height: "30px" }}
          className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaults"
          value={"Lawyer"}
          checked={userType === "Lawyer"}
        />

        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Lawyer</label>
      </div>

      {userType === "Client" ?
        <form onSubmit={(e) => (actions.signup(e, userData, userType))} className="m-auto border border-1 rounded d-flex flex-column align-items-center" style={{ width: "400px", height: "520px"}}>
           <CommonFields userData={userData} handleChange={handleChange} />
           <AreaOfNeed userData={userData} handleChange={handleChange} />
           <button className="btn btn-primary mt-2" type="submit">Signup</button>
        </form>
        :
        <form onSubmit={(e) => (actions.signup(e, userData, userType))} className="m-auto border border-1 rounded d-flex flex-column align-items-center" style={{ width: "400px"}}>
          <CommonFields userData={userData} handleChange={handleChange} />
          <LawyerFields userData={userData} handleChange={handleChange} />
          <button className="btn btn-primary mt-2" type="submit">Signup</button>
        </form>

      }


    </>

  );
}

export default Signup;