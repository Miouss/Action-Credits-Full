import { ActionName } from "./enums";

export interface Action {
  name: ActionName;
  credits: number;
}
export interface Actions {
  items: Action[];
  id: string;
}
export interface Queue {
  executed: ActionName[];
  pending: ActionName[];
}

export interface QueueByStatusWithExecutedHistory {
  items: Queue;
  executedItemsHistory: number;
}
