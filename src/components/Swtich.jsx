import React, {useState, useEffect, useContext} from 'react';
import {useCustomContext} from '../hooks/CustomContext';
import '../switch.css'

const Swtich = (props) => {
    const [isChecked,setIsChecked] = useState(props.isChecked || false);
    const contexto = useCustomContext();

    useEffect(()=>{
        setIsChecked(props.isChecked)
    },[props.isChecked])

    useEffect(()=>{
        
        if(contexto && contexto.currentData){

            setIsChecked(contexto.currentData.checkModal)
        }
    },[contexto])

    const handleChange = (e) => {

        contexto.handleChange({pais:"chile"})
        setIsChecked(e.target.checked );
    }

    return (
        <>
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name={props.name}
                    id={props.name}
                    checked={isChecked}
                    onClick={()=>console.log("asd")}
                    onChange={handleChange}
                    disabled={props.readOnly}
                    
                />
                <label className="toggle-switch-label" htmlFor={props.name}>
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
            <label
                className='ps-2 color-gray-dark'
                style={{ marginTop: '8px', marginLeft: '0px'}}
            >
                {props.text}
            </label>
        </>
    )
}

export default Swtich