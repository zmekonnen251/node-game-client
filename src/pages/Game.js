import React, {useState} from 'react';
import './Game.css';

import Header from '../layouts/Header';
import ChoiceGame from '../features/Game/choiceGame'; 
export default function Game() {
    return (
        <div className='game-title'>
            <ChoiceGame />
        </div>
    )
}
