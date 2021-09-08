export default interface EventbriteEvent {
  logo?: string;
  changed?: DateString;
  created?: DateString;
  creator_name?: string;
  creator_email?: string;
  id: string;
  location?: string;
  title: string;
  cost?: string;
  currency?: string;
  summary?: string;
  description?: string;
  url?: string;
  start_date?: DateString;
  end_date?: DateString;
  start_time: DateString;
  end_time: DateString;
  series_dates?: EventbriteSeries[];
}
