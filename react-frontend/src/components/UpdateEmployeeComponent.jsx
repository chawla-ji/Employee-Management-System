import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useHistory, useParams } from 'react-router-dom';

const UpdateEmployeeComponent = () => {
    const { id } = useParams();
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            const res = await EmployeeService.getEmployeeById(id);
            const { firstName, lastName, emailId } = res.data;
            setFirstName(firstName);
            setLastName(lastName);
            setEmailId(emailId);
        };
        fetchEmployee();
    }, [id]);

    const updateEmployee = async (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, emailId };
        await EmployeeService.updateEmployee(employee, id);
        history.push('/employees');
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email ID:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={updateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={() => history.push('/employees')} style={{ marginLeft: '10px' }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeComponent;
