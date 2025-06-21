import {House} from "./house";
import {Transactional} from "./transactional";

export interface TransactionalHistoryUser {
  house?: House
  transactionalList?: Transactional[]
}
