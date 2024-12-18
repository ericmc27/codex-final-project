import React from 'react';

const appointments = [
    {
        lawyer: 'Sarah Wilson',
        specialization: 'Family Law',
        date: '2024-03-20',
        time: '10:30 AM',
        status: 'Scheduled',
        type: 'Initial Consultation'
    },
    {
        lawyer: 'Michael Brown',
        specialization: 'Corporate Law',
        date: '2024-03-22',
        time: '2:00 PM',
        status: 'Pending',
        type: 'Document Review'
    },
    {
        lawyer: 'Jessica Lee',
        specialization: 'Real Estate Law',
        date: '2024-03-25',
        time: '3:30 PM',
        status: 'Confirmed',
        type: 'Follow-up'
    }
];

const Client = () => {
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Scheduled':
                return 'bg-success';
            case 'Pending':
                return 'bg-warning';
            case 'Confirmed':
                return 'bg-primary';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="container py-4">
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col">
                    <h2 className="mb-3">My Legal Dashboard</h2>
                    <div className="d-flex gap-3">
                        <div className="card flex-grow-1">
                            <div className="card-body text-center">
                                <h5 className="card-title">Upcoming Appointments</h5>
                                <h3 className="mb-0">{appointments.length}</h3>
                            </div>
                        </div>
                        <div className="card flex-grow-1">
                            <div className="card-body text-center">
                                <h5 className="card-title">Active Cases</h5>
                                <h3 className="mb-0">2</h3>
                            </div>
                        </div>
                        <div className="card flex-grow-1">
                            <div className="card-body text-center">
                                <h5 className="card-title">Documents Pending</h5>
                                <h3 className="mb-0">3</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="row mb-4">
                <div className="col">
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary">
                            <i className="fas fa-plus me-2"></i>
                            Schedule New Appointment
                        </button>
                        <button className="btn btn-outline-primary">
                            <i className="fas fa-file-upload me-2"></i>
                            Upload Document
                        </button>
                        <button className="btn btn-outline-primary">
                            <i className="fas fa-message me-2"></i>
                            Message Lawyer
                        </button>
                    </div>
                </div>
            </div>

            {/* Appointments Section */}
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">My Appointments</h4>
                            <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    Filter
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">All</a></li>
                                    <li><a className="dropdown-item" href="#">Upcoming</a></li>
                                    <li><a className="dropdown-item" href="#">Past</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Lawyer</th>
                                            <th>Specialization</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((appointment, index) => (
                                            <tr key={index}>
                                                <td>{appointment.lawyer}</td>
                                                <td>{appointment.specialization}</td>
                                                <td>{appointment.date}</td>
                                                <td>{appointment.time}</td>
                                                <td>{appointment.type}</td>
                                                <td>
                                                    <span className={`badge ${getStatusBadgeClass(appointment.status)} rounded-pill`}>
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary me-2">
                                                        <i className="fas fa-eye me-2"></i>
                                                        View
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-secondary">
                                                        <i className="fas fa-trash me-2"></i>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Client; 