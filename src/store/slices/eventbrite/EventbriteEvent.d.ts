export default interface EventbriteEvent {
  logo?: string;
  changed?: DateString;
  created?: DateString;
  id: string;
  name: string;
  cost?: string;
  currency?: string;
  summary?: string;
  description?: string;
  url?: string;
  start_date?: DateString;
  end_date?: DateString;
  start_time: string;
  end_time: string;
  series_dates?: EventbriteSeries[];
}
