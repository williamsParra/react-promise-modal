import React,{ useEffect, useState } from 'react';
import { Modal as ReactstrapModal, ModalBody, ModalFooter } from 'reactstrap';


export default function AlertModal(props)
{

    const [controlPromise,setControlPromise] = useState({});

    useEffect(()=>{
        if(props.isOpen){
            handleProcessPromise();
        }
    },[props.isOpen]);

    const handleProcessPromise = async() =>{
        let result =await handleResponsePromise();
        if(result){
                props.setModalStatus({status:"ok", response: result});
            }else{
                props.setModalStatus({status:"reject", response: result});
        }    
    }

    const handleResolvePromise =(booleanValue) =>{
        if(booleanValue){
            controlPromise.resolve(true);
        }else{
            controlPromise.resolve(false);
        }
    }

    const handleResponsePromise = async()=>{
        let promise = await new Promise(async(resolve,reject)=>{
            await setControlPromise({resolve, reject});
        })
        return promise;
    }

    const handleOnClickSave =()=>{
        props.onClickSave();
        handleResolvePromise(true);
        props.handleOpen();
    }

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
}