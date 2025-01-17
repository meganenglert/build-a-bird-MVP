import Phaser from 'phaser'

export default class titleScene extends Phaser.Scene {
    startButton!: Phaser.GameObjects.Image;
    easyButton!:Phaser.GameObjects.Image;
    hardButton!:Phaser.GameObjects.Image;
    mute!:Phaser.GameObjects.Image;
    unmute!:Phaser.GameObjects.Image;
    cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar!: Phaser.Input.Keyboard.Key;
    music!: Phaser.Sound.BaseSound;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    titleText?: Phaser.GameObjects.Text
    declare add: any;
    declare input: any;
    declare scale: any;
    public difficulty!: Array<string>;
    nene: any;
    
    

    constructor() {
        super({ key: 'titleScene' });
        this.difficulty=[];
      }
      preload()
      {
        this.load.image('titleScreen','assets/titleScene.jpg')
        //Loads Title words
        this.load.image('title','assets/title.png')
        this.load.image('titleStart','assets/startButton.png')
        this.load.image('easyButton','assets/easy.png')
        this.load.image('hardButton','assets/hard.png')
        this.load.image('mute','assets/unmute.png')
        this.load.image('unmute','assets/mute.png')
        this.load.image('bigNene','assets/neneTitle.png')
        this.load.audio('summerFun','assets/summerFun.mp3')
        

        
      }
    
    create(){
        //load in music
        this.music = this.sound.add("summerFun", { loop: true });
        this.music.play()
        
       
        //background
        this.add.image(400,300,'titleScreen');

        
       

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        //Title Words
        this.add.image(430,100,'title');
        //Add NeNe
        this.add.image(430,400,'bigNene');
       
        
        //Easy difficulty selection
        this.easyButton=this.add.image(195,470,'easyButton')
        this.easyButton.setVisible(false)
        this.easyButton.setAlpha(.7);
        this.easyButton.setInteractive();
        this.easyButton.on("pointerover",() =>{
            this.easyButton.setAlpha(1);
        });
        this.easyButton.on("pointerout", ()=>{
            this.easyButton.setAlpha(.7);
        });
        this.easyButton.on("pointerup",()=>{
            this.titleText?.setVisible(false)
            this.easyButton?.setVisible(false)
            this.scene.stop('titleScene').launch('GameScene');
        })
        
         //Hard difficulty selection
         this.hardButton=this.add.image(748,470,'hardButton')
         this.hardButton.setVisible(false)
         this.hardButton.setAlpha(.7);
         this.hardButton.setInteractive();
         this.hardButton.on("pointerover",() =>{
             this.hardButton.setAlpha(1);
         });
         this.hardButton.on("pointerout", ()=>{
             this.hardButton.setAlpha(.7);
         });
         this.hardButton.on("pointerup",()=>{
             this.titleText?.setVisible(false)
             this.hardButton?.setVisible(false)
             this.difficulty.push("true");
             console.log(this.difficulty[0])
             this.scene.stop('titleScene').launch('GameScene',this.difficulty);
         })
        

        
         this.unmute=this.add.image(860,560,'unmute')
         this.unmute.setVisible(false)
         this.unmute.setAlpha(.7);
         this.unmute.setInteractive();
         this.unmute.on("pointerover",() =>{
             this.unmute.setAlpha(1);
         });
         this.unmute.on("pointerout", ()=>{
             this.unmute.setAlpha(.7);
         });
         this.unmute.on("pointerup",()=>{
             this.unmute?.setVisible(false)
             this.mute?.setVisible(true)
             this.music.resume()
         })
        
    
        
        
        //create startButton
        this.startButton = this.add.image(430, 470, 'titleStart');
        this.startButton.setTint(0xffffff)
        this.startButton.setAlpha(.7);
        this.startButton.setInteractive();
        this.startButton.on("pointerover",() =>{
            this.startButton.setAlpha(1);
        });
        this.startButton.on("pointerout", ()=>{
            this.startButton.setAlpha(.7);
        });
        this.startButton.on("pointerup",()=>{
            
            this.startButton?.setVisible(false)
            this.easyButton?.setVisible(true)
            this.hardButton?.setVisible(true)
        })
        //Mute
       this.mute=this.add.image(860,560,'mute')
       this.mute.setAlpha(.7);
       this.mute.setInteractive();
        this.mute.on("pointerover",() =>{
            this.mute.setAlpha(1);
        });
        this.mute.on("pointerout", ()=>{
            this.mute.setAlpha(.7);
        });
       this.mute.on("pointerup",()=>{
        this.mute?.setVisible(false)
        this.unmute?.setVisible(true)
        this.music.pause()
        })
    }
}