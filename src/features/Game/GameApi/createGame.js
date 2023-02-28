import API from '../../../services/httpService';

export const createGame = async() => {
     const response = await API.post("/game/play", {});
      const { data } = response;
      return data;
}