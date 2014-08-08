/**
 * Basic dialog class
 */
 
function Dialog(txt, dRows, okPressed) {
    this.x = (game.width - 500)/2;
    this.y = (game.height - 300) / 2;
    this.background = game.add.sprite(this.x,this.y,'dialog');
    this.title = game.add.text(this.x,this.y,txt, { font: "32px helvetica", fill: "#ffffff"});
    this.text = new Array(dRows);
    this.okPressed = okPressed;
    for(i = 0 ; i < dRows ; i++) {
        this.text[i] = game.add.text(this.x,this.y+40+(i*32), "..", { font: "24px helvetica", fill: "#ffffff"});
    }
}

Dialog.prototype.destroy = function() {
    this.background.kill();
    game.world.remove(this.title);
    for(i = 0 ; i < this.text.length ; i++) {
        game.world.remove(this.text[i]);
    }
    if(this.goButton) {
        this.goButton.destroy();
    }
};

Dialog.prototype.setRowText = function(row, txt) {
    this.text[row].text = txt;
};

Dialog.prototype.showOk = function() {
    this.goButton = new Button(this.x, this.y + 300 - 32,300,32, "Ok");
};

Dialog.prototype.update = function() {
    if(this.goButton) {
        if(game.input.activePointer.isDown) {
            if(Phaser.Rectangle.contains(this.goButton.rect,game.input.x,game.input.y) && !this.goButton.isDown) {
                this.goButton.isDown = true;
            }
        }
        if(game.input.activePointer.isUp) {
            if(Phaser.Rectangle.contains(this.goButton.rect,game.input.x,game.input.y) && this.goButton.isDown) {
                this.goButton.isDown = false;
                this.okPressed();
            }
        }
    }
    //this.okPressed();
};