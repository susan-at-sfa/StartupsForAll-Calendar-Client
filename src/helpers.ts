export const titleCase = (title: string): string => {
  return title[0].toUpperCase().concat(title.slice(1));
}

export const parseIdFromUrl = (url: string): string | null => {
  const id = url.match(/[0-9]{12}/g);
  return id ? id[0] : null;
}

export const toLocalDate = (dateString: string): string | Date => {
  return new Date(Date.parse(dateString)).toISOString().split("T")[0];
}

export const toLocalTime = (dateString: string): string => {
  return new Date(Date.parse(dateString)).toLocaleTimeString();
}

export const toUtcDateTime = (date: string | Date, time: string): string => {
  console.log('toUtcDateTime got date time', date, time);
  const dateString = date + " " + time;
  const localDateTime = new Date(dateString);
  const utcDateTime = localDateTime.toISOString();
  console.log('after formatting, got utc date time:', utcDateTime);
  return utcDateTime;
}
