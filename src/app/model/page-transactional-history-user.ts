import {PageImpl} from "./page-impl";
import {TransactionalHistoryUser} from "./transactional-history-user";

export interface PageTransactionalHistoryUser {
  content?: TransactionalHistoryUser[]
  page?: PageImpl
}
