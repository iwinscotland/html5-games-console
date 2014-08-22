/**
 * Startup initialisation of phaser + game etc
 */
 
/** Data */
var game = null;
var globalGameData = { bestScore: 0 };

initialise = function() {
    // Enable this section to enable resizing of Phaser.io.
    /*window.onresize = function(event) {
        // Fetch the width/height of the games container via iConsole calls, as the game will not be initially displayed
        // and this causes window.* to return 0, whereas these calls will return you the current width/height that the
        // game is or will be displayed in (if the game has yet to be displayed)
        var width = iConsole.game.getWidth();
        var height = iConsole.game.getHeight();
        //gameScaler = new Phaser.ScaleManager(game, width, height);

        game.width = width;
        game.height = height;
        game.stage.bounds.width = game.width;
        game.stage.bounds.height = game.height;

        if (game.renderType === Phaser.WEBGL) {
            game.renderer.resize(width, height);
        }
    };
    game = new Phaser.Game(width, height, Phaser.AUTO, '');
    */

    // Else just Initialise Phaser with these settings
    game = new Phaser.Game(800,600, Phaser.AUTO, '');
    
    // Initialise iConsole, must be done right at the start before anything,
    // On completion this will launch the menu state
    iConsole.game.ready().result( function() {
        game.state.start('menu');
    });		
    
    // And finally we tell Phaser to add states then to start our 'main' state
    game.state.add('splash', splashState);
    game.state.add('menu', menuState);
    game.state.add('game', gameState);
    
    // And to start with the 'splash' state
    game.state.start('splash');	
};
