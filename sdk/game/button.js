/**
 * Button Class
 */
 
function Button(x,y,w,h,text) {
    this.rect = new Phaser.Rectangle(x,y,w,h);
    this.isDown = false;
    this.text = game.add.text(x,y,text, { font: "32px helvetica", fill: "#ffffff"});
}

Button.prototype.destroy = function() {
    game.world.remove(this.text);
};