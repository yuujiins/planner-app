import React, {useState} from "react";
import {Button, ButtonGroup, Card, Container, Form, Image} from "react-bootstrap";
import landing from "../assets/landing-bg.jpg";
import journal from "../assets/journal.png";
import {Link} from "react-router-dom";
const Login = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

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

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(email, password)
    }

    return (
        <Container fluid={true} style={{backgroundImage: `url(${landing})`,
            backgroundSize: "cover",
            width: "100vw", height: "100vh"
        }} className="landing-bg">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100%", zIndex: "-1"}}>
                <Card style={{width: "50%"}}>
                    <Card.Header>
                        <Card.Title>
                            <h3>Login to continue</h3>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onReset={clearStates} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" autoComplete="off" value={email} required={true} placeholder="Enter your registered email" onChange={handleEmailInput}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" autoComplete="off" value={password} required={true} placeholder="Enter your password" onChange={handlePasswordInput}/>
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