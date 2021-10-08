# Startups For All Events Community Calendar

This repository holds the front-end for the Startups For All Events Calendar.

View the backend code at [https://github.com/eyecuelab/StartupsForAll-Calendar-Api](https://github.com/susan-at-sfa/StartupsForAll-Calendar-Api).

View a test build of the app at [https://community-calendar-client.herokuapp.com/](https://community-calendar-client.herokuapp.com/).

---

## Instructions For Use Of This Application

NOTE: See below for local installation instructions or visit the test build [here](https://community-calendar-client.herokuapp.com/).

This application allows users to view and interact with events associated with the [Startups For All](https://startupsforall.org/) community.

Those with proper permissions to do so can also create events using this app. Any events created can be associated with an Evenbrite event ID or created from scratch by the user inputting event details. Once the details are reviewed and saved they are then added to this application's database and saved to the connected Google calendar.

Events created within this application can then be found, details viewed, and links to sign up followed.

The administrator of this application, upon authorization, can modify or delete any events from this application and the associated Google calendar.

---

## Requirements For Building/Testing Locally

1. [yarn](https://yarnpkg.com/) package manager for Node. Please follow the [installation instructions](https://yarnpkg.com/getting-started/install) on their website.
2. [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) version control software. Please follow the [installation instructions here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
3. [NodeJS](https://nodejs.org/en/download/) for running the application. Please follow the [download and install instructions here](https://nodejs.org/en/download/).
4. A Google Cloud Platform application which is set up to accept events created using this application to be added to a Google Calendar. Please see the [Google Cloud Setup](Cloud_Setup.md) document for specific instructions.

NOTE: For this frond-end application to work correctly it must communicate with a back-end server. Installation and use instructions for the back end are available [at this repository link](https://github.com/eyecuelab/StartupsForAll-Calendar-Api). Please see and follow all instructions there.

---

## Installation/Building Locally Instructions

1. Download the repository using git:

```
git clone https://github.com/eyecuelab/StartupsForAll-Calendar-Client
```

2. Enter the newly-created project folder:

```
cd StartupsForAll-Calendar-Client/
```

3. Install all project dependencies with yarn:

```
yarn
```

4. Create an environmental variables file which includes information used by the app front end for accessing the app backend. Do this by coping the included example:

```
cp .env.example .env
```

5. Run the application front end:

```
yarn start
```

6. Open a browser of your choice (Firefox, Chrome, etc.) and navigate to http://localhost:3000/

Note: You can also build the app for production which creates a build/ folder containing the minified and bundled project. Build with:

```
yarn build
```

---

## License

[MIT](https://mit-license.org/)

---

## Known Issues

- None known of at this time. Please open a pull request if any are found. Thanks!

---

## Copyright

&copy; 2021
EyeCue Lab&trade; and Startups For All&trade;

All copyrights, trademarks, service marks, and logos are the respective property of their holders. If you detect any issues with the legality of this site in any way, shape, or form, problems are always unintentional and will be corrected upon notification.
