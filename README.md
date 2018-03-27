# Amazam

To setup repository and run debug mode, follow steps below:
1. git clone the repository
2. In terminal of the cloned folder, type:
  - yarn install
3. In Android Studio, open folder of cloned project and build project.
4. In Genymotion app, create/select virtual device to use.
5. In terminal, type:
  - yarn reactn
  - adb logcat
6. In VS code, download the React-Native Tools and enable the debugger
  - Press play on the debugger to start the server
7. In Genymotion, the app should deploy.

To deploy production app, follow steps 1-4 and then in terminal, type:
1. yarn reactn-release
