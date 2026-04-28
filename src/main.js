import {Application, Graphics, Assets, Sprite} from "pixi.js";

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

    const c = new Graphics()
        .circle(200, 200, 50)
        .fill({
            color: 0x0000ff,
            alpha: 0.7})
        .stroke({
            width: 6,
            color: 0xff0000,
            alpha: 0.7});
    app.stage.addChild(c);

    const floppyTexture = await Assets.load("/img/floppy.svg");
    const floppySprite = new Sprite(floppyTexture);
    floppySprite.anchor.set(0.5);
    floppySprite.position.set(50, 50);
    // floppySprite.scale.set(2);
    // floppySprite.width = 100;
    // floppySprite.rotation = Math.PI / 4;

    app.stage.addChild(floppySprite);


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