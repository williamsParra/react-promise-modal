import React ,{ useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/AlertModal';
import Info from './components/Info';
import { Button } from 'reactstrap';


function App() {

  const [openModal,SetOpenModal] = useState(false);
  const [modalStatus,setModalStatus] = useState({});

  useEffect(()=>{
    setTimeout(async()=>{
      console.log("antes")
      handleOpen();
      
      await modalStatus;
      console.log("despues")
    },5000)
  },[]);

  useEffect(()=>{
    console.log("modal status",modalStatus)
  },[modalStatus])

  const handleOpen = ()=>{
    SetOpenModal(!openModal);
  }


  return (
      <div className="App">
        <h1>AlerModal</h1>
        <Button color="danger" onClick={handleOpen}>
          Open Modal
        </Button>
        <AlertModal type="create" title="Test"  modalStatus={modalStatus} setModalStatus={setModalStatus} isOpen={openModal} handleOpen={handleOpen} onClickSave={()=>{console.log("guardado")}}/>
      </div>
  )
}

export default App
