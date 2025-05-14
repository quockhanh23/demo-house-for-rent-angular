import {PageImpl} from "./page-impl";
import {Comment} from "./comment";

export interface PageComment {
  content?: Comment[]
  page?: PageImpl
}
