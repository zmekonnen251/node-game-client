import axios from "axios";


export const getQuestion = async () => {
  const response = await axios.get("https://www.footballhistory.org/quiz/history.json");
  const { data } = response;
  return data;
}