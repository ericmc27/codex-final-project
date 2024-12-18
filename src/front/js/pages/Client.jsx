import React from 'react';

const appointments = [
    {
        lawyer: 'Sarah Wilson',
        date: '2024-03-20',
        time: '10:30 AM',
        status: 'Scheduled'
    },
    {
        lawyer: 'Michael Brown',
        date: '2024-03-22',
        time: '2:00 PM',
        status: 'Pending'
    },
    {
        lawyer: 'Jessica Lee',
        date: '2024-03-25',
        time: '3:30 PM',
        status: 'Confirmed'
    }
];

const Client = () => {
    return (
        <div className="container mt-4">
            {/* Welcome Section */}
            <div className="row mb-4">
                <div className="col">
                    <h2>Welcome, Client</h2>
                    <p className="text-muted">Manage your appointments and legal cases</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Appointments</h5>
                            <h3>{appointments.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Active Cases</h5>
                            <h3>2</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5>Documents</h5>
                            <h3>3</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="row mb-4">
                <div className="col">
                    <button className="btn btn-primary me-2">New Appointment</button>
                    <button className="btn btn-outline-primary">Upload Document</button>
                </div>
            </div>

            {/* Appointments Table */}
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">My Appointments</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Lawyer</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td>{appointment.lawyer}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>
                                            <span className={`badge ${appointment.status === 'Scheduled' ? 'bg-success' :
                                                    appointment.status === 'Pending' ? 'bg-warning' :
                                                        'bg-primary'
                                                }`}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary me-2">Join</button>
                                            <button className="btn btn-sm btn-danger">Cancel</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client; 