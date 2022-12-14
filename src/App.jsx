import React ,{ useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {CustomContextProvider} from './hooks/CustomContext';
import PromiseModal from './components/PromiseModal';
import Swtich from './components/Swtich';
import Info from './components/Info';
import { Button } from 'reactstrap';


function App() {
  const [modal, setModal] = useState(false);
  const [active, setActive] = useState(true);
  const [data, setData] = useState({checkModal:false ,name:"nukero"})

  const createPromise = ()=>{
    return new Promise((resolve,reject) =>{
        setPromiseInfo({resolve,reject})
    })
};

  const [promiseInfo, setPromiseInfo] = useState({});
  const [promise,setPromise] = useState({})

  useEffect(()=>{
    console.log("promise",promise)
    //ver el estado actual de la promesa
    if(promise.value){
        console.log(promise.value)
        //ejecutar el washer con el valor (true o el false)
        //o usar referencia para ver el estado de la promise
        

    }
},[promise])

  const wassher = async(value)=>{
    console.log(value)
    return await value;
  }

  const awaitingPromiseRef = useRef(null);

  useEffect(()=>{
    awaitingPromiseRef && console.log("ref",awaitingPromiseRef.current);
  },[awaitingPromiseRef])

  const toggle = () => {
    if(modal){
      promiseInfo.resolve(false);
      console.log("cerrar",promise)
    }

    setModal(!modal);
  };

  const successPromice = ()=>{
    promiseInfo.resolve(true);
    console.log(promise);
  }

  useEffect(()=>{
    setData({...data,checkModal:modal})
  },[modal])

  return (
    <CustomContextProvider data={data}>
      <div className="App">
        <h1>Test context</h1>
        <Swtich isChecked={active} name="test"/>
        <Button color="danger" onClick={toggle}>
          Open Modal
        </Button>
        <Info/>
        <PromiseModal isOpen={modal} handleOpen={toggle} washer={wassher} title="Test" type="create" isOpened={async()=>setPromise(createPromise())} successPromice={successPromice}/>
      </div>
      </CustomContextProvider>
  )
}

export default App
