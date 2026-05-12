import {Application, Graphics, Assets, Sprite, Ticker} from "pixi.js";

(async() => {

    const app = new Application();
    await app.init({
        width: 800,
        height: 600,
        // width: window.innerWidth,
        // height: window.innerHeight,
        // resizeTo: window,
        backgroundColor: 0xaaaaaa,
        backgroundAlpha: 0.9,
        // antialias: true,
    });
    app.canvas.style.position = "absolute";
    document.body.appendChild(app.canvas);

    const boxTexture = await Assets.load("/img/box.svg");
    const boxSprite = BoxSprite(150, 100);

    app.stage.addChild(boxSprite);



    let direction = 1;
    let speed = 5;

    // Ticker.targetFPMS = 0.006;

    let floppyTicker = new Ticker();
    // console.log(floppyTicker.deltaTime);
    // floppyTicker.speed = 1;
    floppyTicker.maxFPS = 10;
    // floppyTicker.minFPS = 1;
    floppyTicker.add(ticker => {
        console.log("deltaTime=" + floppyTicker.deltaTime);
        console.log("deltaMS=" + floppyTicker.deltaMS);
        console.log("elapsedMS=" + floppyTicker.elapsedMS);
        console.log("lastTime=" + floppyTicker.lastTime);
        console.log("targetFPMS=" + Ticker.targetFPMS);
        console.log("maxFPS=" + floppyTicker.maxFPS);
        console.log("minFPS=" + floppyTicker.minFPS);
        console.log("--------------------------------");

        // if (ticker.lastTime > 10000) {
        //     ticker.stop();
        // }
        if (boxSprite.y > 250) {
            direction = -1;
        }
        if (boxSprite.y <= 50) {
            direction = 1;
        }
        boxSprite.y += (100 / 1000) * ticker.deltaMS * direction;
        // floppySprite.rotation += 2 * Math.PI / 360;

        // if (floppyTicker.maxFPS < 60) {
        //     floppyTicker.maxFPS += 1;
        // }
    });

    floppyTicker.start();

    window.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight': {
                boxSprite.x += 10;
                break;
            }
            case 'ArrowLeft': {
                boxSprite.x -= 10;
                break;
            }
            case 'ArrowUp': {
                boxSprite.y -= 10;
                break;
            }
            case 'ArrowDown': {
                boxSprite.y += 10; }
        }
    });



    function BoxSprite(x, y) {
        return new Sprite({
            texture: boxTexture,
            anchor: 0.5,
            position: { x: x, y: y }
        });
    }

})();


