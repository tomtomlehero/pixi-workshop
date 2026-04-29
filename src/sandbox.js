import {Application, Graphics, Assets, Sprite, Ticker} from "pixi.js";

(async() => {

    const app = new Application();
    await app.init({
        // width: 800,
        // height: 600,
        // width: window.innerWidth,
        // height: window.innerHeight,
        resizeTo: window,
        backgroundColor: 0x000000,
        backgroundAlpha: 0.9,
        // antialias: true,
    });
    app.canvas.style.position = "absolute";
    document.body.appendChild(app.canvas);

    const floppyTexture = await Assets.load("/img/floppy.svg");
    const floppySprite = new Sprite(floppyTexture);
    floppySprite.anchor.set(0.5);
    floppySprite.position.set(50, 50);

    app.stage.addChild(floppySprite);
    let direction = 1;
    let speed = 5;


    let floppyTicker = new Ticker();
    floppyTicker.add(ticker => {
        // console.log(ticker.lastTime);
        if (ticker.lastTime > 5000) {
            ticker.stop();
        }
        if (floppySprite.y > 500) {
            direction = -1;
        }
        if (floppySprite.y < 50) {
            direction = 1;
        }
        floppySprite.y += speed * direction;
        floppySprite.rotation += 2 * Math.PI / 360;
    });

    floppyTicker.start();

    window.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight': {
                floppySprite.x += 10;
                break;
            }
            case 'ArrowLeft': {
                floppySprite.x -= 10;
                break;
            }
            case 'ArrowUp': {
                floppySprite.y -= 10;
                break;
            }
            case 'ArrowDown': {
                floppySprite.y += 10; }
        }
    });


})();