import {Button, ButtonGroup, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {update_password, update_user} from "../services/user_service";
import LoadingModal from "./loading_modal";

const PasswordModal = (props) => {
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [retypePassword, setRetypePassword] = useState()
    const [showLoading, setShowLoading] = useState(false)

    const onModalShow = () => {
        setOldPassword('')
        setNewPassword('')
        setRetypePassword('')
    }
    const handleOldPasswordInput = (e) => {
        setOldPassword(e.target.value)
    }

    const handleNewPasswordInput = (e) => {
        setNewPassword(e.target.value)
    }

    const handleRetypePasswordInput = (e) => {
        setRetypePassword(e.target.value)
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        props.onHide()
        setShowLoading(true)
        const data = {
            id: window.sessionStorage.getItem('user_id'),
            old_password: oldPassword,
            password: newPassword
        }

        if(newPassword == retypePassword){
            let result = await update_password(data)
            if(!result.ok){
                const body = await result.json()
                props.toast("Error", body.errors)
            }
            else{
                props.toast("Success", "Password updated!")
                props.onHide()
            }
        }
        else{
            props.toast("Error", "Passwords do not match")
        }
        setShowLoading(false)
    }

    return (
        <>
            <LoadingModal show={showLoading}/>
            <Modal show={props.show} onShow={onModalShow} onHide={props.onHide} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formSubmit}>
                        <Form.Group>
                            <Form.Label>Old Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="password" value={oldPassword} onChange={handleOldPasswordInput} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="password" value={newPassword} onChange={handleNewPasswordInput} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Retype Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control type="password" value={retypePassword} onChange={handleRetypePasswordInput} required/>
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

export default PasswordModal;