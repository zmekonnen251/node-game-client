import './Game.css';

import Choice from './choiceGame/choice';
export default function Game() {
    const gameList = [{
        id: 1,
        name: 'Football Quiz',
        img: 'https://t4.ftcdn.net/jpg/03/32/68/71/360_F_332687153_gmsohq86koOEWFYlYSI3N6xzb1zIcG88.jpg',
   
    },
{
        id: 2,
        name: 'Football logo',
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQN_FU1koiBo_t7JxiKkpexzbWxP-XcPA9iUbtguIohv1NN7opj',
     
},
{
        id: 3,
        name: 'Football players',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0WpcG1C6CkF1QDXVcLaUK0tKAxqdMZPYauWP4mQ4vqQ&s',
},

]

const selectGame = (e) => {
    const id = e.target.parentElement.id;
    console.log(id);
}
    return (
        <div className='games-list'>
           
           {
                gameList.map((item, index) => {
                    return (
                        <div key={index} className='game' id={item.id}>
                            <h2>{item.name}</h2>
                            <img className='game-image' src={item.img} alt={item.name} onClick={selectGame} />
                        </div>
                    )
                })
           }
            
        </div>
    )
}
