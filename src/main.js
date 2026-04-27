import {Application} from "pixi.js";

(async() => {

    const app = new Application();
    await app.init({
        // width: 800,
        // height: 600,
        // width: window.innerWidth,
        // height: window.innerHeight,
        resizeTo: window,
        backgroundColor: 0x00ff,
        backgroundAlpha: 0.8,
    });
    // app.canvas.style.position = "absolute";
    document.body.appendChild(app.canvas);

})();