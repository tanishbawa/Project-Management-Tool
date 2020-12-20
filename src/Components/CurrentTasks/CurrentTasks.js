import React, { useEffect, useState } from 'react'
import { Table, Button } from 'reactstrap';
import {
    Link
} from 'react-router-dom';
import axios from '../../axios-data';

const CurrentTasks = () => {

    const [data, setData] = useState([]);

    const sendToCompleted = (item) => {

        axios.post("/Completed Tasks.json", item)
            .then(response => { console.log(response) })
            .catch(error => { console.log(error) });

        const url = "/data";
        axios.delete(`${url}/${item.id}.json`)
            .then(response => {
                console.log(response);
                window.location.reload(false);
            });
    }

    useEffect(() => {
        fetch('https://project-management-tool-ae99c-default-rtdb.firebaseio.com/data.json')
            .then(response => response.json())
            .then(responseData => {
                const loadedData = [];
                for (const key in responseData) {
                    loadedData.push({
                        id: key,
                        MemberName: responseData[key].MemberName,
                        Deadline: responseData[key].Deadline,
                        Project: responseData[key].Project,
                        TaskDetail: responseData[key].TaskDetail
                    });
                }
                setData(loadedData);
            });
    }, [setData]);

    return (
        <div className="App">
            <h1 style={{ color: "grey" }}>Current Tasks</h1>
            <Table borderless>
                <thead>
                    <tr>
                        <th>Member Name</th>
                        <th>Project</th>
                        <th>Task Detail</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            (data.map(item => {
                                return (<tr key={item.id}>
                                    <td>{item.MemberName}</td>
                                    <td>{item.Project}</td>
                                    <td>{item.TaskDetail}</td>
                                    <td>{item.Deadline}</td>
                                    <td><Button onClick={() => sendToCompleted(item)} color="secondary">Edit</Button></td>
                                </tr>)
                            })) : null
                    }
                </tbody>
            </Table>

            <Link to="/">
                <Button style={{ marginTop: "20%", width: "150px" }} color="secondary" size="lg">Back</Button>
            </Link>
        </div>
    )
}

export default CurrentTasks;
