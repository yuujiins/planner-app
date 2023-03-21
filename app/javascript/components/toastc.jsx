import {Toast, ToastContainer} from "react-bootstrap";
import React from "react";

const ToastC = (props) => {

    return (
        <>
            <ToastContainer className="p-3" position={'top-center'}>
                <Toast show={props.toastShow} onClose={props.toastHide} autohide={true} delay={3000}>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">{props.toastTitle}</strong>
                    </Toast.Header>
                    <Toast.Body>{props.toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default ToastC;