import React from "react"
import {Button, Modal} from "react-bootstrap";

const CategoriesModal = (props) => {

    return (
      <>
          <Modal size="lg" show={props.show} onHide={props.onHide}>
              <Modal.Header closeButton>
                  <Modal.Title>Manage Categories</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>

              </Modal.Footer>
          </Modal>
      </>
    );
}

export default CategoriesModal