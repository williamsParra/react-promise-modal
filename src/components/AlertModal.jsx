import React,{ useEffect, useState, forwardRef, useImperativeHandle  } from 'react';
import { Modal as ReactstrapModal, ModalBody, ModalFooter } from 'reactstrap';


const AlertModal = forwardRef((props, ref) =>{
    //estado del componente
    //almacena resolve y reject de la promesa creada.
    const [controlPromise,setControlPromise] = useState({});

    //funcion intermediara creada para generar y recuperar la promesa
    const handleProcessPromise = async() =>{
        let result = await handleResponsePromise();
        return result;
    }

    //funcion creada para generar la respuesta de la promesa
    const handleResolvePromise =(booleanValue) =>{
        if(booleanValue){
            controlPromise.resolve(true);
        }else{
            controlPromise.resolve(false);
        }
    }

    //funcion utilizada para enviar la respuesta de la promesa
    //al componente padre
    useImperativeHandle(ref,()=> {
        return {handleProcessPromise}        
    });
    
    //funcion que crea la promesa y guarda en el estado.
    //el resolve y el reject
    const handleResponsePromise = async()=>{
        let promise = await new Promise(async(resolve,reject)=>{
            await setControlPromise({resolve, reject});
        })
        return promise;
    }

    //funcion que ejecuta el guardado del prop. responde la promesa. y ejecuta el cerrado
    const handleOnClickSave =()=>{
        props.onClickSave();
        handleResolvePromise(true);
        props.handleOpen();
    }

    //funcion que responde la promesa y ejecuta el cerrado
    const handleClose = ()=>{
        handleResolvePromise(false);
        props.handleOpen();
    }


    const showHashtag = props.showHashtag !== undefined ? props.showHashtag : true;
    const createModal = props.type === 'create' ? true: false;
    return (
        <ReactstrapModal isOpen={props.isOpen} className={props.size != undefined ? 'modal-' + props.size : 'modal-lg'} onOpened={props.isOpened}>
                {/* Header */}
                <div className="modal-header">
                    <h5 className="modal-title">{(!props.data) ? (
                        <strong>{`${createModal ? 'AGREGAR ' : ''}${props.title?.toUpperCase()}`}</strong>
                    ) : <>
                        <strong>{`${createModal ? 'EDITAR ': ''}${props.title?.toUpperCase()}`}</strong>
                        {showHashtag ? ': #' : ': '}{props.data[props.dataIdName ? props.dataIdName : 'id']}</>}</h5>
                    <button type="button" className="btn btn-ligth" data-dismiss="modal" aria-label="Cerrar" onClick={handleClose} style={{borderRadius:50}}>
                        x
                    </button> 
                </div>

                {/* Body */}
                <ModalBody>
                    {
                        props.children
                    }
                </ModalBody>

                {/* Footer */}
                <ModalFooter>
                    {
                        props.type === 'create' && <button type="button" className="btn btn-primary form-btn-save" onClick={(props.onClickSave) ? handleOnClickSave : null}>Guardar</button>
                    }
                    <button type="button" className="btn btn-secondary form-btn-close" onClick={handleClose}>Cerrar</button>
                </ModalFooter>
        </ReactstrapModal>
    );
});

export default AlertModal;