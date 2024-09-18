# Readme - Joe

## Acceptability Criteria

- [x] Fetch and render a list of activities using GET `https://www.strava.com/api/v3/athlete/activities`
- [x] Allow user to click on activity and show more information (calories) using GET `https://www.strava.com/api/v3/activities/{id}`
- [x] Fetch streams for the selected activity using GET `https://www.strava.com/api/v3/activities/{id}/streams`
- [x] Using the laps array from the activity and the streams data, calculate:
  - [x] maxCadence
  - [x] maxElevation
  - [x] minElevation
  - [x] maxHeartRate
  - [x] minHeartRate
  - [x] maxSpeed
- [x] Render data calculated for each lap

## Approach

- Use Postman to get response data and use to add types.
- Store the auth in a provider.
- The instructions say to use native fetch, create a reusable fetch handler to handle data retrieval, loading and error states.
- Likely the most time consuming part of this task will be reading through the Strava API docs.
- Ideally I'd like to test the function that decorates the laps with the additional data.

## Improvements

- I focused on writing clean fetching and rendering logic so the styling is bare bones.
- Focused on readability for the `getDecoratedLaps.ts` function. This would need to be tested.
- I'd use a fetching library such as SWR.
- There are more Activity types that may have different data shapes (bike ride) to handle.

---

# Runna Strava Challenge

## Challenge

You are working for a early stage fitness startup. They want to experiment with the Strava API to see what type of information they can display in a React-Native mobile app. You have been brought in as a Full Stack engineer and your first task is to research the Strava API docs and integrate with a RN app. The tech lead has created a bare bones repo to help you get started and has also installed https://github.com/FormidableLabs/react-native-app-auth which will handle to oAuth2.0 authetication flow with Strava.

They have also left intructions on how to get the project working on your local environment

## Getting started

1. Clone this repo
2. Clone to your local machine
3. Follow the guide on https://reactnative.dev/docs/environment-setup to get your local machine set up for RN development
4. Open terminal
5. Change to your project directory
6. Run `yarn install`
7. If on a mac run `cd ios && pod install`

You can use iOS or Android simulator, its up to you. But if on a MAC I would suggest using an iOS simulator as its a lot quicker to devlop on

### iOS

To start up ios simulator run

```
yarn start
yarn ios
```

### Android

To start up android simulator run

```
yarn start
yarn android
```

### Strava API

In order to use the Strava API you will need to first create an app on Strava.com using your peronsal Strava account. To do that please follow the Getting Started guide from Strava https://developers.strava.com/docs/getting-started/. Below is a screenshot of the API settings that you should use:

<img width="669" alt="image" src="https://user-images.githubusercontent.com/5293650/199803451-77983e30-88bc-4eda-9ffc-792710e37200.png">

Once your Strava App is created please open `app.tsx` and add your details for `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`

Now you can press `Strava auth` button on the simulator and it will take you through the Strava auth flow. Please use the following user login details (we have created a test users that has some test activities for you. This will save you from having to generate activities):

```
email: "developer+stravav2@runna.com"
password: "Z2^[5UlBDyG0"
```

Your accessToken will be printed to the console (which can be seen in your terminal on tab where you started your metro bundler i.e. `yarn start`). You will use this accessToken to call the Strava API

<img height="400" alt="image" src="https://user-images.githubusercontent.com/5293650/199756290-3ca777b8-bc24-4088-a3c7-6d0bf3c2e254.png">

## Tasks

1. Fetch a list of activities using the Strava API and display on the homescreen of the app (you can decide what summary information you want to display i.e. distance, time)
2. Allow a user to click on an activity in the list and display more information about the activity.
3. Use the Activity Streams API to fetch the `heartRate, elevation(altitude), cadence, speed(velocity_smooth)` for an activity (HINT: the query parameters will be something like `?keys=heartrate,altitude,velocity_smooth&key_by_type=true`)
4. Using the `laps` array from an activity we want to compute the following data points for each lap:
   - maxCadence
   - maxElevation
   - minElevation
   - maxHeartRate
   - minHeartRate
   - maxSpeed
5. Display a list of laps with above data points for each activity

## Keep in mind

- Use the native fetch API (https://reactnative.dev/docs/network) to make the Strava API requests, there is no need to install another library to do this
- Please dont spend more than 3 hours on this challenge
- There are no designs to work to. We're more concerned with functionality at this stage. You will have to make some UI / layout choices.
- If you have questions feel free to ask them.
- There is no need to push your changes up to the remote branch, the first part of the technical interview will be a code review of your changes on your local machine

Have fun. We look forward to seeing your work!
