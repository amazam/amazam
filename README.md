# Amazam
Amazam is a product recognition app uses CloudSight image recognition and Amazon Product Advertising APIs.

# How our app works
![Amazam flow](images/amazamflow.jpg)
1. Take a picture or select existing picture
2. Use keywords to filter data to Amazon if need.
3. View on Amazon and buy it!

# Setup
## Prerequisites
 - node 
 - yarn
 - Google account to use Firebase
 - Android Studio
 - Genymotion

## 1. Installing
To install app from git repository, go your terminal and follow steps below:
```
  git clone https://github.com/amazam/amazam.git

  yarn install
```
## 2. Run debug app
3. In Android Studio, open folder of cloned project and build project.
4. In Genymotion app, create/select virtual device to use.
5. In terminal, type:
```
  yarn reactn
```
6. In VS code, download the React-Native Tools and enable the debugger
  - Press play on the debugger to start the server
7. In Genymotion, the app should deploy.

## 3. Launch production app
To deploy production app, follow steps 1-4 and then in terminal, type:
1. yarn reactn-release



# Built With
- [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- [Firebase](https://firebase.google.com/docs/)
- [Android Studio](https://developer.android.com/studio/index.html)

