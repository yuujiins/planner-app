import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Modal, Nav, Navbar} from "react-bootstrap";
import "../assets/styles.css";
import {Col, Row} from "react-bootstrap";
import {Calendar} from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import TaskModal from "../components/task_modal";
import ToastC from "../components/toastc";
import CategoriesModal from "../components/categories_modal";

const Home = (props) => {
    const navigate = useNavigate()
    const [toastTitle, setToastTitle] = useState()
    const [toastMessage, setToastMessage] = useState()
    const [toastShow, setToastShow] = useState(false)
    const [date, setDate] = useState(new Date())
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [addTaskModalShow, setAddTaskModalShow] = useState(false)
    const [manageCategoryModalShow, setManageCategoryModalShow] = useState(false)

    useEffect(() => {
        if(window.sessionStorage.key('token') == null){
            navigate('/login', {
                replace: false
            })
        }
    }, [])

    const handleAddTask = () => {
        if(categories.length == 0){
            showMessage("Warning", "There are no categories set. Please add categories first!")
        }
        else{
            setAddTaskModalShow(true)
        }
    }

    const handleManageCategory = () => {
        setManageCategoryModalShow(true)
    }

    const handleTaskModalClose = () => {
        setAddTaskModalShow(false)
    }

    const handleCategoryModalClose = () => {
        setManageCategoryModalShow(false)
    }

    const toastHide = () => {
        setToastShow(false)
    }

    const showMessage = (type, message) => {
        setToastMessage(message)
        setToastTitle(type)
        setToastShow(true)
    }

    return (
        <>
            <ToastC toastShow={toastShow} toastHide={toastHide} toastMessage={toastMessage} toastTitle={toastTitle}/>
            <TaskModal onHide={handleTaskModalClose} show={addTaskModalShow} categories={categories}/>
            <CategoriesModal onHide={handleCategoryModalClose} show={manageCategoryModalShow} categories={categories}/>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        Plannist
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="homeBackground">
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    <h4 className="text-center">Calendar</h4>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Calendar onChange={setDate} value={date} calendarType="US"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Header>
                                <h4 className="float-start">Your tasks for {date.toLocaleDateString() == new Date().toLocaleDateString() ? "today" : date.toLocaleDateString()}</h4>
                                <div className="float-end">
                                    <Button variant="outline-primary" className="btn btn-sm" onClick={handleAddTask}>Add</Button>
                                </div>
                            </Card.Header>
                            <Card.Body className="tasksCard">
                                {tasks.length == 0 &&
                                    <p className="text-center"><i>No tasks for this selected date</i></p>
                                }

                            </Card.Body>
                            <Card.Footer>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="form-group">
                                                <label className="control-label">Sort by</label>
                                                <select className="form-control">
                                                    <option value="default">Default</option>
                                                    <option value="priority-asc">Priority (Ascending)</option>
                                                    <option value="priority-desc">Priority (Descending)</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col style={{border: "1px solid black", borderRadius: "5px"}}>
                                            <Row style={{padding: "5px"}}>
                                                <Col>
                                                    <div className="form-group">
                                                        <label className="control-label">Category</label>
                                                        <select className="form-control">
                                                            <option value="all">All</option>
                                                            {categories.map(c => <option value={c.id}>{c.name}</option>)}
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col md={3} className="d-flex flex-colum align-items-center justify-content-center">
                                                    <Button variant="outline-info" className="btn-sm" onClick={handleManageCategory}>Manage</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;