import React,{ useEffect, useState } from 'react';
import { Modal as ReactstrapModal, ModalBody, ModalFooter } from 'reactstrap';
import {useCustomContext} from '../hooks/CustomContext';


export default function PromiseModal(props)
{
    const [show, setShow] = useState(props.isOpen || false);

    useEffect(()=>{
        setShow(props.isOpen)
    },[props.isOpen]);

    const [promiseInfo, setPromiseInfo] = useState({});
    const [promise,setPromise] = useState({})

    useEffect(()=>{
        console.log("promise",promise)
    },[promise])

    const createPromise = ()=>{
        return new Promise((resolve,reject) =>{
            setPromiseInfo({resolve,reject})
        })
    };


    const showHashtag = props.showHashtag !== undefined ? props.showHashtag : true;
    const createModal = props.type === 'create' ? true: false;
    return (
        <ReactstrapModal isOpen={show} className={props.size != undefined ? 'modal-' + props.size : 'modal-lg'} onOpened={async()=>setPromise(createPromise())}>
                {/* Header */}
                <div className="modal-header">
                    <h5 className="modal-title">{(!props.data) ? (
                        <strong>{`${createModal ? 'AGREGAR ' : ''}${props.title?.toUpperCase()}`}</strong>
                    ) : <>
                        <strong>{`${createModal ? 'EDITAR ': ''}${props.title?.toUpperCase()}`}</strong>
                        {showHashtag ? ': #' : ': '}{props.data[props.dataIdName ? props.dataIdName : 'id']}</>}</h5>
                    <button type="button" className="btn btn-ligth" data-dismiss="modal" aria-label="Cerrar" onClick={()=>{props.handleOpen(); promiseInfo.reject()}} style={{borderRadius:50}}>
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
                        props.type === 'create' && <button type="button" className="btn btn-primary form-btn-save" onClick={(props.onClickSave) ? props.onClickSave : null}>Guardar</button>
                    }
                    <button type="button" className="btn btn-secondary form-btn-close" onClick={()=>{
                            promiseInfo.resolve(false);
                            console.log("cerrar",promise)
                            props.handleOpen();
                        }}>Cerrar</button>
                </ModalFooter>
        </ReactstrapModal>
    );
}