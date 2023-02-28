import API from '../../../services/httpService';

export const answerQuestion = async(game_id, answer) => {
    const response = await API.post("/game/answer", {
        gameId: game_id,
        answer: answer,
    });
    const { data } = response;
    return data;
}