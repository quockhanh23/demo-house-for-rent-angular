import {PageImpl} from "./page-impl";
import {House} from "./house";

export interface Page {
  content?: House[]
  page?: PageImpl
}
