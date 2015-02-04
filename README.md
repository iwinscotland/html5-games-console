# ![iWin Logo](https://raw.githubusercontent.com/iwininc/html5-games-console/master/docs/assets/css/logo.png) Games Console
## Overview
This repository contains the public API to write HTML5 games that are enabled for the iWin Games Console.

You can see the iWin Games Console in action by visiting http://m.iwin.com/ and playing games such as:
- JewelQuest [http://m.iwin.com/game/match3/puzzle-match3-jewelquest]
- S'more Words [http://m.iwin.com/game/puzzle/smorewords]
- Yukon Solitaire [http://m.iwin.com/game/casual/solitairequestklondike]

The iWin Games Console will enable your game to:

1. Save and restore game state on different devices.
2. Post hiscores to the daily / weekly leaderboard.
3. Trigger adverts and earn money.
4. Support in app purchases with external providers such as Amazon, Yahoo, ...

## Step-by-Step Guide
Here is a step-by-step guide to get you started:

1. Download this SDK and unpack in into a local folder on your machine.
   See the Download ZIP option to the right.
   You should end up with a file structure
   .../<folder of your choice>/docs
   .../<folder of your choice>/sdk
   .../<folder of your choice>/README.md

2. Setup a host entry as follows (where 127.0.0.1 is the ip or your local machine)
   127.0.0.1 local.games.iwin.com
   The iWin Game Console uses this domain name to enable integration with backend test servers for certain API calls that underpin the chat, hiscore, user persistence and identity and other functionality.

3. Point a local web server at the folder you unpacked the sdk into (i.e. .../<folder of your choice>/) .
   Access the Api Documentation by visiting [http://local.games.iwin.com/docs/index.html](http://local.games.iwin.com/docs/index.html)
   Access the SDK by visiting [http://local.games.iwin.com/sdk/#/sdk/game](http://local.games.iwin.com/sdk/#/sdk/game)
   This will run a sample game written in Phaser.io that is integrated with the iWin Games Console.

4. Place a copy of your game code in a new folder beneath the sdk folder called for example mygame.
   Ensuring there is a file named index.html at the root that runs your game.

5. Copy the game_details.json file from the sdk/game folder and place in your new mygame folder.

6. Edit the game_details.json file as follows:
  - Set the "name" property to be the user visible name for your game, example "Jewel Quest".
  - Set the "code" property to be a lowercase text string unique for your game, example "jewel_quest".
  - Set the "developer_id" property to be a lowercase text string that is unique for your company, example "iwin_inc".
  - Leave the "advertBehavior" as it is defined for the moment, refer to the API docs for more details.

7. The iWin Games Console servers your game (game/index.html) via an IFRAME and all requests inside that IFRAME will be local to the game folder.
   You must ensure that you load the parent folders "../iconsole.js" script within the head of your games index.html page, before making any messages to the console.
   Insert a line to load the parent folders "../iconsole.js" javascript api
   &lt;script src="../iconsole.js" type="text/javascript"&gt;&lt;/script&gt;

8. You should now be able to access your game by visiting [http://local.games.iwin.com/sdk/#/sdk/mygame/](http://local.games.iwin.com/sdk/#/sdk/mygame/)

9. Implement [`iConsole.game.ready().result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_ready)
   This will enable your game to notify the console to display an advert plus the progress 
   bar during the game loading sequence. The callback function will be called once the console 
   and the game are loaded and the advert has been dismissed.
   
   Also implement [`iConsole.game.loadProgress( progress-json )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_loadProgress)
   This will enable your game to notify the console to update the percentage complete bar.
   
   Finally call [`iConsole.game.loaded( status-json )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_loaded) once all resources are load.
   
10. Implement [`iConsole.game.postHighScore( score-json ).result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_postHighScore)
   This will enable your game to post a highscore to the console leaderboard. This should 
   be called during the end of game sequence.
   
   In the future we will also support posting scores for individual levels.
   
11. Implement [`iConsole.game.setGameData( gameState-json ).result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_setGameData)
   This will enable your game to save up to 2K of game state data for the current player
   that can be reloaded with [`iConsole.game.getGameData().result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.game.html#method_getGameData). These two calls allow users to start a game on one device and continue playing on another device.
   
12. Implement [`iConsole.ads.show( level-json ).result( callback-function )`](http://htmlpreview.github.io/?https://github.com/iwininc/html5-games-console/blob/master/docs/classes/iConsole.ads.html#method_show)
   This will enable your game to trigger adverts to display and should be called during 
   the level start sequence. The frequency of the adverts is controlled via the game-details.json file.

Please see the API documentation on other available API calls and functionality, such as IAP, periodical data, correcting viewport within the console and also save / restore individual level data.