# Real Dev Squad Mobile App

Welcome to the repository of our mobile app, which mirrors all the features of our web applications.

## 📱 Tech Stack

- React Native
- TypeScript
- StyleSheet

## 📖 About the Project

This project serves as the Real Dev Squad cross-platform mobile app, built using React Native. It aims to provide a seamless experience for our users by replicating the features of our web application.

## 🚀 Features

### First Phase

- **Github Authentication** ✅ (originally done via WebView, now moved to browser login for GitHub)
- **QR Code Scanner Authentication** ✅
- **Three Screens:** Home and Profile ✅
- **Home Screen Features** ✅
- **Status Switch:** Switch between “I am idle” to “Doing task” ✅
- **Availability Toggle:** Switch between “Out of Office” and “Back Again” ✅
- **Profile Screen:** Modify profile details using your phone’s gallery ✅
- **API Integration in Profile Screen** ✅

### Second Phase

- **Three Screens:** Home, Goals, and Profile ✅
- **Home Screen Features** ✅
- **Goals Tab:** Displays the TODO app where you can assign tasks to the members of the Real Dev Squad.

Feel free to download the RDS app by clicking ➡️ [RDS App](https://drive.google.com/file/d/1aEv941izi5bOJzttZj22EKl47jTnsYy_/view?usp=sharing).

**Note**: Please delete the previous RDS app build if you have it installed.

## 🛠 Prerequisites

Before you start contributing, ensure you have the following:

- React Native setup
- Android Studio
- JDK (openjdk "17.0.12" 2024-07-16)
- Node.js setup (use version above v18.8; tested on v20.18)
- [Volta](https://docs.volta.sh/guide/getting-started) for Node version management | [Why Volta?](https://docs.volta.sh/guide/#why-volta)
- For detailed setup instructions, refer to the [React Native environment setup guide](https://reactnative.dev/docs/environment-setup).

**Note:** Ensure that your React Native development environment is set up correctly to run the Hello World app in RN. Share a video link of your setup in the #react-native channel on Discord.

## ⚙️ Local App Setup

To get started with the development setup:

1. **Clone the Repository**
   ```
   git clone https://github.com/Real-Dev-Squad/mobile-app.git
   ```
2. **Navigate to the Project Directory**
   ```
   cd mobile-app
   ```
3. **Install Dependencies**
   ```
   yarn
   ```
4. **Start the Application**
   ```
   yarn start
   ```

## 📲 Running the App on Android

### Step-by-Step Setup for Android:

1. **Start the Development Server**
   - Open your terminal in the project directory and run:
     ```
     yarn start
     ```
2. **Open Android Studio**
   - Open Android Studio and ensure you have a virtual device (emulator) configured.
   - If not, go to **AVD Manager** and create a new virtual device.
3. **Launch the Android Emulator**
   - Start the emulator from Android Studio or connect a physical device via USB (ensure USB debugging is enabled on your device).
4. **Install the App on the Emulator/Device**
   - Go back to the terminal and press:
     ```
     a
     ```
   - This will automatically build and install the app on the connected device/emulator.
5. **Manual Installation (if step 4 fails)**
   - Open Android Studio, navigate to `android` folder inside your project.
   - Click on **Build** > **Build Bundle(s) / APK(s)** > **Build APK**.
   - After the build completes, install the APK on your device manually.

### Troubleshooting:

- If you encounter errors related to build tools or environment configurations, ensure that your Android SDK is up-to-date.
- If you have issues with device/emulator connectivity, restart ADB using:
  ```
  adb kill-server
  adb start-server
  ```

## 📲 Running the App on iOS

### Step-by-Step Setup for iOS:

1. **Start the Development Server**
   - Open your terminal in the project directory and run:
     ```
     yarn start
     ```
2. **Open Xcode**
   - Navigate to the `ios` folder inside your project.
   - Open the `.xcworkspace` file in Xcode.
3. **Select a Simulator**
   - Choose an iOS simulator from the top bar of Xcode (e.g., iPhone 14).
4. **Install the App on the Simulator**
   - Press the `Run` button in Xcode (or use the shortcut `Cmd + R`).
5. **Install on a Physical Device**
   - Connect your iPhone via USB.
   - In Xcode, select your device as the target and ensure the app is signed correctly using your Apple Developer account.
   - Click `Run` to install the app on your iPhone.

### Troubleshooting:

- If you encounter errors related to pods or library installations, run the following commands inside the `ios` folder:
  ```
  cd ios
  pod install
  cd ..
  ```
- If Xcode shows a signing error, ensure your app’s bundle identifier is unique and configured correctly.

## 📝 Contribution Guide

To contribute to our project:

1. Browse the issues and comment on the one you'd like to work on.
2. Once an issue is assigned to you, follow the local app setup steps.
3. Ensure that your code runs without errors before pushing changes.
4. Run `yarn run precommit-check` to validate your changes.
5. Commit your changes with a descriptive message and push your code to your branch.

### Git Commands for Local Setup

```
git clone https://github.com/Real-Dev-Squad/mobile-app.git
cd mobile-app
yarn
```

### Git Commands to Commit Your Code

```
git checkout -b 'your-PR-name'
git add <files>
git commit -m "Your commit message"
git push origin your-PR-name
```

## 🧪 Test-Driven Development (TDD)

All PRs should have 100% test coverage. Before submitting PRs, run `yarn test` to ensure all tests pass.

If you need assistance at any point, feel free to reach out on the `#mobile-app-react-native` channel on Discord. Happy contributing! 😊
