import React, { useEffect } from "react"
import { BounceLoader } from "react-spinners"
import { Context } from "../store/appContext"
import { useNavigate, Link } from "react-router-dom"


export const ProtectedClient = ({ children }) => {
  const { actions } = React.useContext(Context)
  const [token, setToken] = React.useState(undefined)

  React.useEffect(() => {
    const verify = async () => {
      const token = await actions.verifyJwt()
      setToken(token)
    }
    verify()
  }, [])

  return (
    <>
      {token !== undefined ?
        children :
        <BounceLoader />
      }
    </>
  )
}

const Client = () => {
  const { store, actions } = React.useContext(Context)
  const navigate = useNavigate()
  const [lawyerList, setLawyerList] = React.useState(() => (JSON.parse(localStorage.getItem("lawyers"))))
  const [areaOfNeed, setAreaOfNeed] = React.useState(() => (localStorage.getItem("Area of Need")))
  const { lawyersType } = store

  const changeLawyerType = async (type) => {
    setAreaOfNeed(type); localStorage.setItem("Area of Need", type)
    await actions.displayLawyers(type)
    setLawyerList(JSON.parse(localStorage.getItem("lawyers")))
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <Link to="../current_client">My case(s)</Link>
      <h4 style={{margin:"25px 0px 50px 0px"}}>{areaOfNeed} Lawyers</h4>
      <div className="d-flex flex-column gap-4">
        {
          lawyerList?.map((lawyer, index) => {
            return (
              <>
                <div key={index} style={{ width: "600px", height: "250px" }} className="border border-dark d-flex rounded">
                  <img className="rounded" width={"240px"} height={"250px"} src={`/${lawyer.photo}`} />
                  <h3 className="m-auto">{lawyer.name}</h3>
                  <button className="btn btn-dark" onClick={() => (navigate(`/profile?id=${lawyer.id}`, { state: { id: lawyer.id, name: lawyer.name, photo: lawyer.photo} }))}>SEE MY PROFILE</button>
                </div>
              </>
            )
          })
        }
      </div>


      <label style={{ top: "110px", left: "87%" }} className="position-absolute">Lawyers Type</label>
      <ul style={{ top: "150px", left: "82%", width: "250px", height: "500px", overflowY: "auto", maxHeight: "500px", border: "1px solid #3E362E" }} className="rounded list-unstyled position-absolute">
        {
          lawyersType.map((lawyer, index) => {
            return (
              <div className="d-flex gap-2" key={index}>
                <div style={{ height: "15px", width: "15px", border: "1px solid #3E362E", backgroundColor: index === lawyersType.indexOf(areaOfNeed) && "#FF8C00" }} className="rounded-circle mt-1 ms-2"></div>
                <li role="button" onClick={() => (changeLawyerType(lawyer))}>{lawyer}</li>
              </div>
            )
          })
        }
      </ul>

    </div>

  )
}

export default Client 