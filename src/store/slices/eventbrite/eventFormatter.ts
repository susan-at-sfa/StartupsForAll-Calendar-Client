import EventbriteEvent from "./EventbriteEvent";
import EventbriteFormatted from './EventbriteFormElement';

// eslint-disable-next-line import/no-anonymous-default-export
export default (data: any): EventbriteEvent => {
  const eventData: EventbriteEvent = {
    logo: data.logo,
  }

  let formElements: EventbriteFormatted[] = [
    {
      key: 'changed',
      value: data.changed,
      type: 'hidden',
      placeholder: null,
      info: null,
      disabled: 'disabled'
    },
    {
      key: 'created',
      value: data.created,
      type: 'hidden',
      placeholder: null,
      info: null,
      disabled: 'disabled'
    },
    // {
    //   key: 'Id',
    //   value: data.id,
    //   type: 'text',
    //   placeholder: 'Id',
    //   info: null,
    //   disabled: 'disabled'
    // },
    {
      key: 'name',
      value: data.name,
      type: 'text',
      placeholder: 'Name',
      info: null,
      disabled: false
    },
    {
      key: 'cost',
      value: data.cost,
      type: 'text',
      placeholder: 'Cost',
      info: `${data.currency} *Taxes and Fees not included.`,
      disabled: true
    },
    {
      key: 'summary',
      value: data.summary,
      type: 'text',
      placeholder: 'Summary',
      info: null,
      disabled: false
    },
    {
      key: 'description', // TODO: see about getting this or leaving it off the entity entirely...
      value: data.description,
      type: 'text',
      placeholder: 'Description',
      info: null,
      disabled: false
    },
    {
      key: 'url',
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
        key: 'start_date',
        value: data.start.utc.split('T')[0],
        type: 'date',
        placeholder: 'Start Date',
        info: null,
        disabled: 'disabled'
      },
      {
        key: 'end_date',
        value: data.end.utc.split('T')[0],
        type: 'date',
        placeholder: 'End Date',
        info: null,
        disabled: 'disabled'
      },
      {
        key: 'start_time',
        value: data.start.utc,
        type: 'text',
        placeholder: 'Start Time',
        info: null,
        disabled: 'disabled'
      },
      {
        key: 'end_time',
        value: data.end.utc,
        type: 'text',
        placeholder: 'End Time',
        info: null,
        disabled: 'disabled'
      },
    ];
  }
  eventData.form_elements = formElements;
  return eventData;
}