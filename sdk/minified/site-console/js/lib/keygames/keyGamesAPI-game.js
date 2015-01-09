keyGamesAPI_loadingComplete = function () { //informs when initial loading is complete.
     game_logger("loadingComplete");
     parent.framework_keyGamesAPI_loadingComplete();
};

keyGamesAPI_levelEnd = function () { //sends "level end" after level is completed.
     game_logger("levelEnd");
     parent.framework_keyGamesAPI_levelEnd();
};

keyGamesAPI_gameOver = function () { //sends "game over" when the game is over.
     game_logger("gameOver");
     parent.framework_keyGamesAPI_gameOver();
};

keyGamesAPI_sendScore = function (score) { //sends the game's score when the game is over.
     game_logger("sendScore: " + score.toString());
     parent.framework_keyGamesAPI_sendScore(score);
};

game_logger = function(str){ //log everything
     console.log('KEYGAMES API GAME: '+str);

};