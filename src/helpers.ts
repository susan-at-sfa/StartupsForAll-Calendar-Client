export const titleCase = (title: string): string => {
  return title[0].toUpperCase().concat(title.slice(1));
}

export const parseIdFromUrl = (url: string): string | null => {
  // regular express matches the number in the provided url
  // as long as it is 9 or more consecutive numbers
  // eventbrite URLs contain the EB ID which has been between 9 and 11 numbers in length
  // left the regex as "at least 9" for future proofing
  const id = url.match(/[0-9]{9,}/g);
  console.log(`parsed event brite id ${id} from url ${url}`);
  return id ? id[0] : null;
}

// Takes in a UTC date string (eg 2021-10-02T19:00:00.000Z) and returns just the date part
export const toLocalDate = (utcDateString: string): string => {
  const date = utcDateString.split("T")[0];
  console.log(`converted ${utcDateString} to ${date}`);
  return date;
}

export const toLocalTime = (dateString: string): string => {
  if (dateString === "" || !dateString) return "";
  return dateString.includes("Z") ? new Date(dateString).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}) : new Date(new Date(dateString).toISOString()).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
}

export const to24HourTime = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = "" + (parseInt(hours, 10) + 12);
  }
  return `${hours}:${minutes}`;
}

// Takes a Date object, removes seconds and milliseconds as unecessary precision
// and returns the string formatted for postgres timestampz eg: "2021-10-01T18:12:00Z"
export const toUtcDateTime = (dateString: Date): string => {
  console.log("HELPER - to utc time from date", dateString, dateString.toISOString());
  return new Date(dateString.setSeconds(0,0)).toISOString().replace(':00.000Z', ":00Z");
  // const theDate = new Date(dateString);
  // console.log("pure date", theDate);
  // const utc = theDate.toISOString();
  // const rawUtc = dateString.toISOString();
  // console.log("converted raw and new dates to ISO", rawUtc, utc);
  // return ""
  // const dateArray = dateString.split("-");
  // const year = Number(dateArray[0]);
  // // minus one as the months are 0th indexed 0-11 and date string is 1-12
  // const month = Number(dateArray[1]) - 1;
  // const day = Number(dateArray[2]);
  // const timeArray = time.split(":")
  // const hours = Number(timeArray[0]);
  // const mins = Number(timeArray[1]);
  // const localDateTime = new Date(year, month, day, hours, mins);
  // return localDateTime.toISOString();
}

export const currentMonthEpochTime = (): number => {
  const year = new Date(Date.now()).getFullYear();
  const month = new Date(Date.now()).getMonth();
  return (new Date(year, month)).getTime();
}
