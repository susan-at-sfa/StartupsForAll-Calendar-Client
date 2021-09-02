export default interface FormattedEvent {
  name: string;
  created: Date;
  changed: Date;
  currency: string;
  description: string;
  summary: string;
  start: Record<string, unknown>;
  end: Record<string, unknown>;
  id: string;
  url: string;
}
