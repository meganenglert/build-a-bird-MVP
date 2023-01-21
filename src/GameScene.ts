import Phaser from 'phaser'
import Shop from './components/Shop'
import Tutorial from './components/Tutorial'
import Questions from './components/Questions'
import DisplayArea from './components/DisplayArea'
import DragAndDrop from './components/DragAndDrop'

export default class GameScene extends Phaser.Scene {
	private background?: Phaser.GameObjects.Image;

    // Holds coin management system
    // Populates left side of screen with different purchasables
    private shop?: Shop;

    // Pop up with game instructions
    // Not for MVP but probably some hints will go in here too
    private tutorial?: Tutorial;

    // Question pop ups
    // Also processes question data and displays
    private questions?: Questions;

    // Where the different objects are displayed / stacked
    private displayArea?: DisplayArea;

    // Drag and drop components 
    // The "machine" or whatever we're calling it
    // Where the attribute values go
    private dragAndDrop?: DragAndDrop;

    constructor() {
		super('hello-world')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')
		this.load.image('bg', 'assets/background.png')
        this.load.image('color', 'assets/Colorwheel.png')
    
		//this.load.image('logo', 'assets/sprites/phaser3-logo.png')
		//this.load.image('red', 'assets/particles/red.png')
        
        //this.load.image('background', 'assets/background-V0.png')

        
	}

	create() {
        this.background = this.add.image(450, 300,'bg')
        this.background.displayHeight = 600
        this.background.displayWidth = 900
        
        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.shop = new Shop(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.displayArea = new DisplayArea(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.dragAndDrop = new DragAndDrop(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.questions = new Questions(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.tutorial = new Tutorial(this);


		//const particles = this.add.particles('red')

		/*const emitter = particles.createEmitter({
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
		})

		const logo = this.physics.add.image(400, 100, 'logo')

		logo.setVelocity(100, 200)
		logo.setBounce(1, 1)
		logo.setCollideWorldBounds(true)

		emitter.startFollow(logo)*/
	}
}