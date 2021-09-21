export const titleCase = (title: string): string => {
  return title[0].toUpperCase().concat(title.slice(1));
}

export const parseIdFromUrl = (url: string): string | null => {
  const id = url.match(/[0-9]{12}/g);
  return id ? id[0] : null;
}

export const toLocalDate = (dateString: string): string => {
  const ISO8601 = new Date(dateString).toISOString();
  return new Date(ISO8601).toLocaleDateString();
  // return new Date(dateString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

export const toLocalTime = (dateString: string): string => {
  const ISO8601 = new Date(dateString).toISOString();
  return new Date(ISO8601).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

export const toUtcDateTime = (date: string, time: string): string => {
  console.log('toUtcDateTime got date time', date, time);
  const splitDate = date.split("-");
  // + converts string into integer
  const year = +splitDate[0]
  // -1 because months are 0-indexed 0-11 but passed as strings 1-12
  const month = +splitDate[1] - 1
  const day = +splitDate[2]
  const splitTime = time.split(/[:\s]/g);
  console.log("raw split time:", splitTime);
  let hour = +splitTime[0]
  const minute = splitTime[1] === "00" ? 0 : +splitTime[1]
  if (splitTime.length === 3) {
    if (splitTime[2] === 'PM' && hour < 12) {
      hour += 12;
    }
  }
  console.log('date time split:', year, month, day, hour, minute);
  const localDateTime = new Date(year, month, day, hour, minute);
  console.log('got local datetime of', localDateTime);
  const utcDateTime = localDateTime.toISOString();
  console.log('after formatting, got utc date time:', utcDateTime);
  return utcDateTime;
}

export const currentMonthEpochTime = (): number => {
  const year = new Date(Date.now()).getFullYear();
  const month = new Date(Date.now()).getMonth();
  return (new Date(year, month)).getTime();
}
