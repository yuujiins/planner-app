import React, {useState} from "react";
import {Button, ButtonGroup, Card, Container, Form, Image} from "react-bootstrap";
import landing from "../assets/landing-bg.jpg";
import journal from "../assets/journal.png";
import {Link, useNavigate} from "react-router-dom";
import ToastC from "../components/toastc";
import {login_user} from "../services/user_service";
const Login = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [toastTitle, setToastTitle] = useState()
    const [toastMessage, setToastMessage] = useState()
    const [toastShow, setToastShow] = useState(false)

    const handleEmailInput = (event) =>{
        setEmail(event.target.value)
    }

    const handlePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const clearStates = () => {
        setEmail('')
        setPassword('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            email: email,
            password: password
        }

        let result = await login_user(data);
        result = await result.json()
        try{

            if(result.error){
                showMessage("Error", result.error)
            }
            else{
                window.sessionStorage.setItem("token", result.token)
                showMessage("Success", "You are now logged in")
                setTimeout(() => {
                    navigate('/home', {
                        replace: false
                    })
                }, 500)
            }

        }catch (e) {
            showMessage("Error", "Internal server error occurred. Please contact administrator")
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
        <Container fluid={true} style={{backgroundImage: `url(${landing})`,
            backgroundSize: "cover",
            width: "100vw", height: "100vh"
        }} className="landing-bg">
            <ToastC toastShow={toastShow} toastHide={toastHide} toastMessage={toastMessage} toastTitle={toastTitle}/>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100%", zIndex: "-1"}}>
                <Card style={{width: "50%"}}>
                    <Card.Header>
                        <h4>Login to continue</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form onReset={clearStates} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" autoComplete="new" value={email} required={true} placeholder="Enter your registered email" onChange={handleEmailInput}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" autoComplete="new-password" value={password} required={true} placeholder="Enter your password" onChange={handlePasswordInput}/>
                            </Form.Group>
                            <hr/>
                            <Form.Group>
                                <ButtonGroup>
                                    <Button type="submit" variant={"primary"}>Login</Button>
                                    <Button type="reset" variant={"warning"}>Reset</Button>
                                </ButtonGroup>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <p>No account yet? <Link to="/register">Register Here</Link></p>
                    </Card.Footer>
                </Card>
            </div>

        </Container>
    );
}

export default Login;