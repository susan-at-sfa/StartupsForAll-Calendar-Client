import { FC, useEffect } from 'react';
import { google } from 'googleapis';
import { useAppSelector } from '../../hooks';
import { topicsEmojis } from '../../constants/TopicsEmojiColors';
import { googleCategoryColors, googleCategoryText } from './Constants';

const UserAddToGoogle: FC = () => {
  const events = useAppSelector(({ dbEvent }) => dbEvent.dbEvents);
  const selectedEventID = useAppSelector(({ eventModal }) => eventModal.selectedEventID)
  const selectedEvent = events.filter((e: any) => e.id === selectedEventID);
  const { gapi } = google
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  const SCOPES = "https://www.googleapis.com/auth/calendar.events"

  return (
    selectedEvent.map((e: any) => {
      const {
        category,
        category_text,
        creator_name,
        description,
        end_date,
        location,
        start_date,
        summary,
        title,
        topics,
        url
      } = e;

      return (
        gapi.load('client:auth2', () => {
          console.log("loaded client");

          gapi.client.init({
            apiKey: process.env.GOOGLE_AUTH_API_KEY,
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })

          gapi.client.load('calendar', 'v3', () => console.log("YES"))

          const googleEventEmojis = topics.map((topic: string) => topicsEmojis[topic]).join(" ")

          gapi.auth2.getAuthInstance().signIn()
            .then(() => {

              const googleEvent = {
                'summary': googleEventEmojis + "[" + creator_name + "]" + title,
                'location': location,
                'description':
                  `${googleCategoryText[category_text]}
              ${description}
        
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
                  'dateTime': end_date
                }
              }

              const request = gapi.client.calendar.events.insert({
                'calendar': 'primary',
                'resource': googleEvent
              })

              request.execute((e: any) => {
                window.open(e.htmlLink)
              })
            }
            )
        }))
    })
  )
}

export default UserAddToGoogle;
