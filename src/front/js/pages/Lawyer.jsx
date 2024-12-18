import React from 'react';

const clients = [
  {
    name: 'Eric Smith',
    status: 'Pending',
    time: '10:30 AM',
    type: 'Initial Consultation'
  },
  {
    name: 'Diego Rodriguez',
    status: 'Confirmed',
    time: '2:00 PM',
    type: 'Follow-up'
  },
  {
    name: 'Juan Martinez',
    status: 'In Progress',
    time: '3:30 PM',
    type: 'Document Review'
  }
];

const Lawyer = () => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning';
      case 'Confirmed':
        return 'bg-success';
      case 'In Progress':
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
          <h2 className="mb-3">Dashboard</h2>
          <div className="d-flex gap-3">
            <div className="card flex-grow-1">
              <div className="card-body text-center">
                <h5 className="card-title">Today's Appointments</h5>
                <h3 className="mb-0">{clients.length}</h3>
              </div>
            </div>
            <div className="card flex-grow-1">
              <div className="card-body text-center">
                <h5 className="card-title">Pending Reviews</h5>
                <h3 className="mb-0">5</h3>
              </div>
            </div>
            <div className="card flex-grow-1">
              <div className="card-body text-center">
                <h5 className="card-title">Active Cases</h5>
                <h3 className="mb-0">12</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-light">
              <h4 className="mb-0">Upcoming Appointments</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Time</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.name}</td>
                        <td>{client.time}</td>
                        <td>{client.type}</td>
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
  )
}

export default Lawyer