import { Category } from "./Category.enum";
import { CategoryText } from "./CategoryText.enum";

export default interface NewEvent {
  changed?: DateString | string;
  category: Category | string;
  category_text: CategoryText | string;
  cost?: string | number;
  created_at?: DateString | string;
  creator_email?: string;
  creator_name?: string;
  currency?: string;
  custom_blurb?: string;
  id?: string;
  location?: string;
  logo?: string;
  organizer?: string;
  promoted?: boolean;
  series_dates?: EventbriteSeries[];
  start?: string | Date | DateString;
  end?: string | Date | DateString;
  start_date?: string | Date | DateString;
  end_date?: string | Date | DateString;
  start_time?: string | Date | DateString;
  end_time?: string | Date | DateString;
  summary?: string;
  name?: string;
  title: string;
  topics?: string[];
  url?: string | null;
}
