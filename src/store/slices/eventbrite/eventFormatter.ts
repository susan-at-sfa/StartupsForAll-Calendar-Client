import EventbriteEvent from "./EventbriteEvent";
import EventbriteFormatted from './EventbriteFormElement';

// eslint-disable-next-line import/no-anonymous-default-export
export default (data: any): EventbriteEvent => {
  const eventData: EventbriteEvent = {
    logo: data.logo,
  }

  let formElements: EventbriteFormatted[] = [
    {
      key: 'Changed',
      value: data.changed,
      type: 'hidden',
      placeholder: null,
      info: null,
      disabled: 'disabled'
    },
    {
      key: 'Created',
      value: data.created,
      type: 'hidden',
      placeholder: null,
      info: null,
      disabled: 'disabled'
    },
    {
      key: 'Id',
      value: data.id,
      type: 'text',
      placeholder: 'Id',
      info: null,
      disabled: 'disabled'
    },
    {
      key: 'Name',
      value: data.name,
      type: 'text',
      placeholder: 'Name',
      info: null,
      disabled: false
    },
    {
      key: 'Summary',
      value: data.summary,
      type: 'text',
      placeholder: 'Summary',
      info: null,
      disabled: false
    },
    {
      key: 'Description', // TODO: see about getting this or leaving it off the entity entirely...
      value: data.description,
      type: 'text',
      placeholder: 'Description',
      info: null,
      disabled: false
    },
    {
      key: 'Url',
      value: data.url,
      type: 'text',
      placeholder: 'Url',
      info: null,
      disabled: 'disabled'
    },
  ];
  if (data.series_dates) {
    console.log("FOUND A SERIES");
    // TODO: handle multi day/recurring events
    // eventData.series_dates = TODO: blah
  } else {
    console.log('SINGLE EVENT - not a series');
    formElements = [
      ...formElements,
      {
        key: 'Start Date',
        value: data.start.utc.split('T')[0],
        type: 'date',
        placeholder: null,
        info: null,
        disabled: 'disabled'
      },
      {
        key: 'End Date',
        value: data.end.utc.split('T')[0],
        type: 'date',
        placeholder: null,
        info: null,
        disabled: 'disabled'
      },
      {
        key: 'Start Time',
        value: data.start.utc,
        type: 'text',
        placeholder: null,
        info: null,
        disabled: 'disabled'
      },
      {
        key: 'End Time',
        value: data.end.utc,
        type: 'text',
        placeholder: null,
        info: null,
        disabled: 'disabled'
      },
    ];
  }
  eventData.form_elements = formElements;
  return eventData;
}