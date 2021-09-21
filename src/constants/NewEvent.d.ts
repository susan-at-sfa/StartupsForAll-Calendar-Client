import { Category } from "./Category.enum";
import { CategoryText } from "./CategoryText.enum";
import EventbriteDateObject from "../../constants/EventbriteDateObject";

export default interface NewEvent {
  changed?: DateString | string;
  category: Category | string;
  category_text: CategoryText | string;
  cost?: string | number;
  created?: DateString | string;
  creator_email?: string;
  creator_name?: string;
  currency?: string;
  custom_blurb?: string;
  id?: string;
  location?: string;
  logo?: string;
  promoted?: boolean;
  series_dates?: EventbriteSeries[];
  start?: EventbriteDateObject;
  end?: EventbriteDateObject;
  start_date?: DateString | string;
  end_date?: DateString | string;
  start_time?: DateString | string;
  end_time?: DateString | string;
  summary?: string;
  name?: string;
  title: string;
  topics?: string[];
  url?: string | null;
}
