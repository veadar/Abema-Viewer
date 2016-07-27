"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const {Menu, Tray} = require('electron')
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
  });

  mainWindow.loadURL('https://abema.tv');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  // トレイ
  var iconPath = __dirname + '/images/tray.png';
  tray = new Tray(iconPath)


});