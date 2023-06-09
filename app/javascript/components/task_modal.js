import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {add_task, get_task, update_task} from "../services/task_service";
import LoadingModal from "./loading_modal";

const TaskModal = (props) => {
    const [taskName, setTaskName] = useState()
    const [taskStatus, setTaskStatus] = useState(0)
    const [category, setCategory] = useState()
    const [taskPriority, setTaskPriority] = useState(0)
    const [taskDate, setTaskDate] = useState(new Date().toLocaleDateString('en-CA'))
    const [showLoading, setShowLoading] = useState(false)
    const [viewMode, setViewMode] = useState(false)

    const handleNameInput = (e) => {
        setTaskName(e.target.value)
    }

    const getDetails = async() => {
        let task = await get_task(props.task)
        task = await task.json()

        setTaskName(task.name)
        setCategory(task.category_id)
        setTaskPriority(task.priority)
        setTaskStatus(task.status)
        setTaskDate(task.task_date)
    }
    const onModalShow = async () => {

        setViewMode(props.isViewMode)

        if(props.isEdit){
            await getDetails()
        }
        else{
            setTaskName('')
            setCategory(props.currentCategory)
            setTaskPriority(0)
            setTaskStatus(0)
            setTaskDate(props.currentDate.toLocaleDateString("en-CA"))
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

    const handleChangeViewMode = async () => {
        if(!viewMode){
            await getDetails()
        }
        setViewMode(!viewMode)
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        setShowLoading(true)
        let data = {
            name: taskName,
            category_id: category,
            status: taskStatus,
            priority: taskPriority,
            task_date: taskDate
        }
        if(props.isEdit){
            let result = await update_task(props.task, data)
            if(result.ok){
                props.toast("Success", "Task successfully updated")
            }
            else{
                const body = await result.json()
                props.toast("Error", body.errors)
            }
        }
        else{
            //add new task
            let result = await add_task(data)

            if(!result.ok){
                const body = result.json()
                props.toast("Error", body.errors)
            }
            else{
                props.toast("Success", "Task added successfully!")
            }
        }
        setShowLoading(false)
        props.onHide()
    }

    return (
        <>
            <LoadingModal show={showLoading}/>
            <Modal style={{visibility:  showLoading ? 'hidden':'visible' }} show={props.show} onShow={onModalShow} onHide={props.onHide} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.isEdit ? (viewMode ? 'View' : 'Edit') : 'Add'} task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formSubmit}>
                        <Form.Group>
                            <Form.Label>Task Name<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" disabled={viewMode} value={taskName} onChange={handleNameInput} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category<span className="text-danger">*</span> </Form.Label>
                            <select className="form-control" value={category} onChange={handleCategoryInput} disabled={viewMode} required>
                                <option value=''>--Please select--</option>
                                {props.categories.map(c => <option value={c.id}>{c.name}</option>) }
                            </select>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
                                    <select className="form-control" value={taskPriority} onChange={handlePriorityInput} disabled={viewMode} required>
                                        <option value="0">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="date" value={taskDate} onChange={handleDateChange} disabled={viewMode} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr/>
                        <Form.Group>
                            <ButtonGroup className="float-start">
                                <Button type="submit" variant="primary" disabled={viewMode}>Save</Button>
                                <Button type="reset" variant="warning" onClick={props.onHide}>Cancel</Button>
                            </ButtonGroup>
                            <ButtonGroup className="float-end" hidden={!props.isEdit}>
                                <Button type="button" className="btn-sm" variant={viewMode ? 'outline-success' : 'outline-warning'} onClick={handleChangeViewMode}>
                                    {viewMode ? <i className="fa fa-pencil"></i> : <i className="fa fa-rotate-left"></i>}
                                </Button>
                            </ButtonGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TaskModal;