import React from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


const Client = () => {
  const [lawyerType, setLawyerType] = React.useState("Family")
  const navigate = useNavigate()
  const { store } = React.useContext(Context)
  const { lawyers, lawyersType } = store

  const changeLawyerType = (type) => {
    setLawyerType(type)
  }

  return (
    <div className="container d-flex justify-content-center">

      <div className="d-flex flex-column gap-4">

        {
          lawyers[lawyerType].map((lawyer, index) => {
            return (
              <>
                <div style={{ width: "350px", height: "130px", marginTop: index === 0 && "50px" }} className="border">
                  {lawyer.name}
                  <button onClick={()=>(navigate(`/profile`, {state: {id: lawyer.id, category: lawyerType, name: lawyer.name}}))}>see profile</button>
                </div>
              </>
            )
          })
        }
      </div>

      <label style={{ top: "110px", left: "90%" }} className="position-absolute">Lawyers Type</label>
      <ul style={{ top: "150px", left: "90%", width: "150px", height: "250px" }} className="ul-lawyer-types rounded list-unstyled border position-absolute">
        {
          lawyersType.map((lawyer, index) => {
            return <li role="button" onClick={() => (changeLawyerType(lawyer))}><div style={{ height: "15px", width: "15px", backgroundColor: index === lawyersType.indexOf(lawyerType) && "#3E362E" }} className="border rounded-circle"></div>{lawyer}</li>
          })
        }
      </ul>

    </div>

  )
}

export default Client 