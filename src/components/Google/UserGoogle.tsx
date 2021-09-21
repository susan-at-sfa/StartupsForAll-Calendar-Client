import { topicsEmojis } from '../../constants/TopicsEmojiColors';
import { googleCategoryColors, googleCategoryText } from './Constants';

export async function handleGoogleClick(event: any) {
  const {
    category,
    category_text,
    creator_name,
    custom_blurb,
    end_date,
    id,
    location,
    start_date,
    summary,
    title,
    topics,
    url,
  } = event;
  const gapi = window.gapi
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  const SCOPES = "https://www.googleapis.com/auth/calendar.events"
  const CLIENT_ID = `${process.env.GOOGLE_AUTH_CLIENT_ID}`
  const API_KEY = `${process.env.GOOGLE_AUTH_API_KEY}`


  const googleEventEmojis = topics.map((topic: string | number) => topicsEmojis[topic]).join(' ');
  const googleID = id.replace(/-/g, '')

  gapi.load('client:auth2', () => {
    console.log('loaded client')

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })

    gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES,
    })

    gapi.client.load('calendar', 'v3', () => console.log('okay'))

    gapi.auth2.getAuthInstance().signIn()
      .then(() => {

        const googleEvent: any = {
          'id': googleID,
          'summary': googleEventEmojis + '[' + creator_name + ']' + title,
          'location': location,
          'description': `${googleCategoryText[category_text]}
          ${custom_blurb}
        
          ${url}

          About this event: 
          ${summary}

          ${url}
          `,
          'colorId': googleCategoryColors[category],
          'start': {
            'dateTime': start_date,
          },
          'end': {
            'dateTime': end_date,
          },
        };

        const request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: googleEvent
        })

        request.execute(response => {
          console.log("Did it", response)
          // window.open(response.headers.htmlLink)
        })
      })
  })
}