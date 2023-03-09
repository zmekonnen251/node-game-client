import API from '../../../services/httpService';

export const answerQuestion = async(game_id, answer, questionId) => {
    try {
        const response = await API.post("/game/answer", {
            gameId: game_id,
            answer: answer,
            questionId: questionId
        });
        const { data } = response;
        return data;
    }
    catch (err) {
        console.log(err);
        return err;
    }
  
}