import React, {useState} from "react"
import landing from "../assets/landing-bg.jpg";
import {Button, ButtonGroup, Card, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {showMessage} from "../services";

const Register = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [retypePassword, setRetypePassword] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()
    const [middleName, setMiddleName] = useState()

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

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password == retypePassword){
            alert ("Login will proceed")
        }
        else{
            alert("Passwords do not match")
        }
    }

    return (
        <>
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
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lastName} onChange={handleLastName} placeholder="Enter last name" required={true}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={firstName} onChange={handleFirstName} placeholder="Enter first name" required={true}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" value={middleName} onChange={handleMiddleName} placeholder="Enter middle name" required={false}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" autoComplete="off" value={email} required={true} placeholder="Enter your registered email" onChange={handleEmailInput}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" autoComplete="off" value={password} required={true} placeholder="Enter your password" onChange={handlePasswordInput}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Retype Password</Form.Label>
                                    <Form.Control type="password" value={retypePassword} onChange={handleRetypeInput} placeholder="Retype your password" required={true}/>
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