import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function timer({timer , setTimer}) {
      
    return (
        <div className='timer'>
          <ProgressBar now={timer} />
        </div>
    )
}
