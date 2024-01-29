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

        const stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY:{x:11,y:0,stepX: 70}
        })
        
        stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8))
        })
        
        this.physics.add.collider(stars,platforms)


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
        const scoreText = this.add.text(15,15,'score : 0',{
            fontSize: '40px',
            fill: '#000'
        })
        let score = 0



        function collect(player, star){
            star.disableBody(true, true)
            score = score +1

            scoreText.setText('score: ' + score)

            if (stars.countActive(true)===0){
                stars.children.iterate(function(child){
                    child.enableBody(true, child.x, 0,true,true)
                })


            }

        }

        this.physics.add.overlap(this.player,stars,collect,null,this)

        function bombTouched(player, bomb){
            this.physics.pause()
            this.player.setTint(0xff0000)
            this.player.anims.play('stay')
        }

        const bombs = this.physics.add.group()
        this.physics.add.collider(bombs,platforms)
        this.physics.add.collider(this.player, bombs, bombTouched, true, this)





    }
    update() {
        const cursors = this.input.keyboard.createCursorKeys()
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        if(spaceKey.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-450)
        }

        else if(cursors.left.isDown){
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
        }
        else if(cursors.right.isDown){
            this.player.setVelocityX(160)
            this.player.anims.play('right', true)
        }
        else if(cursors.down.isDown){
            this.player.setVelocityY(500)
        }
        else{
            this.player.setVelocityX(0)
            this.player.anims.play('stay')
        }
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
