## Real Dev Squad Mobile App

This is the repository of our mobile app, which will have all the features of our web apps.

## Tech Stack

React Native, TypeScript, CSS

## About the Project

This Project serves the RealdevSquad hybrid app. This project is built in React-native.

## First Phase

- Github Authentication
- Three Screens - Home , Task and Profile
- Home screen Features
- Feature with switching from I am idle to doing task
- Feature with switching from out of office from back again
- Profile Screen in which we can change our profile through our phone’s gallery

Feel free to download our Rds App in our mobile using below link [RDS App](https://drive.google.com/file/d/1xWEl6qXmDFY7MhogKbW-UKNrMZVhELLo/view?usp=sharing)

Note : Please delete the previous RDS app build if you have.

## Prerequisites

### Local App setup

- First set up with React native environment on your local machine. You can refer the [Environment Setup Link](https://reactnative.dev/docs/environment-setup)
- If you have done the first point then congrats 🎉now you are good to go !
- Now clone the mobile app Repo with [Github Repo Link](https://github.com/Real-Dev-Squad/mobile-app)
- Create a new file: config/config.js. copy  content from config/config.sample.js into config/config.js. 
- Register the application for GitHub OAuth to get the clientId and clientSecret. Add the callback URL as x-realdevsquad-rdsapp://oauth2/authorize
- Replace the clientId and clientSecret in `config/config.js` file with the values from the github oauth app 
- Start contributing.

## Contributuion Guide

- If you are new to React Native please go through react-native documentation and setup the installation setup first.
- Clone the repo and go through the code base.
- Make sure you have node installed on your computer.
- Go through the issues and comment on issue which you find interesting.
- Discuss, contribute and raise the PR.
- If you need any other help, feel free to ping on `mobile-app-react-native` channel at discord.

**Installation**

## **NOTE** : Make sure to set up the proper development environment required to run react-native applications.

You can refer : https://reactnative.dev/docs/environment-setup

After setting up the development environment:

- `git clone<repository-url>` this repository
- `cd mobile-app`
- `cd RDSApp`
- `yarn`

**Running/Development**

- `npx react-native start` - to start Metro, the JavaScript bundler that ships with React Native.
- Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:
- `npx react-native run-android` - To start the emulator.
