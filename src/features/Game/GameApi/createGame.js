import API from '../../../services/httpService';

export const createGame = async() => {
      try{
            const response = await API.post("/game/play", {});
            const { data } = response;
            return data;
      }
      catch(err){
            return err;
      }
    
}