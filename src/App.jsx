import React ,{ useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/AlertModal';
import { Button } from 'reactstrap';


function App() {

  const [openModal,SetOpenModal] = useState(false);

  const modalRef = useRef();

  useEffect(()=>{
    setTimeout(async()=>{
      console.log("antes")
      handleOpen();
      let response = await modalRef.current.handleProcessPromise();
      console.log("despues")
      console.log("response time out",response)
    },5000)
  },[]);

  const handleOpen = ()=>{
    SetOpenModal(!openModal);
  }

  return (
      <div className="App">
        <h1>AlerModal</h1>
        <Button color="danger" onClick={handleOpen}>
          Open Modal
        </Button>
        <AlertModal ref={modalRef} type="create" title="Test" isOpen={openModal} handleOpen={handleOpen} onClickSave={()=>{console.log("guardado")}}/>
      </div>
  )
}

export default App
