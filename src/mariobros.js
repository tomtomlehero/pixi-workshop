import {Application, Graphics, Assets, Sprite, Ticker} from "pixi.js";

(async() => {

    const app = new Application();
    await app.init({
        width: 1110,
        height: 360,
        // width: window.innerWidth,
        // height: window.innerHeight,
        // resizeTo: window,
        backgroundColor: 0xaaaaaa,
        // backgroundAlpha: 0.9,
        // antialias: true,
    });
    app.canvas.style.position = "absolute";
    document.body.appendChild(app.canvas);


    const backgroundTexture = await Assets.load("/img/background.png");
    console.log("w " + backgroundTexture.width + " (" + 2.4 * backgroundTexture.width + ")");
    console.log("h " + backgroundTexture.height + " (" + 2.4 * backgroundTexture.height + ")");
    const backgroundSprite = new Sprite({
        texture: backgroundTexture,
        scale: 2
        // anchor: 0.5,
        // position: { x: x, y: y }
    });
    console.log("w " + backgroundSprite.width);
    console.log("h " + backgroundSprite.height);


    const w = backgroundSprite.width;
    const h = backgroundSprite.height;

    const boxTexture = await Assets.load("/img/box.svg");
    const boxSprites = [
        BoxSprite(0.440 * w, 0.250 * h),
        BoxSprite(0.395 * w, 0.250 * h),
        BoxSprite(0.350 * w, 0.250 * h),
        BoxSprite(0.300 * w, 0.250 * h, -Math.PI / 12),
    ];
    // const boxSprite = BoxSprite(0,0);

    app.stage.addChild(backgroundSprite);

    boxSprites.forEach((box) => {
        app.stage.addChild(box);
    })



    let direction = 1;
    let speed = 5;

    // Ticker.targetFPMS = 0.006;

    let floppyTicker = new Ticker();
    // console.log(floppyTicker.deltaTime);
    // floppyTicker.speed = 1;
    floppyTicker.maxFPS = 10;
    // floppyTicker.minFPS = 1;
    floppyTicker.add(ticker => {
        // console.log("deltaTime=" + floppyTicker.deltaTime);
        // console.log("deltaMS=" + floppyTicker.deltaMS);
        // console.log("elapsedMS=" + floppyTicker.elapsedMS);
        // console.log("lastTime=" + floppyTicker.lastTime);
        // console.log("targetFPMS=" + Ticker.targetFPMS);
        // console.log("maxFPS=" + floppyTicker.maxFPS);
        // console.log("minFPS=" + floppyTicker.minFPS);
        // console.log("--------------------------------");

        // if (ticker.lastTime > 10000) {
        //     ticker.stop();
        // }
        if (boxSprites.y > 250) {
            direction = -1;
        }
        if (boxSprites.y <= 50) {
            direction = 1;
        }
        boxSprites.y += (100 / 1000) * ticker.deltaMS * direction;
        // floppySprite.rotation += 2 * Math.PI / 360;

        // if (floppyTicker.maxFPS < 60) {
        //     floppyTicker.maxFPS += 1;
        // }
    });

    // floppyTicker.start();

    window.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight': {
                boxSprites.x += 10;
                break;
            }
            case 'ArrowLeft': {
                boxSprites.x -= 10;
                break;
            }
            case 'ArrowUp': {
                boxSprites.y -= 10;
                break;
            }
            case 'ArrowDown': {
                boxSprites.y += 10; }
        }
    });



    function BoxSprite(x, y, r) {
        return new Sprite({
            texture: boxTexture,
            anchor: 0.5,
            scale: 2 / 2.4,
            rotation: r,
            position: { x: x, y: y }
        });
    }

})();


