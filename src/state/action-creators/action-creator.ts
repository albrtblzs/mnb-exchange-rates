import { ActionType } from "../action-types/overtake-type";
import { Dispatch } from "redux";
import { Action } from "../actions/overtake-action";
import { Driver } from "../../pages/ExchangeRates";
import axios from "axios";

export const overTake = (driverId: number) => {
  return async (dispatch: Dispatch<Action>) => {

    const overTakeDriver = async (driverId: number) => {
      console.log('hellos')
      const { data: response } = await axios.get(
        `http://api.napiarfolyam.hu?bank=mnb`
      );
      console.log(response);
      return [] as Driver[];
      // setArticles(response);
    };
  
    const drivers = await overTakeDriver(driverId);
   dispatch({
     type: ActionType.OVERTAKE,
     drivers: drivers,
   })
  }
 };