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
  	frame: false,
  });

  mainWindow.loadURL('https://abema.tv');
  mainWindow.webContents.insertCSS(':root{--html-margin:3px}html{overflow:hidden;margin:var(--html-margin);-webkit-app-region:drag;height:calc(1 - (var(--html-margin)* 2));width:calc(1 - (var(--html-margin)* 2))}body{height:100%;width:100%;margin:0;padding:0}img{margin-left:calc(var(--html-margin)* -1);margin-top:calc(var(--html-margin)* -1);height:calc(1 + (var(--html-margin)* 2));width:calc(1 + (var(--html-margin)* 2))}');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });

  // トレイ
  var iconPath = __dirname + '/images/tray.png';
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'チャンネル', submenu:[
    	{label: 'AbemaNews', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/abema-news')}},
    	{label: 'AbemaSPECIAL', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/abema-special')}},
    	{label: 'SPECIAL PLUS', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/special-plus')}},
    	{label: 'SPECIAL PLUS 2', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/special-plus-2')}},
    	{label: '海外ドラマ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/foreign-drama')}},
    	{label: 'ドラマ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/drama')}},
    	{label: 'REALITY SHOW', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/reality-show')}},
    	{label: 'MTV HITS', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/mtv-hits')}},
    	{label: 'SPACE SHOWER MUSIC', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/space-shower')}},
    	{label: 'Documentary', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/documentary')}},
    	{label: 'バラエティ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/variety')}},
    	{label: 'ペット', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/pet')}},
    	{label: 'CLUB', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/club-channel')}},
    	{label: 'WORLD SPORTS', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/world-sports')}},
    	{label: 'EDGE SPORT', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/edge-sport')}},
    	{label: 'VICE', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/vice')}},
    	{label: 'アニメ24', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/anime24')}},
    	{label: '深夜アニメ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/midnight-anime')}},
    	{label: 'なつかしアニメ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/oldtime-anime')}},
    	{label: '家族アニメ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/family-anime')}},
    	{label: '新作 TV アニメ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/new-anime')}},
    	{label: 'ヨコノリ', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/yokonori-sports')}},
    	{label: '釣り', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/fishing')}},
    	{label: '麻雀', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/mahjong')}},
    	{label: 'SPORTS LIVE', click: function() {mainWindow.loadURL('https://abema.tv/now-on-air/world-sports-1')}}
    	]},
    {type: 'separator'},

    {label: '設定' ,submenu: [
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
    	mainWindow.setIgnoreMouseEvents(contextMenu.items[2].submenu.items[2].checked);
    }},
    {label: 'フルスクリーンにする',type: 'checkbox', checked:false, click: function() {
    	let isfullscreen_answer = mainWindow.isFullScreen();
    	isfullscreen_answer = !isfullscreen_answer;
    	mainWindow.setFullScreen(isfullscreen_answer);
    }},
    	]},
    {label: '終了', accelerator: 'Command+Q', click: function() { app.quit(); }},
  ])

  tray.setContextMenu(contextMenu)

});