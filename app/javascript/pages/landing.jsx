import React, {useEffect} from 'react';
import landing from '../assets/landing-bg.jpg'
import {Container, Image} from "react-bootstrap";
import '../assets/styles.css';
import journal from '../assets/journal.png'
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
const Landing = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(window.sessionStorage.getItem('token')){
            navigate('/home')
        }
    }, [])
    const goToPlanner = () => {
        navigate('/login', {
            replace: false
        })
    }

    return <>
        <Container fluid={true} style={{backgroundImage: `url(${landing})`,
            backgroundSize: "cover",
            width: "100vw", height: "100vh"
        }} className="landing-bg">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "100%", zIndex: "-1"}}>
                <Image src={journal} style={{width: "150px", height: "auto"}}/>
                <h2>Keep track of what's important.</h2>
                <Button variant={"outline-secondary"} onClick={goToPlanner} >Go to your planner</Button>
            </div>

        </Container>
    </>
}

export default Landing;