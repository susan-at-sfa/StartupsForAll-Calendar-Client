export const titleCase = (title: string): string => {
  return title[0].toUpperCase().concat(title.slice(1));
}

export const parseIdFromUrl = (url: string): string | null => {
  const id = url.match(/[0-9]{12}/g);
  return id ? id[0] : null;
}

export const toLocalTime = (dateString: string): string => {
  console.log('calling tolocaltime on', dateString);
  if (dateString === "" || !dateString) return "";
  return dateString.includes("Z") ? new Date(dateString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date(new Date(dateString).toISOString()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

export const toUtcDateTime = (dateString: string, time: string): string | Date => {
  const dateArray = dateString.split("-");
  const year = Number(dateArray[0]);
  // minus one as the months are 0th indexed 0-11 and date string is 1-12
  const month = Number(dateArray[1]) - 1;
  const day = Number(dateArray[2]);
  const timeArray = time.split(":")
  const hours = Number(timeArray[0]);
  const mins = Number(timeArray[1]);
  const localDateTime = new Date(year, month, day, hours, mins);
  return localDateTime.toISOString();
}

export const currentMonthEpochTime = (): number => {
  const year = new Date(Date.now()).getFullYear();
  const month = new Date(Date.now()).getMonth();
  return (new Date(year, month)).getTime();
}
