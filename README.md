## Real Dev Squad Mobile App

This is the repository of our mobile app, which will have all the features of our web apps.

## Tech Stack

React Native, TypeScript, StyleSheet

## About the Project

This Project serves the RealdevSquad cross-platform-app. This project is built in React-Native.

## First Phase

- Github Authentication ✅
- Three Screens - Home , Task and Profile ✅
- Home screen Features ✅
- Feature with switching from I am idle to doing task
- Feature with switching from out of office from back again
- Profile Screen in which we can change our profile through our phone’s gallery ✅
- API integration in Profile Screen

Feel free to download our RDS app by clicking on ➡️ [RDS App](https://drive.google.com/file/d/1xWEl6qXmDFY7MhogKbW-UKNrMZVhELLo/view?usp=sharing)

Note : Please delete the previous RDS app build if you have.


## Prerequisites

- React Native setup
- Android Studio
- Node setup

## **NOTE** : Make sure to set up the proper development environment required to run react-native applications.

You can refer : https://reactnative.dev/docs/environment-setup

### Local App setup

- First set up with React native environment on your local machine. You can refer the [Environment Setup Link](https://reactnative.dev/docs/environment-setup)
- If you have done the first point then congrats 🎉now you are good to go !
- Now clone the mobile app Repo with [Github Repo Link](https://github.com/Real-Dev-Squad/mobile-app)
- Run the command - `Yarn`.
- Start contributing.

## Contribution Guide

- You must have all the pre-requisites which are mentioned above.
- Go through the issues and comment on the one which you like.
- When an issue is assigned to you then just follow all the local App setup steps and you are good to do😊
- Before pushing the code make sure you follow the below 👇steps

  - Make sure you run the app on your local machine. It should not give any errors.
  - Run `yarn run format-fix`
  - Run `yarn run lint` to fix linting errors.
  - Remove unused comments and console logs.
  - Run `yarn test`.
  - then Run `your git commands` to push your code.
  - Make sure to give a proper commit message.
 
- If you need any other help, feel free to ping on `mobile-app-react-native` channel at discord.


Git commands for local setup:

- `git clone https://github.com/Real-Dev-Squad/mobile-app.git`
- `cd mobile-app`
- `yarn`

Git commands to commit your code:

- `git checkout -b 'your PR name'` 
- `git add .`
- `git commit -m "message"`
- `git push origin your PR name`

**TDD**

- All the PRs should be raised with the 100% test coverage.
- Before submitting the PRs you should run the command `yarn test` to check if all the tests are passed or not.

**Running/Development**

- `yarn react-native start` - to start Metro, the JavaScript bundler that ships with React Native.
- Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:
- `yarn react-native run-android` - To start the emulator.



