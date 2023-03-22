import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {update_user} from "../services/user_service";

const ProfileModal = (props) => {
    const [lastName, setLastName] = useState(window.sessionStorage.getItem('last_name'))
    const [firstName, setFirstName] = useState(window.sessionStorage.getItem('first_name'))
    const [middleName, setMiddleName] = useState(window.sessionStorage.getItem('middle_name'))
    const [email, setEmail] = useState(window.sessionStorage.getItem('email'))

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handleFirstNameInput = (e) => {
        setFirstName(e.target.value)
    }

    const handleMiddleNameInput = (e) => {
        setMiddleName(e.target.value)
    }

    const handleLastNameInput = (e) => {
        setLastName(e.target.value)
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        const data = {
            last_name: lastName,
            first_name: firstName,
            middle_name: middleName,
            email: email
        }

        let result = await update_user(data)

        if(result.errors){
            props.toast("Error!", result.errors)
        }
        else{
            window.sessionStorage.setItem('last_name', lastName)
            window.sessionStorage.setItem('first_name', firstName)
            window.sessionStorage.setItem('middle_name', middleName)
            window.sessionStorage.setItem('email', email)
            props.toast("Success", "Profile updated!")
            props.onHide()
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.isEdit ? 'Edit' : 'Add'} profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formSubmit}>
                        <Form.Group>
                            <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={lastName} onChange={handleLastNameInput} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First Name<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={firstName} onChange={handleFirstNameInput} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" value={middleName} onChange={handleMiddleNameInput}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailInput} required/>
                        </Form.Group>
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
    )
}

export default ProfileModal;