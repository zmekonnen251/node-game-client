import React, {useState} from 'react';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import ChoiceGame from '../features/Game/choiceGame'; 
export default function Game() {
    const [play, setPlay] = useState(true);
    const [gameCounter, setGameCounter] = useState(1);

    return (
        <>
            <ChoiceGame />
        </>
    )
}
