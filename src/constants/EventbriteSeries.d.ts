export default interface EventbriteSeries {
  resource_url: string;
  id: string;
  status: string;
  start: Record<string, unknown>;
  end: Record<string, unknown>;
  locale: string;
  url: string;
}
