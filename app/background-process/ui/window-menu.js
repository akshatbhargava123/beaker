import { app, BrowserWindow, dialog } from 'electron'
import { createShellWindow } from './windows'

var darwinMenu = {
  label: 'Beaker',
  submenu: [
    { label: 'About Beaker', role: 'about' },
    { type: 'separator' },
    { label: 'Services', role: 'services', submenu: [] },
    { type: 'separator' },
    { label: 'Hide Beaker', accelerator: 'Command+H', role: 'hide' },
    { label: 'Hide Others', accelerator: 'Command+Alt+H', role: 'hideothers' },
    { label: 'Show All', role: 'unhide' },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'Command+Q', click() { app.quit() } }
  ]
}

var fileMenu = {
  label: 'File',
  submenu: [
    {
      label: 'New Window',
      accelerator: 'CmdOrCtrl+N',
      click: function () { createShellWindow() }
    },
    {
      label: 'Open File',
      accelerator: 'CmdOrCtrl+O',
      click: function (item, win) {
        if (win) {
          dialog.showOpenDialog({ title: 'Open file...', properties: ['openFile', 'createDirectory'] }, files => {
            if (files && files[0]) {
              // TODO:notabs
              // win.webContents.send('command', 'file:new-tab', 'file://'+files[0])
            }
          })
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Close Window',
      accelerator: 'CmdOrCtrl+Shift+W',
      click: function (item, win) {
        if (win) win.close()
      }
    }
  ]
}

var editMenu = {
  label: 'Edit',
  submenu: [
    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
    { type: "separator" },
    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
  ]
}

var viewMenu = {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, win) {
      if (win) {
        win.webContents.reload()
      }
    }
  },
  {
    label: 'Hard Reload (Clear Cache)',
    accelerator: 'CmdOrCtrl+Shift+R',
    click: function (item, win) {
      if (win) win.webContents.reloadIgnoringCache()
    }
  },
  { type: "separator" },
  {
    label: 'Zoom In',
    accelerator: 'CmdOrCtrl+Plus',
    click: function (item, win) {
      // TODO:notabs
      // if (win) win.webContents.send('command', 'view:zoom-in')
    }
  },
  {
    label: 'Zoom Out',
    accelerator: 'CmdOrCtrl+-',
    click: function (item, win) {
      // TODO:notabs
      // if (win) win.webContents.send('command', 'view:zoom-out')
    }
  },
  {
    label: 'Actual Size',
    accelerator: 'CmdOrCtrl+0',
    click: function (item, win) {
      // TODO:notabs
      // if (win) win.webContents.send('command', 'view:zoom-reset')
    }
  },
  { type: "separator" },
  {
    label: 'Toggle DevTools',
    accelerator: 'Alt+CmdOrCtrl+I',
    click: function (item, win) {
      if (win) win.toggleDevTools()
    }
  }]
}

var showHistoryAccelerator = 'Ctrl+h'

if (process.platform === 'darwin') {
  showHistoryAccelerator = 'Cmd+y'
}

var historyMenu = {
  label: 'History',
  role: 'history',
  submenu: [
    {
      label: 'Back',
      accelerator: 'CmdOrCtrl+Left',
      click: function (item, win) {
        // TODO:notabs
        // if (win) win.webContents.send('command', 'history:back')
      }
    },
    {
      label: 'Forward',
      accelerator: 'CmdOrCtrl+Right',
      click: function (item, win) {
        // TODO:notabs
        // if (win) win.webContents.send('command', 'history:forward')
      }
    },
    {
      label: 'Show Full History',
      accelerator: showHistoryAccelerator,
      click: function (item, win) {
        // TODO:notabs
        // if (win) win.webContents.send('command', 'file:new-tab', 'beaker:history')
      }
    }
  ]
}


var windowMenu = {
  label: 'Window',
  role: 'window',
  submenu: [
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }
  ]
}
if (process.platform == 'darwin') {
  windowMenu.submenu.push({
    type: 'separator'
  })
  windowMenu.submenu.push({
    label: 'Bring All to Front',
    role: 'front'
  })
}


var helpMenu = {
  label: 'Help',
  role: 'help',
  submenu: [
    {
      label: 'Help',
      accelerator: 'F1',
      click: function (item, win) {
        // TODO:notabs
        // if (win) win.webContents.send('command', 'file:new-tab', 'https://beakerbrowser.com/docs/')
      }
    },
    {
      label: 'Report Bug',
      click: function (item, win) {
        // TODO:notabs
        // if (win) win.webContents.send('command', 'file:new-tab', 'https://github.com/beakerbrowser/beaker/issues')
      }
    },
    {
      label: 'Mailing List',
      click: function (item, win) {
        // TODO:notabs
        // if (win) win.webContents.send('command', 'file:new-tab', 'https://groups.google.com/forum/#!forum/beaker-browser')
      }
    }
  ]
}
if (process.platform !== 'darwin') {
  helpMenu.submenu.push({ type: 'separator' })
  helpMenu.submenu.push({
    label: 'About',
    role: 'about',
    click: function (item, win) {
      // TODO:notabs
      // if (win) win.webContents.send('command', 'file:new-tab', 'beaker:settings')
    }
  })
}

export default function buildWindowMenu () {
  var menus = [fileMenu, editMenu, viewMenu, historyMenu, windowMenu, helpMenu]
  if (process.platform === 'darwin') menus.unshift(darwinMenu)
  return menus
}
