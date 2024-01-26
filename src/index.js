import Phaser from 'phaser';
import sky from './assets/sky.png'
import ground from './assets/platform.png'
import star from './assets/star.png'
import bomb from './assets/bomb.png'
import monkey from './assets/dude.png'

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // load images
        this.load.image('sky',sky)
    }
      
    create ()
    {
        // create sky
        this.add.image(400,300,'sky')
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 450},
            debug: true
        }
    },
    width: 800,
    height: 600,
    scene: MyGame

};

const game = new Phaser.Game(config);
