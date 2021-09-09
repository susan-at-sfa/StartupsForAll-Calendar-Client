export default interface NewEvent {
  logo?: string;
  changed?: DateString | string;
  created?: DateString | string;
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
  start_date?: DateString | string;
  end_date?: DateString | string;
  start_time: DateString | string;
  end_time: DateString | string;
  series_dates?: EventbriteSeries[];
}
