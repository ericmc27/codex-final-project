import React, { useEffect } from "react"
import { BounceLoader } from "react-spinners"
import { Context } from "../store/appContext"
import { useNavigate, Link } from "react-router-dom"
import "../../styles/client.css"

import { socket } from ".."


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

  useEffect(()=>{
    socket.on("lawyerPictureUpdate", async()=>{
      await changeLawyerType(areaOfNeed)
    })
  }, [])

  return (
    <div className="container d-flex flex-column align-items-center">
      <button style={{backgroundColor:"#3E362E", padding:"10px"}} className="btn mt-3 text-white">
      <Link className="text-white text-decoration-none" to="../current_client">
        My case(s)
      </Link>
      </button>
      <h4 style={{margin:"25px 0px 50px 0px"}}>{areaOfNeed} Lawyers</h4>
      <div className="d-flex flex-column gap-4">
        {
          lawyerList?.map((lawyer, index) => { 
            return (
              <>
                <div key={index} style={{ width: "600px", height: "250px" }} className="border border-dark d-flex rounded">
                  <img className="rounded" width={"240px"} height={"250px"} src={`${process.env.BACKEND_URL}/assets/${lawyer.photo}`} />
                  <div style={{width:"250px"}} className="d-flex flex-column align-items-center">
                    <h3 className="mt-4 text-capitalize">{lawyer.name}</h3>
                    <h5 className="text-capitalize">{lawyer.specialty}</h5>
                  </div>
                  <button style={{backgroundColor:"#3E362E", color:"white"}} className="btn ms-auto" onClick={() => (navigate(`/profile?id=${lawyer.id}`, { state: { id: lawyer.id, name: lawyer.name, photo: lawyer.photo} }))}>SEE MY PROFILE</button>
                </div>
              </>
            )
          })
        }
      </div>


      <label style={{ top: "140px", left: "84%", right: "5%" }} className="position-absolute"><big>Lawyer Specialties</big></label>
      <ul style={{ top: "175px", left: "82%", width: "250px", height: "500px", overflowY: "auto", maxHeight: "500px", border: "1px solid #3E362E" }} className="rounded list-unstyled position-absolute">
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