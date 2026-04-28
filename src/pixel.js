import {Application, Graphics} from "pixi.js";

(async() => {

    const app = new Application();
    await app.init({
        resizeTo: window,
        backgroundColor: 0x000000,
        backgroundAlpha: 0.9,
    });
    document.body.appendChild(app.canvas);

    for (let i = 0; i < app.screen.width; i++) {
        for (let j = 0; j < app.screen.height; j++) {
            const px = new Graphics()
                .rect(i, j, 1, 1).fill(Math.random() * 0xFFFFFF);
            app.stage.addChild(px);
        }
    }

})();