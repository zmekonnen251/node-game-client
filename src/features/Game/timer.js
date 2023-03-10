import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function timer({timer}) {

  

      
    return (
        <div className='timer'>
          <ProgressBar now={timer} label={`${timer}`}  style={{color: 'red', height:'16px', fontSize: '10px'}}  />
        </div>
    )
}
