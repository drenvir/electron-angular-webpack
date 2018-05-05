<p align="center">
    <img src="https://i.imgur.com/IsYnbRi.png" width="750">
</p>

<hr>

> A simple kit for [Electron](https://electron.atom.io), [Angular 4](https://angular.io) and [Webpack 3](https://webpack.js.org) including a live reload system for Angular

> The boilerplate include loaders for [TypeScript](https://www.typescriptlang.org/) and [Sass](http://sass-lang.com/)

> [Commands](#commands) are available to package your app or create installer on Windows, Mac and Linux

> Feel free to take a look at the boilerplate skeleton [here](#skeleton)

## Quick start
### Prerequisites
Be sure to have **Node >= 8.0** and **NPM >= 5** installed on your computer/server

You can download NodeJS by following this [link](https://nodejs.org/en/), take the LTS version. The installer will install **Node and Npm**.
```bash
# check node version
node -v

# check npm version
npm -v
```

If you are confronted to the following error while executing our commands on **Mac OS** :
```bash
ERROR in {project_name}/image.jpg
     Module build failed: Error: dyld: Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dylib
       Referenced from: /Users/{project_name}/node_modules/mozjpeg/vendor/cjpeg
       Reason: image not found  
```
Please run this command : `brew install libpng`. See issue [here](https://github.com/tcoopman/image-webpack-loader/issues/51).

Other Known Issues
==================

* If you got error with npm `5.3.0`, then upgrade npm to `5.4.0`. See issue [npm/npm#17781](https://github.com/npm/npm/issues/17781)

* When you first install serialport it will compile against the version of Node.js on your machine, not against the Node.js runtime bundled with Electron. https://github.com/node-serialport/node-serialport#electron
https://github.com/node-serialport/node-serialport/issues/901#issuecomment-289036909
https://github.com/node-serialport/node-serialport/issues/1083

### Create a new project and install npm packages
```bash
# clone via ssh
git clone git@github.com:lbassin/electron-angular-webpack.git
# or clone via https
git clone https://github.com/lbassin/electron-angular-webpack.git

# change directory to the app
cd electron-angular-webpack

# install dependencies with npm
npm install
```

## <a name="commands"></a>Commands
|Command|Description|
|--|--|
|`npm run dev`| Execute the app with a live reload system and source mapping
|`npm run prod`| Build the app with css/js optimizations and minifications
|`npm run packager:win`| Package the app with prod configuration and generate .exe & supporting files
|| ↳ Default configuration : Platform Win32, Arch x64
|`npm run packager:mac`| Package the app with prod configuration and generate .app & supporting files
|| ↳ Default configuration : Platform Darwin, Arch x64
|`npm run packager:linux`| Package the app with prod configuration and generate executable & supporting files
|| ↳ Default configuration : Platform Linux, Arch x64
|`npm run installer:win`| Create Squirrel installer to distribute your app easily
|| ↳ Setup.exe will install app in app_data directory
|| ↳ A desktop shortcut will be created
|| ↳ Default configuration : Platform Win32, Arch x64 ~ *Tested on Windows 10*
|`npm run installer:mac`| Create DMG installer to distribute your app easily
|| ↳ Require XCode and XCode Command Line Tools
|| ↳ XCode licence must be accepted : `sudo xcodebuild -license accept`
|| ↳ Default configuration : Platform Darwin, Arch x64 ~ *Tested on High Sierra 10.13*
|`npm run installer:linux`| Create DEB installer to distribute your app easily
|| ↳ Default configuration : Platform Linux, Arch x64 ~ *Tested on Ubuntu 16.04*

- To change the default configuration of packagers and/or installers :
  - Go to `./builder/packager.js` and/or `./builder/installer.js`
  - Edit `spec['platform']` and/or `spec['arch']` calls in the switch
  - You can add your own platform and arch in the object `spec` but refer to this [doc](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md)

## <a name="skeleton"></a>Skeleton
```
electron-angular-webpack/
 ├──builder/                       # packagers and installers config folder
 │   ├──icons/                     # multi os app icons
 │   │   ├──linux/                 # app icon folder for linux
 │   │   │   └──icon.png           ~ must be a png
 │   │   ├──mac/                   # app icon folder for mac
 │   │   │   └──icon.icns          ~ must be a icns
 │   │   └──windows/               # app icon folder for windows
 │   │       └──icon.ico           ~ must be a ico
 │   │
 │   ├──installer.js               ~ config file for installers
 │   │
 │   └──packager.js                ~ config file for packagers
 │
 ├──src/                           # angular app folder
 │
 ├──.gitignore                     ~ untracked files to ignore
 ├──LICENSE.md                     ~ license of this project
 ├──README.md                      ~ contains information about this project
 ├──electron.ts                    ~ entry file for Electron
 ├──package-lock.json              ~ describes the exact tree that was generated by node/npm (vers. > 8)
 ├──package.json                   ~ manifest about applications, modules, packages, and more
 ├──postcss.config.js              ~ postcss loader configuration file
 ├──tsconfig.json                  ~ specifies root files and compiler options required to compile
 └──webpack.config.js              ~ webpack main configuration file
```
**In addition to this structure, our commands will create these elements :**
```
 .
 ├──dist/                          # compiled code/library
 │
 ├──node_modules/                  # non-global libraries are installed here
 │
 ├──mac_packager/                  # packager folder for mac (removed after npm run installer:mac)
 ├──mac_installer/                 # installer folder for mac
 │
 ├──linux_packager/                # packager folder for linux (removed after npm run installer:linux)
 ├──linux_installer/               # installer folder for linux
 │
 ├──win_packager/                  # packager folder for windows (removed after npm run installer:win)
 └──win_installer/                 # installer folder for windows
```

## Contributors
| [![Laurent BASSIN](https://avatars2.githubusercontent.com/u/11029822?s=115&v=4)](https://github.com/lbassin) | [![Maxime MARQUET](https://avatars0.githubusercontent.com/u/12535829?s=115&v=4)](https://github.com/x-Raz) |
| :--:|:--: |
| Laurent BASSIN | Maxime MARQUET |
| [![Github](https://img4.hostingpics.net/pics/549555githublogo2.png)](https://github.com/lbassin) [![Linkedin](https://img4.hostingpics.net/pics/187690linkedinbutton.png)](https://www.linkedin.com/in/laurent-bassin/) | [![Github](https://img4.hostingpics.net/pics/549555githublogo2.png)](https://github.com/x-Raz) [![Linkedin](https://img4.hostingpics.net/pics/187690linkedinbutton.png)](https://www.linkedin.com/in/maxime-marquet-5243b9a4/) |

## License
MIT © Laurent BASSIN & Maxime MARQUET
