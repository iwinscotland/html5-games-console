/** Static data */
var HOLES_COUNT_X = 5;
var HOLES_COUNT_Y = 5;
var SPRITEWIDTH = 32;
var SPRITEHEIGHT = 32;
var GAMESTATE_READY = 0;
var GAMESTATE_INGAME = 1;
var GAMESTATE_ENDOFGAME = 2;

/** Variables */
var mHoles;
var mBaddies = [];
var mScore = 0;
var mBestScore = 0;
var mMissed = [];
var mLevelData;
var mCurrentLevel = 0;

/** Missed sprite */
function missed(idx) {
    this.icon = game.add.sprite(game.width - SPRITEWIDTH, idx*SPRITEWIDTH,'missed'); 
}

/** Baddie Class */
function baddie(x,y) {
    this.baddie = game.add.sprite(x,y,'baddie');
    this.baddie.inputEnabled = true;
    this.baddie.input.start();
    this.x = x;
    this.y = y;
    this.flagDestroy = false;
    
    var frames = [ 2,3 ];
    this.baddie.animations.add('loop',frames,5,true,true);
    this.baddie.animations.play('loop');
    
    game.time.events.add(Phaser.Timer.SECOND * mLevelData.levels[mCurrentLevel].timing.disappear, function() {
        this.flagDestroy = true;
    }, this);
}

baddie.prototype.destroy = function() {
    this.baddie.kill();
};

/** Hole Class */
function hole(x,y) {
    this.hole = game.add.sprite(x,y,'hole');
    this.x = x;
    this.y = y;
}

hole.prototype.update = function() {
    game.time.events.add(Phaser.Timer.SECOND * ((Math.random() * mLevelData.levels[mCurrentLevel].timing.range) + mLevelData.levels[mCurrentLevel].timing.minimum), function() {
        mBaddies.push(new baddie(this.x,this.y));
        this.update();
    }, this);
};

/** Game State */
var gameState = {	

    /** Preload
     */
    preload: function() {
        mScore = 0;
        mBestScore = 0;
        mHoles = new Array(mLevelData.levels[mCurrentLevel].size.width * mLevelData.levels[mCurrentLevel].size.height);
        this.mState = GAMESTATE_READY;
    },
    
    /**
     * Create 
     */
    create: function() {
        game.add.sprite(0, 0, 'sky');
        
        border = 50;
        stepx = (game.width - (border*2)) / (mLevelData.levels[mCurrentLevel].size.width);
        stepy = (game.height - (border*2)) / (mLevelData.levels[mCurrentLevel].size.height);
        
        for(i = 0 ; i < mHoles.length ; i++) {
            y = parseInt(i/(mLevelData.levels[mCurrentLevel].size.width));
            x = parseInt(i%(mLevelData.levels[mCurrentLevel].size.width));
            
            y *= stepx;
            x *= stepy;
            
            x += border;
            y += border;
            
            mHoles[i] = new hole(x,y);//game.add.sprite(x,y,'baddie');
        }
        
        // Load in Scores and show 'Start' Dialog
        mBestScore = 0;
        this.showStartGame();
    },
    
    /** Start Game.  Gets things moving
     */
    start: function() {
        for(i = 0 ; i < mHoles.length ; i++) {
            mHoles[i].update();
        }
        this.mState = GAMESTATE_INGAME;
    },	
    
    /** Shows the 'ready' / start game dialog
     */
    showStartGame: function() {
        this.mScoreText = game.add.text(0,0,"Score: " + mScore, { font: "32px helvetica", fill: "#ffffff", align:"center" });
        this.mBestScoreText = game.add.text(300,0,"Best: " + mBestScore, { font: "32px helvetica", fill: "#ffffff", align:"center" });		
        this.dialog = new Dialog('Preparing Game Data',1, function() {
            gameState.dialog.destroy();
            gameState.start();
        });
        this.dialog.setRowText(0,"iConsole.game.getLevelData: Loading");

        // Call iconsole to getLevel data (current highscore for this level)
        iConsole.game.getLevelData( { data: mCurrentLevel } ).result( function(resultData ) {
            if(resultData && resultData.mData) {
                data = JSON.parse(resultData.mData);
                mBestScore = data.bestscore;
            }
            gameState.dialog.setRowText(0,"iConsole.game.getLevelData: Done");
            gameState.dialog.showOk();
        });		
        
    },	
    /** Returns to the main menu
     */
    returnToMenu: function() {
    },	
    /**
     * Game over / End game
     */
    endGame: function() {
		this.mState = GAMESTATE_ENDOFGAME;
        // Save Highscores?
        if(mBestScore < mScore) {
            mBestScore = mScore;
        }
        if(mScore > globalGameData.bestScore) {
            globalGameData.bestScore = mScore;
        }
        
        // Create dialog
        this.dialogTasksCompleted = 0;
        this.dialog = new Dialog('Game Over',3, function() {
            gameState.dialog.destroy();
            game.state.start('menu');
        });
        this.dialog.setRowText(0,"iConsole.game.postHighScore: ");
        
        // End game, so post the score.
        iConsole.game.postHighScore( {
            score: mScore
        } ).result( function() {
            gameState.dialog.setRowText(0,"iConsole.game.postHighScore: Done");
            gameState.dialogTasksCompleted++;
            if(gameState.dialogTasksCompleted >= 3) {
                gameState.dialog.showOk();
            }
        } );

        // Save the users best score for this level
        this.dialog.setRowText(1,"iConsole.game.setLevelData: ");
        iConsole.game.setLevelData( { 
            level: mCurrentLevel,
            data: '{ "bestscore":' + mBestScore + ' }' 
        }).result( function() {
            gameState.dialog.setRowText(1,"iConsole.game.setLevelData: Saved");
            gameState.dialogTasksCompleted++;
            if(gameState.dialogTasksCompleted >= 3) {
                gameState.dialog.showOk();
            }
        });

        // Save globally best highscore
        this.dialog.setRowText(2,"iConsole.game.setGameData: ");
        gd = JSON.stringify(globalGameData);
        iConsole.game.setGameData( { data: gd }).result( function() {
            gameState.dialog.setRowText(2,"iConsole.game.setGameData: Saved");
            gameState.dialogTasksCompleted++;
            if(gameState.dialogTasksCompleted >= 3) {
                gameState.dialog.showOk();
            }
        });	
        
    },
    
    /** Update game
     */
    update: function() {		
        switch(this.mState) {
            case GAMESTATE_READY:
            case GAMESTATE_ENDOFGAME:
                this.dialog.update();
                break;
                
            case GAMESTATE_INGAME:
                for(i = mBaddies.length - 1 ; i >= 0 ; i--) {
                    if(mBaddies[i].flagDestroy) {
                        mBaddies[i].destroy();
                        mBaddies.splice(i,1);
                        mMissed.push(new missed(mMissed.length));
                    } else {
                        if(mBaddies[i].baddie.input.pointerDown(game.input.activePointer.id)) {
                            mBaddies[i].destroy();
                            mBaddies.splice(i,1);
                            mScore += mLevelData.levels[mCurrentLevel].hitscore;
                            this.mScoreText.text = "Score: " + mScore;
                        }
                    }
                }
                
                if(mMissed.length >= mLevelData.levels[mCurrentLevel].misses) {
                    this.endGame();
                }
                break;	
        }
    }
};
