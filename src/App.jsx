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

  const awaitingPromiseRef = useRef(null);

  useEffect(()=>{
    awaitingPromiseRef && console.log("ref",awaitingPromiseRef.current);
  },[awaitingPromiseRef])

  const toggle = () => {
    setModal(!modal);
  };

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
        <PromiseModal isOpen={modal} handleOpen={toggle} title="Test" type="create"/>
      </div>
      </CustomContextProvider>
  )
}

export default App
