import React, {useState} from "react"
import landing from '../assets/bg-min.jpg'
import {Button, ButtonGroup, Card, Container, Form, Toast, ToastContainer} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {register_user} from "../services/user_service";
import ToastC from "../components/toastc";
import LoadingModal from "../components/loading_modal";

const Register = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [retypePassword, setRetypePassword] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()
    const [middleName, setMiddleName] = useState()
    const [toastTitle, setToastTitle] = useState()
    const [toastMessage, setToastMessage] = useState()
    const [toastShow, setToastShow] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const clearStates = () => {
        setEmail('')
        setPassword('')
        setLastName('')
        setFirstName('')
        setMiddleName('')
        setRetypePassword('')
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleMiddleName = (e) => {
        setMiddleName(e.target.value)
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleRetypeInput = (e) => {
        setRetypePassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowLoading(true)
        if(password == retypePassword){
            const data = {
                last_name: lastName,
                first_name: firstName,
                middle_name: middleName,
                password: password,
                email: email
            }

            try{
                let result = await register_user(data)
                result = await result.json()

                if(result.errors || result.error){
                    showMessage("Error", result.errors)
                }
                else{
                    showMessage("Success", "You are now registered")
                    setTimeout(() => {
                        setShowLoading(false)
                        navigate('/login', {
                            replace: false
                        })
                    }, 800)
                }

            }
            catch (e) {
                setShowLoading(false)
                showMessage("Error", "Internal server error occurred. Please contact administrator")
            }
        }
        else{
            setShowLoading(false)
            showMessage("Error", "Passwords do not match!")
        }
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
            <LoadingModal show={showLoading}/>
            <Container fluid={true} style={{backgroundImage: `url(${landing})`,
                backgroundSize: "cover",
                width: "100vw", height: "100vh"
            }} className="landing-bg">
                <ToastC toastShow={toastShow} toastHide={toastHide} toastMessage={toastMessage} toastTitle={toastTitle}/>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100%", zIndex: "-1"}}>
                    <Card style={{width: "50%"}}>
                        <Card.Header>
                            <Card.Title>
                                <h3>Register your account</h3>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onReset={clearStates} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control autoComplete="new-off" type="text" value={lastName} onChange={handleLastName} placeholder="Enter last name" required={true}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control autoComplete="new-off" type="text" value={firstName} onChange={handleFirstName} placeholder="Enter first name" required={true}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control autoComplete="new-off" type="text" value={middleName} onChange={handleMiddleName} placeholder="Enter middle name" required={false}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" autoComplete="new-off" value={email} required={true} placeholder="Enter your registered email" onChange={handleEmailInput}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" autoComplete="new-password" value={password} required={true} placeholder="Enter your password" onChange={handlePasswordInput}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Retype Password</Form.Label>
                                    <Form.Control autoComplete="new-password" type="password" value={retypePassword} onChange={handleRetypeInput} placeholder="Retype your password" required={true}/>
                                </Form.Group>
                                <hr/>
                                <Form.Group>
                                    <ButtonGroup>
                                        <Button type="submit" variant={"primary"}>Register</Button>
                                        <Button type="reset" variant={"warning"}>Reset</Button>
                                    </ButtonGroup>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p>Already registered? <Link to="/login">Login Here</Link></p>
                        </Card.Footer>
                    </Card>
                </div>

            </Container>
        </>
    );
}

export default Register