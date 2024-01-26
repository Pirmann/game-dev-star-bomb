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
        this.load.image('ground',ground)
        this.load.image('star',star)
        this.load.image('bomb',bomb)

        this.load.spritesheet('monkey', monkey,{
            frameHeight: 48,
            frameWidth: 32
        })
    }
      
    create ()
    {
        // create sky
        this.add.image(400,300,'sky')

        // group for platforms
        const platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, 'ground')
            .setScale(2).refreshBody()
        platforms.create(600, 400, 'ground')
        platforms.create(50, 250, 'ground')
        platforms.create(750, 220, 'ground')


        // add player
        this.player = this.physics.add.sprite(100, 450, 'monkey')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

        this.physics.add.collider(this.player, platforms)

        this.anims.create({
            key: 'stay',
            frames: [{
                key: 'monkey',
                frame: 4
            }]
        })

        //walking
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('monkey', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('monkey', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
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
