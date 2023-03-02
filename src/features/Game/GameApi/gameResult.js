import API from '../../../services/httpService';

export const gameResult = async(game_id, answer) => {
    const response = await API.post("/game/history", {
        gameId: game_id
    });
    const { data } = response;
    return data;
}