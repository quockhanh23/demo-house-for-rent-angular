import {PageImpl} from "./page-impl";
import {Transactional} from "./transactional";

export interface PageTransactional {
  content?: Transactional[]
  page?: PageImpl
}
