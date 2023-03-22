import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    Container,
    Navbar, NavDropdown,
    Table
} from "react-bootstrap";
import "../assets/styles.css";
import {Col, Row} from "react-bootstrap";
import {Calendar} from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TaskModal from "../components/task_modal";
import ToastC from "../components/toastc";
import CategoriesModal from "../components/categories_modal";
import {delete_category, get_categories} from "../services/category_service";
import {showAlert} from "../services/general";
import {delete_task, get_tasks, update_task} from "../services/task_service";
import ProfileModal from "../components/profile_modal";
import PasswordModal from "../components/password_modal";

const Home = () => {
    const navigate = useNavigate()
    const [sortPriority, setPriority] = useState()
    const [toastTitle, setToastTitle] = useState()
    const [toastMessage, setToastMessage] = useState()
    const [toastShow, setToastShow] = useState(false)
    const [date, setDate] = useState(new Date())
    const [tasks, setTasks] = useState([])
    const [taskDelete, setTaskDelete] = useState()
    const [task, setTask] = useState()
    const [editTask, setEditTask] = useState(false)
    const [categories, setCategories] = useState([])
    const [addTaskModalShow, setAddTaskModalShow] = useState(false)
    const [manageCategoryModalShow, setManageCategoryModalShow] = useState(false)
    const [addCategoryModalShow, setAddCategoryModalShow] = useState(false)
    const [category, setCategory] = useState(0)
    const [flagger, setFlagger] = useState(Math.random())
    const [profileModalShow, setProfileModalShow] = useState(false)
    const [passwordModalShow, setPasswordModalShow] = useState(false)

    useEffect(() => {
        if(window.sessionStorage.getItem('token') == null){
            navigate('/login', {
                replace: false
            })
        }
        else{
            getAllCategories()
        }
    }, [date, category, sortPriority, flagger])

    const getAllCategories = () => {
        get_categories()
            .then((result) => result.json())
            .then((data) => {
                setCategories(data)
                setCategory(category)
                getTasksFiltered()
            })
    }

    const getTasksFiltered = () => {
        const filter = {
            task_date: date.toLocaleDateString('en-CA'),
            category_id: category == 0? null:category,
            sort: sortPriority
        }
        get_tasks(filter)
            .then((result) => result.json())
            .then((data) => {

                setTasks(data)
            })
    }

    const handleAddTask = () => {
        if(categories.length == 0){
            showMessage("Warning", "There are no categories set. Please add categories first!")
        }
        else{
            setAddTaskModalShow(true)
        }
    }

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
        getTasksFiltered()
    }

    const handleManageCategory = () => {
        setManageCategoryModalShow(true)
    }

    const handleTaskModalClose = () => {
        setAddTaskModalShow(false)
        setTask(undefined)
        setEditTask(false)
        setFlagger(Math.random())
    }

    const handleCategoryModalClose = () => {
        setManageCategoryModalShow(false)
        setAddCategoryModalShow(false)

        setFlagger(Math.random())
    }

    const handleAddCategoryModal = () => {
        setManageCategoryModalShow(true)
        setAddCategoryModalShow(true)
    }

    const toastHide = () => {
        setToastShow(false)
    }

    const showMessage = (type, message) => {
        setToastMessage(message)
        setToastTitle(type)
        setToastShow(true)
    }

    const handleDeleteCategory = () => {
        showAlert('Delete Category', 'Are you sure you want to delete this category?', yesDeleteCallback, () => {})
    }

    const handleDeleteTask = (e) => {
        setTaskDelete(parseInt(e.currentTarget.dataset.id))
    }
    useEffect(() => {
        if(taskDelete){
            showAlert('Delete task', 'Are you sure you want to delete this task?', deleteTaskCallback, () => {})
        }
    }, taskDelete)

    const yesDeleteCallback = async () => {
        let result = await delete_category(category)

        if (result.errors){
            showMessage("Error", result.errors)
        }
        else{
            setFlagger(Math.random())
            showMessage("Success", "Category has been deleted")
        }
    }

    const deleteTaskCallback = async () => {
        console.log(taskDelete)
        let result = await delete_task(taskDelete)

        if(result.errors){
            showMessage("Error", result.errors)
        }
        else{
            setFlagger(Math.random())
            showMessage("Success", "Task has been deleted")
            setTaskDelete(undefined)
        }
    }

    const setCalendarDate = (e) => {
        setDate(e)
    }

    const setChecked = async (e) => {
        const data = {
            status: e.target.checked ? 1:0
        }
        const result = await update_task(e.target.dataset.id, data)

        if(result.ok){
            setFlagger(Math.random())
        }
    }

    const taskEditClick = (e) => {
        setTask(parseInt(e.currentTarget.dataset.id))
        setEditTask(true)
    }
    useEffect(() => {
        if(task && editTask){
            setAddTaskModalShow(true)
        }
    }, [task, editTask])

    const handleSortChange = (e) => {
        setPriority(e.target.value)
    }

    const handleLogout = () => {
        window.sessionStorage.clear()
        window.location.reload()
    }

    const handleProfileModalClose = () => {
        setProfileModalShow(false)
    }

    const handleProfileEditClick = () => {
        setProfileModalShow(true)
    }

    const handlePasswordModalClose = () => {
        setPasswordModalShow(false)
    }

    const handlePasswordModalClick = () => {
        setPasswordModalShow(true)
    }


    return (
        <>
            <ToastC toastShow={toastShow} toastHide={toastHide} toastMessage={toastMessage} toastTitle={toastTitle}/>
            <PasswordModal onHide={handlePasswordModalClose} show={passwordModalShow}  toast={showMessage}/>
            <ProfileModal onHide={handleProfileModalClose} show={profileModalShow}  toast={showMessage}/>
            <TaskModal onHide={handleTaskModalClose} show={addTaskModalShow} categories={categories} task={task} isEdit={editTask} toast={showMessage}/>
            <CategoriesModal onHide={handleCategoryModalClose} show={manageCategoryModalShow} isNew={addCategoryModalShow} category={category} toast={showMessage}/>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        Plannist
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title="Settings">
                            <NavDropdown.Item onClick={handleProfileEditClick}>
                                Update Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handlePasswordModalClick}>
                                Update password
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="homeBackground">
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Header>
                                <h4>Calendar</h4>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                <Calendar onChange={setCalendarDate} value={date} calendarType="US"/>
                            </Card.Body>
                            <Card.Footer>
                                <small>Signed in as: </small>
                                <h4 className="text-center">
                                    {`${window.sessionStorage.getItem('first_name')} ${window.sessionStorage.getItem('last_name')}`} <br/>
                                    <small style={{fontSize: "11pt"}} className="text-center">{window.sessionStorage.getItem('email')}</small>
                                </h4>

                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Header>
                                <h4 className="float-start">Your tasks for {date.toLocaleDateString() == new Date().toLocaleDateString() ? "today" : date.toLocaleDateString()}</h4>
                                <div className="float-end">
                                    <Button variant="outline-primary" className="btn btn-sm" onClick={handleAddTask}><i className="fa-solid fa-plus"></i> </Button>
                                </div>
                            </Card.Header>
                            <Card.Body className="tasksCard">
                                {tasks.length == 0 &&
                                    <p className="text-center"><i>No tasks for this selected date</i></p>
                                }
                                {tasks.length > 0 &&
                                    <Table className="table-striped">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Task</th>
                                                <th>Priority</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map(t => <tr>
                                                <td width="5%">
                                                    <input data-id={t.id} checked={t.status == 1} className="form-check-input" type="checkbox" onChange={setChecked}/>
                                                </td>
                                                <td width="40%" style={t.status ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
                                                    {t.name}
                                                </td>
                                                <td>
                                                    <Badge bg={t.priority == 0 ? 'success' : t.priority == 1 ? 'warning' : 'danger'}>
                                                        {t.priority == 0 ? 'Low' : t.priority == 1 ? 'Medium' : 'High'}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Button type="button" data-id={t.id} variant="outline-success" className="btn-sm" onClick={taskEditClick}><i className="fa-solid fa-pencil"></i></Button>
                                                    <Button type="button" data-id={t.id} variant="outline-danger" className="btn-sm" onClick={handleDeleteTask}><i className="fa-solid fa-trash"></i></Button>
                                                </td>
                                            </tr>)}
                                        </tbody>
                                    </Table>
                                }

                            </Card.Body>
                            <Card.Footer>
                                <Container>
                                    <Row>
                                        <Col md={4}>
                                            <div className="form-group">
                                                <label className="control-label">Sort by</label>
                                                <select className="form-control" onChange={handleSortChange} value={sortPriority}>
                                                    <option value="">Default</option>
                                                    <option value="desc">Highest priority</option>
                                                    <option value="asc">Lowest priority</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col style={{border: "1px solid black", borderRadius: "5px"}}>
                                            <Row style={{padding: "5px"}}>
                                                <Col>
                                                    <div className="form-group">
                                                        <label className="control-label">Category</label>
                                                        <select className="form-control" onChange={handleChangeCategory} value={category}>
                                                            <option value="0">All</option>
                                                            {categories.map(c => <option value={c.id}>{c.name}</option>)}
                                                        </select>
                                                    </div>
                                                </Col>
                                                <Col md={4} className="d-flex flex-colum align-items-center justify-content-center">
                                                    <ButtonGroup>
                                                        <Button variant="outline-success" className="btn-sm" onClick={handleAddCategoryModal}><span className="fa fa-plus"></span></Button>
                                                        <Button variant="outline-info" className="btn-sm" onClick={handleManageCategory} disabled={category == 0}><i className="fa-solid fa-pencil"></i></Button>
                                                        <Button variant="outline-danger" className="btn-sm" disabled={category == 0} onClick={handleDeleteCategory}><i className="fa fa-trash"></i></Button>
                                                    </ButtonGroup>
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