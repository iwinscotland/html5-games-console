# ![iWin Logo](https://raw.githubusercontent.com/iwininc/html5-games-console/master/docs/assets/css/logo.png) Games Console
## Overview
This repository contains the public API to write HTML5 games that are enabled for the iWin Games Console.

You can see the iWin Games Console in action by visiting http://m.iwin.com/ and playing games such as:
- JewelQuest
- S'more Words
- Yukon Solitaire

The iWin Games Console will enable your game to:

1. Save and restore game state on different devices.
2. Post hiscores to the daily / weekly leaderboard.
3. Trigger adverts and earn money.

## Step-by-Step Guide
Here is a step-by-step guide to get you started:

1. Download this SDK and place it on a local folder on your machine.

2. Point a local web server at this new folder. Access the SDK by visiting http://localhost/sdk
   This will run a sample game written in Phaser.io that is integrated with the iWin Games Console.

3. Place a copy of your game code in a new folder beneath the sdk folder.

4. Copy the game_details.json file from the sdk/game folder and place in your new game folder.

5. Edit the game_details.json file as follows:
  - Set the "name" property to be the user visible name for your game
  - Set the "code" property to be a lowercase text string unique for your game
  - Set the "developer_id" property to be a lowercase text string that is unique for your company

6. Implement [`iConsole.game.ready().result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_ready)
   This will enable your game to notify the console to display an advert plus the progress 
   bar during the game loading sequence. The callback function will be called once the console 
   and the game are loaded and the advert has been dismissed.
   
   Also implement [`iConsole.game.loadProgress( progress-json )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_loadProgress)
   This will enable your game to notify the console to update the percentage complete bar.
   
   Finally call [`iConsole.game.loaded( status-json )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_loaded) once all resources are load.
   
7. Implement [`iConsole.game.postHighScore( score-json ).result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_postHighScore)
   This will enable your game to post a highscore to the console leaderboard. This should 
   be called during the end of game sequence.
   
   In the future we will also support posting scores for individual levels.
   
8. Implement [`iConsole.game.setGameData( gameState-json ).result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_setGameData)
   This will enable your game to save up to 2K of game state data for the current player
   that can be reloaded with [`iConsole.game.getGameData().result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_getGameData). These two calls allow users to start a game on one device and continue playing on another device.
   
9. Implement [`iConsole.ads.show( level-json ).result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.ads.html#method_show)
   This will enable your game to trigger adverts to display and should be called during 
   the level start sequence. The frequency of the adverts is controlled via the 
   game-details.json file.
 
There are other API calls available to set the correct viewport within the console and 
also save / restore inidividual level data. Please refer to the documentation folder
that comes with this SDK.
