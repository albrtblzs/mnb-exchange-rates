import { Driver } from "../../pages/ExchangeRates";
import { ActionType } from "../action-types/overtake-type";

interface OvertakeAction {
  type: ActionType.OVERTAKE,
  drivers: Driver[],

}


export type Action = OvertakeAction;