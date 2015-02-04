/**
 * Splash State
 */

var con = new Array(4);

var splashState = {
    /** Preload state event
     */
    preload: function() {	
    },
    
    addConMessage: function(msg) {
        for(i = 1 ; i < con.length ; i++) {
            con[i-1].text = con[i].text;
        }
        con[con.length-1].text = msg;
    },
    
    /** Create Event
    /* Used to initialise the loader
     */
    create: function() {	
        // Create status text
        y = game.height - ((con.length+1)*32);
        for(i = 0 ; i < con.length ; i++) {
            con[i] = game.add.text(0,y+(i*32), "");
        }
        this.addConMessage("Loading Assets");
        
        // Set background colour
        game.stage.backgroundColor = '#182d3b';	
        
        // Prepare loading events
        game.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        game.load.onFileComplete.addOnce(this.onLoadProgress, this);
        
        // Add Resources
        game.load.image('loadingBar','loadingbar.png');
        game.load.image('sky', 'sky.png');
        game.load.image('star', 'star.png');
        game.load.image('hole', 'hole.png');
        game.load.image('missed', 'missed.png');
        game.load.spritesheet('baddie', 'baddie.png', 32, 32, 4);
        game.load.text('levelData', 'levels.json');
        game.load.image('dialog', 'dialog.png');
        
        // Start Loading
        game.load.start();
    },
    
    /** Progress load event
     */
    onLoadProgress: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        // If loading bar graphic, we can then use it to show the loading bar
        if(cacheKey === 'loadingBar') {
            this.preloadBar = this.add.sprite(200, 370, 'loadingBar');
            this.load.setPreloadSprite(this.preloadBar);		
        }
        
        // Update load progress with iConsole
        pPerc = progress / 100.0;
        this.addConMessage("iConsole.game.loadProgress: " + (pPerc*100) + "%");
        iConsole.game.loadProgress( {
            progress: pPerc,
        } );		
    },
    
    /** Load Complete
     */
    onLoadComplete: function() {
        // Parse level data
        mLevelData = JSON.parse(game.cache.getText('levelData'));		
        
        // Load user game data from iConsole
        this.addConMessage("iConsole.game.getGameData");
        iConsole.game.getGameData().result(function(resultData) {
            try {
                globalGameData = JSON.parse(resultData.mData);
                splashState.addConMessage("iConsole.game.getGameData: Complete");
            } catch (e) {
                console.log("No GameData Available As Yet");
                splashState.addConMessage("iConsole.game.getGameData: N/A");
            }
        });
        
        // Notify iConsole of loaded 100%
        splashState.addConMessage("iConsole.game.loadProgress: 1");
        iConsole.game.loadProgress( {
            progress: 1,
        } );		
        
        // And notify iConsole of completion
        splashState.addConMessage("iConsole.game.loaded()");
        iConsole.game.loaded( {
            success: true
        } );  		
    }
};
