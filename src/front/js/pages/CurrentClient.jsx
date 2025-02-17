import React, { useEffect, useState } from "react";
import { socket } from ".."


export const CurrentClient = () => {
  const [clientCases, setClientCases] = useState([]);
  const [lawyerEmail, setLawyerEmail] = useState("")
  const [lawyerPhoto, setLawyerPhoto] = useState("")
  const [messenger, setMessenger] = useState(false)
  const [messengerText, setMessengerText] = useState("")

  useEffect(() => {
    const fetchClientCases = async () => {
      const response = await fetch(`${process.env.BACKEND_URL}/api/client-cases`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json()
      console.log(data.cases)
      setClientCases(data.cases)
    }

    fetchClientCases();

    socket.on('lawyerMessage', (lawyerMessage) => {
      console.log(lawyerMessage)
      const messagesDiv = document.getElementById('messages')
      const messageDiv = document.createElement('div')
      messageDiv.style.cssText = 'background-color: #7ae1fa; height: auto; width: fit-content; padding: 10px; margin-top: 13px; margin-left: auto; margin-right: 10px'
      messageDiv.className = 'border rounded'
      messageDiv.innerText = lawyerMessage
      messagesDiv.append(messageDiv)
    })


    socket.on('newOpenCase', async () => {
      await fetchClientCases()
    })

    socket.on('newClosedCase', async () => {
      await fetchClientCases()
    })
  }, []);

  const handleOnClick = (email, photo) => {
    setMessenger(flag => !flag)
    setLawyerEmail(email)
    setLawyerPhoto(photo)
  }

  const handleChange = (e) => {
    setMessengerText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      socket.emit("messageToLawyer", lawyerEmail, messengerText)
      const messagesDiv = document.getElementById('messages')
      const messageDiv = document.createElement('div')
      messageDiv.style.cssText = 'background-color: lightgreen; height: auto; width:fit-content; padding: 10px; margin-top: 13px; margin-left: 13px'
      messageDiv.className = 'border rounded'
      messageDiv.innerText = messengerText
      messagesDiv.append(messageDiv)
      setMessengerText("")
    }
  }



  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex flex-column align-items-center" style={{ marginStart: "-450px" }}>
          <h3 className="mt-3">My Open Cases</h3>
          {clientCases.length !== 0 && <div className="openCases d-flex flex-column rounded" width={"150px"} height={"250px"} style={{ margin: "25px 0px 50px 0px", backgroundColor: "whitesmoke" }}>
            <div style={{ padding: "25px", backgroundColor: "#e8e7df", outlineColor: "red" }} className="d-flex flex-column gap-4">
              {clientCases
                .map((c) => (
                  <div style={{ backgroundColor: "white", marginBottom: "25px", padding: "25px" }} className="rounded" key={c.id}>
                    <h5><label className="text-bold"><b>Case Number:</b></label> {c.case_number}</h5>
                    <div>
                      <p className="text-capitalize"><strong>Lawyer: </strong>{c.lawyer.name}</p>
                      <img style={{ height: "50px", width: "50px", cursor: "pointer", marginStart: "400px" }} onClick={() => (handleOnClick(c.lawyer.email, c.lawyer.photo))} src="/chat.png" />
                    </div>
                  </div>
                ))}
            </div>
          </div>}

        </div>
        {
          messenger &&
          <div className="d-flex flex-column" style={{ height: "450px", width: "500px", border: "2px solid black", margin: "80px 120px 0px 0px", backgroundColor: "whitesmoke" }}>
            <img className="rounded-circle d-block" style={{ height: "80px", width: "80px", margin: "14px 6px 0px auto" }} src={`${process.env.BACKEND_URL}/assets/${lawyerPhoto}`} />
            <div id="messages"></div>
            <input onChange={handleChange} onKeyDown={handleKeyDown} value={messengerText} style={{ width: "497px" }} className="mt-auto" type="text" />
          </div>
        }
      </div>

    </div>
  );
};

export default CurrentClient;
