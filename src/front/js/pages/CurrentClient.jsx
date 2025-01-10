import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CurrentClient = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [clientCases, setClientCases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const CASE_STATUS = {
        OPEN: "OPEN",
        CLOSED: "CLOSED",
    };

    useEffect(() => {
        const fetchClientCases = async () => {
            setIsLoading(true);
            setErrorMessage("");

            try {
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

                const data = await response.json();
                console.log("Cases:", data);
                setClientCases(data.cases); 
            } catch (error) {
                console.error("Error fetching client cases:", error);
                setErrorMessage("Unable to fetch cases. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientCases();
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center">
            {errorMessage && <p className="error">{errorMessage}</p>}
            {isLoading ? (
                <p>Loading cases...</p>
            ) : (
                <>
                    <h1>My Open Cases</h1>
                    <div className="openCases border d-flex flex-column rounded" width={"300px"} height={"250px"} style={{margin:"25px 0px 50px 0px"}}>
                        <div className="d-flex flex-column gap-4">
                            {clientCases
                                .filter((c) => c.status === CASE_STATUS.OPEN)
                                .map((c) => (
                                    <div key={c.id}>
                                        <h3>Case Number: {c.case_number}</h3>
                                        <div>
                                            <p><strong>Lawyer Name: </strong>{ c.lawyer_name }</p>
                                            <p><strong>Lawyer Email: </strong> { c.lawyer_email }</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <h1>My Closed Cases</h1>
                    <div className="closedCases border d-flex flex-column rounded" width={"300px"} height={"250px"} style={{margin:"25px 0px 50px 0px"}}>
                        <div className="d-flex flex-column gap-4">
                            {clientCases
                                .filter((c) => c.status === CASE_STATUS.CLOSED)
                                .map((c) => (
                                    <div key={c.id}>
                                        <h3>Case Number: {c.case_number}</h3>
                                        <div>
                                            <p><strong>Lawyer Name: </strong>{ c.lawyer_name }</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CurrentClient;
