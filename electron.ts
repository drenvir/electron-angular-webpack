import electron = require('electron');
// Module to control application life
const app = electron.app;
const Menu = electron.Menu;

// This should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
	// Squirrel event handled and app will exit in 1000ms, so don't do anything else
	app.quit();
}

/* Single Instance Check */
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
	// Someone tried to run a second instance, we should focus our window.
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});

/* End Single Instance Check */

import path = require('path');
import url = require('url');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: electron.BrowserWindow;

// Get environment type (dev / prod)
const args = process.argv.slice(1);
let dev = args.some(arg => arg === '--dev');

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 720
	});
	mainWindow.setMenu(null);

	if (!dev) {
		// and load the index.html of the app.
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		}));
	} else {
		mainWindow.loadURL('http://127.0.0.1:4200');
	}

	if (dev) {
		// Open the DevTools.
		mainWindow.webContents.openDevTools();
	}

	mainWindow.on('close', (e) => {
		if (!forceQuit) {
			e.preventDefault();
			mainWindow.minimize();
		}
	})

	// App menu
	Menu.setApplicationMenu(menu);
}

var forceQuit = false;

var menu = Menu.buildFromTemplate([{
	label: 'File',
	submenu: [{
		label: 'Cấu hình',
		click() {
			electron.dialog.showMessageBox(mainWindow, {
				type: 'info',
				buttons: ['Đồng ý'],
				title: 'Cấu hình',
				message: 'Trang cấu hình: Lis ' + electron.app.getVersion()
			})
		}
	}, {
		type: 'separator'
	}, {
		label: 'Thoát',
		// accelerator: 'CmdOrCtrl+Q',
		click: function () {
			var confirm = electron.dialog.showMessageBox(mainWindow, {
				type: 'question',
				buttons: ['Không', 'Có'],
				title: 'Xác nhận',
				message: 'Bạn chắc chắn thoát ứng dụng không?'
			})
			// confirm 'yes'
			if (confirm === 1) {
				forceQuit = true;
				app.quit();
			}
		}
	}]
}, {
	label: 'Help',
	submenu: [{
		label: 'Thông tin',
		click() {
			electron.dialog.showMessageBox(mainWindow, {
				type: 'info',
				buttons: ['Đồng ý'],
				title: 'Thông tin',
				message: 'ERM - Lis ' + electron.app.getVersion()
			})
		}
	}]
}]);


if (shouldQuit) {
	app.quit();
} else {
	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on('ready', createWindow);

	// Quit when all windows are closed.
	app.on('window-all-closed', function () {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	// This is another place to handle events after all windows are closed
	app.on('will-quit', function () {
		// This is a good place to add tests insuring the app is still
		// responsive and all windows are closed.
		console.log("will-quit");
		mainWindow = null;
	});

	app.on('activate', function () {
		// On OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (mainWindow === null) {
			createWindow();
		} else {
			mainWindow.show();
		}
	});
}

function handleSquirrelEvent(app) {
	if (process.argv.length === 1) {
		return false;
	}

	const ChildProcess = require('child_process');
	const path = require('path');

	const appFolder = path.resolve(process.execPath, '..');
	const rootAtomFolder = path.resolve(appFolder, '..');
	const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
	const exeName = path.basename(process.execPath);

	const spawn = function (command, args) {
		let spawnedProcess, error;

		try {
			spawnedProcess = ChildProcess.spawn(command, args, {
				detached: true
			});
		} catch (error) {}

		return spawnedProcess;
	};

	const spawnUpdate = function (args) {
		return spawn(updateDotExe, args);
	};

	const squirrelEvent = process.argv[1];
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':
			// Optionally do things such as:
			// - Add your .exe to the PATH
			// - Write to the registry for things like file associations and
			//   explorer context menus

			// Install desktop and start menu shortcuts
			spawnUpdate(['--createShortcut', exeName]);

			setTimeout(app.quit, 1000);
			return true;

		case '--squirrel-uninstall':
			// Undo anything you did in the --squirrel-install and
			// --squirrel-updated handlers

			// Remove desktop and start menu shortcuts
			spawnUpdate(['--removeShortcut', exeName]);

			setTimeout(app.quit, 1000);
			return true;

		case '--squirrel-obsolete':
			// This is called on the outgoing version of your app before
			// we update to the new version - it's the opposite of
			// --squirrel-updated

			app.quit();
			return true;
	}
}