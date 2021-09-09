export default interface NewEvent {
  changed?: DateString | string;
  cost?: string;
  created?: DateString | string;
  creator_email?: string;
  creator_name?: string;
  currency?: string;
  description?: string;
  id?: string;
  eventbrite_id?: string;
  location?: string;
  logo?: string;
  series_dates?: EventbriteSeries[];
  start_date?: DateString | string;
  end_date?: DateString | string;
  start_time: DateString | string;
  end_time: DateString | string;
  summary?: string;
  title: string;
  topics?: string[];
  url?: string;
}
