import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {add_task, get_task, update_task} from "../services/task_service";

const TaskModal = (props) => {
    const [taskName, setTaskName] = useState()
    const [taskStatus, setTaskStatus] = useState(0)
    const [category, setCategory] = useState()
    const [taskPriority, setTaskPriority] = useState(0)
    const [taskDate, setTaskDate] = useState(new Date().toLocaleDateString('en-CA'))

    const handleNameInput = (e) => {
        setTaskName(e.target.value)
    }

    const onModalShow = async () => {
        if(props.isEdit){
            let task = await get_task(props.task)
            task = await task.json()

            setTaskName(task.name)
            setCategory(task.category_id)
            setTaskPriority(task.priority)
            setTaskStatus(task.status)
            setTaskDate(task.task_date)
        }
        else{
            setTaskName('')
            setCategory('')
            setTaskPriority(0)
            setTaskStatus(0)
            setTaskDate(new Date().toLocaleDateString('en-CA'))
        }
    }

    const handlePriorityInput = (e) => {
        setTaskPriority(e.target.value)
    }

    const handleDateChange = (e) => {
        setTaskDate(e.target.value)
    }

    const handleCategoryInput = (e) => {
        setCategory(e.target.value)
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        let data = {
            name: taskName,
            category_id: category,
            status: taskStatus,
            priority: taskPriority,
            task_date: taskDate
        }
        if(props.isEdit){
            let result = await update_task(props.task, data)
            console.log(result)
            if(result.ok){
                props.toast("Success", "Task successfully updated")
                props.onHide()
            }
            else{
                props.toast("Error", "Failed to update task. Field validation error occurred")
            }
        }
        else{
            //add new task
            let result = await add_task(data)

            if(result.errors){
                props.toast("Error", result.errors)
            }
            else{
                props.toast("Success", "Task added successfully!")
                props.onHide()
            }
        }
    }

    return (
        <>
            <Modal show={props.show} onShow={onModalShow} onHide={props.onHide} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.isEdit ? 'Edit' : 'Add'} tasks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formSubmit}>
                        <Form.Group>
                            <Form.Label>Task Name<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={taskName} onChange={handleNameInput} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category<span className="text-danger">*</span> </Form.Label>
                            <select className="form-control" value={category} onChange={handleCategoryInput} required>
                                <option value=''>--Please select--</option>
                                {props.categories.map(c => <option value={c.id}>{c.name}</option>) }
                            </select>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
                                    <select className="form-control" value={taskPriority} onChange={handlePriorityInput} required>
                                        <option value="0">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="date" value={taskDate} onChange={handleDateChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr/>
                        <Form.Group>
                            <ButtonGroup>
                                <Button type="submit" variant="primary">Save</Button>
                                <Button type="reset" variant="warning" onClick={props.onHide}>Cancel</Button>
                            </ButtonGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TaskModal;