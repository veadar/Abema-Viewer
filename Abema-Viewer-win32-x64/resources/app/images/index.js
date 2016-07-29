"use strict";

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const {Menu, Tray} = require('electron');

let tray = null

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({
  	width: 1000,
  	height: 600,
  	alwaysOnTop: true,
  	//titleBarStyle: 'hidden',
  });

  mainWindow.loadURL('https://abema.tv');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  // トレイ
  var iconPath = __dirname + '/images/tray.png';
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'チャンネルリスト', type: 'normal'},
    {label: 'AbemaNews', click: function() {mainWindow.loadURL('http://qiita.com/')}},
    {label: 'homge', type: 'radio'},
    {label: 'ウィンドウを常に最前面にする',type: 'checkbox', checked:true, click: function() {
    	let alwaysOnTop = mainWindow.isAlwaysOnTop();
    	alwaysOnTop = !alwaysOnTop;
    	mainWindow.setAlwaysOnTop(alwaysOnTop);
    }},
    {label: 'ウィンドウの移動を禁止する',type: 'checkbox', checked:false, click: function() {
    	let ismovable_answer = mainWindow.isMovable();
    	ismovable_answer = !ismovable_answer;
    	mainWindow.setMovable(ismovable_answer);
    }},
    {label: 'クリックを禁止する',type: 'checkbox', checked:false, click: function() {
    	mainWindow.setIgnoreMouseEvents(contextMenu.items[5].checked);
    }},
    {label: 'test', type: 'checkbox', click: function() { mainWindow.setMovable(false); }},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'},
    {type: 'separator'},
    {label: '設定' ,submenu: [
    	{label: 'ウィンドウレベル'},
    	{label: '2'},
    	]},
    {label: '終了', accelerator: 'Command+Q', click: function() { app.quit(); }},
  ])

  tray.setContextMenu(contextMenu)

});