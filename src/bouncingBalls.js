import {Application, Graphics, Sprite} from "pixi.js";

(async() => {

    const app = new Application();
    await app.init({
        resizeTo: window,
        backgroundColor: 0x000000,
    });
    document.body.appendChild(app.canvas);

    const graphics = new Graphics().circle(0, 0, 5).fill(0xffffff);
    const texture = app.renderer.generateTexture(graphics);

    const particles = [];
    const totalParticles = 5000;

    for (let i = 0; i < totalParticles; i++) {
        const sprite = new Sprite(texture);
        sprite.x = Math.random() * app.screen.width;
        sprite.y = Math.random() * app.screen.height;
        sprite.tint = Math.random() * 0xffffff;

        sprite.speedX = (Math.random() - 0.5) * 2;
        sprite.speedY = (Math.random() - 0.5) * 2;

        app.stage.addChild(sprite);
        particles.push(sprite);
    }

    app.ticker.add(() => {
        for (let i = 0; i < totalParticles; i++) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > app.screen.width) p.speedX *= -1;
            if (p.y < 0 || p.y > app.screen.height) p.speedY *= -1;
        }
    });
})();