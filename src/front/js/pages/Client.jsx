import React from "react"
import { BounceLoader } from "react-spinners"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const ProtectedClient = ({ children }) => {
  const { actions } = React.useContext(Context)
  const [token, setToken] = React.useState(undefined)

  React.useEffect(() => {
    const verify = async () => {
      const data = await actions.verifyJwt()
      setToken(data)
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
  const [lawyerType, setLawyerType] = React.useState("Family")
  const { store, actions } = React.useContext(Context)
  const [lawyerList, setLawyerList] = React.useState(JSON.parse(localStorage.getItem("lawyers")))
  const { lawyersType } = store


  const changeLawyerType = async (type) => {
    await actions.displayLawyers(type)
    setLawyerType(type)
  }

  React.useEffect(()=>{
    setLawyerList(JSON.parse(localStorage.getItem("lawyers")))
  }, [lawyerType])

  return (
    <div className="container d-flex justify-content-center">

      <div className="d-flex flex-column gap-4">
      {/* lawyerList[0][lawyerType].map((lawyer, index) */}
        {
          lawyerList.map((lawyer, index) => {
            return (
              <>
               <div style={{ width: "600px", height: "250px", marginTop: index === 0 && "50px" }} className="border d-flex rounded">
                <img className="rounded" width={"300px"} height={"250px"} src={`/${lawyer.photo}`}/>

                  <h3 className="m-auto">{lawyer.name}</h3>
                  {/* <button onClick={() => (navigate(`/profile`, { state: { id: lawyer.id, category: lawyerType, name: lawyer.name } }))}>see profile</button> */}
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