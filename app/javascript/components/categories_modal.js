import React, {useEffect, useState} from "react"
import {Button, ButtonGroup, Form, Modal} from "react-bootstrap";
import {add_category, get_category, update_category} from "../services/category_service";
import LoadingModal from "./loading_modal";

const CategoriesModal = (props) => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [categoryId, setCategoryId] = useState()
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {

    }, [])

    const onModalShow = () => {
        if(!props.isNew){
            //Get category details for edit
            get_category(props.category)
                .then((result) =>  result.json())
                .then((data) => {
                    setName(data.name)
                    setDescription(data.description)
                    setCategoryId(data.id)
                })
        }
        else{
            setName('')
            setCategoryId('')
            setDescription('')
        }
    }

    const handleNameInput = (e) => {
        setName(e.target.value)
    }

    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        setShowLoading(true)
        const data = {
            name: name,
            description: description
        }
        if(props.isNew){
            let result = await add_category(data)
            result = await result.json()
            if(result.errors){
                props.toast("Error", result.errors[0])
            }
            else{
                props.toast("Success!", "Category has been added")
            }
        }
        else{
            let result = await update_category(props.category, data)
            if(!result.ok){
                props.toast("Error", result.errors[0])
            }
            else{
                props.toast("Success!", "Category has been updated")
            }
        }
        setShowLoading(false)
        props.onHide()
    }

    return (
      <>
          <LoadingModal show={showLoading}/>
          <Modal style={{visibility:  showLoading ? 'hidden':'visible' }} size="lg" keyboard={false} backdrop="static" show={props.show} onHide={props.onHide} onShow={onModalShow}>
              <Modal.Header closeButton>
                  <Modal.Title>{props.isNew ? 'Add' : 'Edit'} category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={formSubmit}>
                      <Form.Group>
                          <Form.Label>Category Name<span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" value={name} onChange={handleNameInput} required/>
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Category Description<span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" value={description} onChange={handleDescriptionInput} required/>
                      </Form.Group>
                      <hr/>
                      <Form.Group>
                          <ButtonGroup>
                              <Button type="submit" variant="primary" className="btn-sm">Save</Button>
                              <Button type="reset" variant="warning" className="btn-sm" onClick={props.onHide}>Cancel</Button>
                          </ButtonGroup>
                      </Form.Group>
                  </Form>
              </Modal.Body>
          </Modal>
      </>
    );
}

export default CategoriesModal