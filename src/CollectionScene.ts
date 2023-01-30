import Phaser from 'phaser'
import eventsCenter from './EventsCenter'
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';


export default class collectionScene extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Image;
    collectionBG!: Phaser.GameObjects.Image;
    public nenesCollected: Record<string,string>;
    private colors: Array<string>;
    private hats: Array<string>;
    private neneImages: Phaser.GameObjects.Group;
    private neneText: Phaser.GameObjects.Group;
    private scrollPanel!: ScrollablePanel;
    rexUI: any;

    constructor(){
        super({key: 'collectionScene'});
        this.nenesCollected = {"":"vanilla nene"};
        this.colors = ["red","green","blue","purple"];
        this.hats = ["sunhat", "beanie","bucket-hat", "visor"];
        this.neneImages = new Phaser.GameObjects.Group(this);
        this.neneText = new Phaser.GameObjects.Group(this);
        //this.scrollPanel = new ScrollablePanel(this);
    }

    preload() {
        //Preloads the collection background image
        this.load.image("collectionBG", "assets/collectionBG.jpg");
        this.load.image("testingBG", "assets/background.png");
        this.load.image("backButton", "assets/backButton.png");
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        
    }

    create(){
        eventsCenter.on('update-nenes', this.updateNenes, this);
        //Displays the yellow background for the Collection Scene
        this.collectionBG=this.add.image(450, 300, "collectionBG");  
        this.collectionBG.ignoreDestroy = true;

        this.scrollPanel = this.rexUI.add.scrollablePanel({
            x: 450,
            y: 310,
            width: 800,
            height: 510,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xFFFFE0),

            panel: {
                child: this.rexUI.add.fixWidthSizer({
                    space: {
                        left: 3,
                        right: 3,
                        top: 3,
                        bottom: 3,
                        item: 8,
                        line: 8,
                    }
                }),

                mask: {
                    padding: 1
                },
            },

            //scroller: true,
            
            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xFDD23C),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xfceea7),
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()
            .drawBounds(this.add.graphics(), 0x654321);


        this.scrollPanel.setInteractive();

    
        this.scrollPanel.on('dragstart', function () {
            console.log('scrollPanel.dragstart')
        });
        this.scrollPanel.on('dragend', function () {
            console.log('scrollPanel.dragend')
        });
    


        this.updatePanel();

        //Displays the back button
        //When the back button is clicked, it returns to the Game Scene 
        this.backButton=this.add.image(70, 70, "backButton")
        .setInteractive();
        this.backButton.ignoreDestroy = true;

        this.backButton.on("pointerover",() =>{
            this.backButton.setAlpha(1);
        });
        this.backButton.on("pointerout", ()=>{
            this.backButton.setAlpha(0.7);
        });
        this.backButton.on('pointerdown', ()=>this.goToGameScene());
        this.add.text(375,20,"Collection",{ font: '36px Courier', color: '#000000', align: 'center'});
        
        //Displays the names of the nenes
        this.loadInNenes();
      
    }

    
    public updatePanel() {
        //const sizer = this.scrollPanel
        //const myScene = this.scrollPanel.scene;
    
        //this.scrollPanel.clear(true);

        //const lines = content.split('\n');

        this.scrollPanel.clear(true)
        let x = -10;
        let y = 150;
        console.log(this.nenesCollected);

        Object.keys(this.nenesCollected).sort().forEach( (desc: string) => {
            console.log(desc);
            [x, y] = this.increment(x, y);
            let foundColor = false; 
            this.colors.forEach( (color) => {
                if (desc.includes(color)) {
                    foundColor = true;
                    this.scrollPanel.add(
                        (this.add.image(x,y, "nene-" + color).setScale(0.75)));
                    
                }           
            });
            if (!foundColor) {
                this.scrollPanel.add(
                    (this.add.image(x,y,"nene").setScale(0.75)));
            }
            this.hats.forEach( (hat) => {
                if (desc.includes(hat)) {
                    foundColor = true;
                    this.scrollPanel.add(
                        (this.add.image(x,y, "nene-"+hat).setScale(0.75)));
                }           
            });
            this.scrollPanel.add(
                (this.add.text(x-50, y+100, this.nenesCollected[desc], { font: '16px Courier', color: '#000000' })));
        }

        );
    }




//Here
/*
var sizer = panel.getElement('panel');
    var scene = panel.scene;

    sizer.clear(true);
    var lines = content.split('\n');
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var words = lines[li].split(' ');
        for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
            sizer.add(
                scene.add.text(0, 0, words[wi], {
                    fontSize: 18
                })
                    .setInteractive()
                    .on('pointerdown', function () {
                        this.scene.print.text = this.text;
                        this.setTint(Phaser.Math.Between(0, 0xffffff))
                    })
            );
        }
        if (li < (lcnt - 1)) {
            sizer.addNewLine();
        }
    }


    panel.layout();
    return panel;
    //hereeee
*/

    public updateNenes(currentNenes: Record<string,string>) {
        console.log(currentNenes);
        this.nenesCollected = currentNenes;
        this.updatePanel();
    }

    //Function that displays the names of the nenes
    /*private displayNames(userNames: Array<string>) {
        for(let i = 0; i<userNames.length; i++){
            
        }
    }*/

    //Function that handles changing the scene to the Game Scene
    private goToGameScene(){
        this.scene.wake("GameScene")
        
    }

    private loadInNenes() {
        this.neneImages.clear(true);
        this.neneText.clear(true);
        let x = -10;
        let y = 150;
        console.log(this.nenesCollected);

        Object.keys(this.nenesCollected).sort().forEach( (desc: string) => {
            console.log(desc);
            [x, y] = this.increment(x, y);
            let foundColor = false; 
            this.colors.forEach( (color) => {
                if (desc.includes(color)) {
                    foundColor = true;
                    this.neneImages.add(this.add.image(x,y, "nene-" + color).setScale(0.75));
                    
                }           
            });
            if (!foundColor) {
                this.neneImages.add(this.add.image(x,y,"nene").setScale(0.75));
            }
            this.hats.forEach( (hat) => {
                if (desc.includes(hat)) {
                    foundColor = true;
                    this.neneImages.add(this.add.image(x,y, "nene-"+hat).setScale(0.75));
                }           
            });
            this.neneText.add(this.add.text(x-50, y+100, this.nenesCollected[desc], { font: '16px Courier', color: '#000000' }));
        }

        );

    }

    private increment(x: number, y:number) {
        x = x + 170;
        if (x > 700) {
            x = 160;
            y = y+250;
        }
        return [x,y];
    }

}

