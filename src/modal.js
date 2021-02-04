import React from 'react'
import {Modal, Button} from 'react-bootstrap'

class Modals extends React.Component{
    constructor(){
        super()
        this.state = {
            showModal: false,
        }
    }

    handleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    reder(){
        return(
            <>
                <Button onClick={()=>this.handleModal()}>Abrir Modal</Button>

                <Modal show={this.state.showModal} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>
                        Este es el header
                    </Modal.Header>
                    <Modal.Body>
                        body
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>Aceptar</Button>
                        <Button onClick={()=>this.handleModal()}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Modals