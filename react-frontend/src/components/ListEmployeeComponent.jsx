import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useHistory } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await EmployeeService.getEmployees();
            setEmployees(res.data);
        };
        fetchEmployees();
    }, []);

    const addEmployee = () => {
        history.push('/add-employee/_add');
    };

    const editEmployee = (id) => {
        history.push(`/add-employee/${id}`);
    };

    const deleteEmployee = async (id) => {
        await EmployeeService.deleteEmployee(id);
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    const viewEmployee = (id) => {
        history.push(`/view-employee/${id}`);
    };

    return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addEmployee}> Add Employee</button>
            </div>
            <br />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <button onClick={() => editEmployee(employee.id)} className="btn btn-info">Update</button>
                                    <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete</button>
                                    <button onClick={() => viewEmployee(employee.id)} className="btn btn-info" style={{ marginLeft: '10px' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
