// handle OSX open-url event
import { ipcMain } from 'electron'
var queue = []
var commandReceiver

export function setup () {
  ipcMain.once('shell-window-ready', function (e) {
    commandReceiver = e.sender
    // TODO:notabs
    // queue.forEach(url => commandReceiver.send('command', 'file:new-tab', url))
    queue.length = 0
  })
}

export function open (url) {
  if (commandReceiver) {
    // TODO:notabs
    // commandReceiver.send('command', 'file:new-tab', url)
  } else {
    queue.push(url)
  }
  return commandReceiver
}
