/**
 * Menu State / Main Menu
 */

/** Data */
var mMenuButtons = [];
    
var menuState = {
    /** Preload 
     */
    preload: function() {
    },
     
    /** Create Event 
     */
    create: function() {		
        // Prep required startup images
        game.add.sprite(0, 0, 'sky');
        
        // And text
        w = 400;
        h = 40;
        x = (game.width - w) / 2;
        y = (game.height - h*mLevelData.levels.length) / 2;
        
        // Create difficulty / Level buttons
        mMenuButtons = new Array(mLevelData.levels.length);
        for(i = 0 ; i < mLevelData.levels.length ; i++) {
            mMenuButtons[i] = new Button(x,y + (i*h),w,h, "Start: " + mLevelData.levels[i].name);
        }
        
    },
     
    /** Update 
     */
    update: function() {
        // Is the pointer down? if so check which button its over and tag it (if possible)
        if(game.input.activePointer.isDown) {
            for(i = 0 ; i < mMenuButtons.length ; i++) {
                if(Phaser.Rectangle.contains(mMenuButtons[i].rect,game.input.x,game.input.y) && !mMenuButtons[i].isDown) {
                    mMenuButtons[i].isDown = true;
                    idx = i;
                } else {
                    mMenuButtons[i].isDown = false;
                }
            }
        }
        // Is the pointer up? if so check which button its and if it was down last then activate it
        if(game.input.activePointer.isUp) {
            var nLevel = -1;
            for(i = 0 ; i < mMenuButtons.length ; i++) {
                if(Phaser.Rectangle.contains(mMenuButtons[i].rect,game.input.x,game.input.y) && mMenuButtons[i].isDown) {
                    mMenuButtons[i].isDown = false;
                    nLevel = i;
                }
            }
            
            // Run this level?
            if(nLevel >= 0) {
                mCurrentLevel = nLevel;
                
                // Call iConsole to show ads
                this.statusText = game.add.text(0,game.height - 32,"iConsole.ads.show{ type:levelstarted, level:(x) }");
                iConsole.ads.show( {
                   type: 'levelStarted',
                   level: nLevel
                } ).result( function() {    
                    // Change state to start the game once ad is complete
                    game.state.start('game');
                } );
            }
        }
    },
};