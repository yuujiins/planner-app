import {Modal} from "react-bootstrap";
import {Rings} from "react-loader-spinner";
import React from "react";


const LoadingModal = (props) => {

    return (
        <>
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}
                backdrop={"static"}
                show={props.show}

            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Please wait...
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <div>
                        <Rings
                            height="100"
                            width="100"
                            color="#D7B56D"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoadingModal;