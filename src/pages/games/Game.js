import "./Game.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const gameList = [
    {
      id: 1,
      name: "Football Quiz",
      img: "https://t4.ftcdn.net/jpg/03/32/68/71/360_F_332687153_gmsohq86koOEWFYlYSI3N6xzb1zIcG88.jpg",
    },
    {
      id: 2,
      name: "Football logo",
      img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQN_FU1koiBo_t7JxiKkpexzbWxP-XcPA9iUbtguIohv1NN7opj",
    },
    {
      id: 3,
      name: "Football players",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0WpcG1C6CkF1QDXVcLaUK0tKAxqdMZPYauWP4mQ4vqQ&s",
    },
  ];
 
 
  const navigate = useNavigate();
  const selectGame = (e) => {
    navigate(`/play/${e.target.id}`);
  };
 
  return(
    <div className="games-list">
      {gameList.map((item, index) => {
        return (
          <div key={index} className="game" >
            <h2>{item.name}</h2>
            <img
              className="game-image"
              id={item.id}
              src={item.img}
              alt={item.name}
              onClick={selectGame}
            />
          </div>
        );
      })}
    </div>
  );
}
