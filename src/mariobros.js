import {Application, Graphics, Assets, Texture, Sprite, Ticker, Rectangle} from "pixi.js";

(async () => {

  const app = new Application();
  await app.init({
    // width: 1110,
    // height: 360,
    backgroundColor: 0xaaaaaa,
    resizeTo: window,
  });
  app.canvas.style.position = "absolute";
  document.body.appendChild(app.canvas);

  const scale = 2.4;

  const backgroundTexture = await Assets.load("/img/background.png");
  const backgroundSprite = new Sprite({
    texture: backgroundTexture,
    scale: scale
  });

  const boxAssets = await Assets.load([
    {alias: "box-0", src: "/img/box-0.svg"},
    {alias: "box-1", src: "/img/box-1.svg"},
    {alias: "box-2", src: "/img/box-2.svg"},
    {alias: "box-3", src: "/img/box-3.svg"},
    {alias: "box-4", src: "/img/box-4.svg"},
    {alias: "box-5", src: "/img/box-5.svg"}]);


  const boxSprites = [
    BoxSprite("box-0", 0.928, 0.774),
    BoxSprite("box-0", 0.883, 0.774),
    BoxSprite("box-0", 0.834, 0.776, -0.12 * Math.PI),
    BoxSprite("box-0", 0.686, 0.774),
    BoxSprite("box-0", 0.638, 0.774),
    BoxSprite("box-0", 0.592, 0.774),
    BoxSpriteL(14, "box-0", 0.556, 0.774),
    BoxSprite("box-1", 0.440, 0.774),
    BoxSprite("box-1", 0.392, 0.774),
    BoxSprite("box-1", 0.344, 0.774),
    BoxSprite("box-1", 0.296, 0.776, -0.12 * Math.PI),
    BoxSprite("box-1", 0.318, 0.642),
    BoxSprite("box-1", 0.364, 0.642),
    BoxSprite("box-1", 0.412, 0.642),
    BoxSpriteL(14, "box-1", 0.454, 0.642),
    BoxSprite("box-2", 0.566, 0.642),
    BoxSprite("box-2", 0.612, 0.642),
    BoxSprite("box-2", 0.658, 0.642),
    BoxSprite("box-2", 0.706, 0.644, 0.12 * Math.PI),
    BoxSprite("box-2", 0.685, 0.508),
    BoxSprite("box-2", 0.640, 0.508),
    BoxSprite("box-2", 0.592, 0.508),
    BoxSpriteL(18, "box-2", 0.554, 0.508),
    BoxSprite("box-3", 0.442, 0.508),
    BoxSprite("box-3", 0.395, 0.508),
    BoxSprite("box-3", 0.347, 0.508),
    BoxSprite("box-3", 0.300, 0.510, -0.12 * Math.PI),
    BoxSprite("box-3", 0.321, 0.382),
    BoxSprite("box-3", 0.367, 0.382),
    BoxSprite("box-3", 0.414, 0.382),
    BoxSpriteL(14, "box-3", 0.454, 0.382),
    BoxSprite("box-4", 0.568, 0.382),
    BoxSprite("box-4", 0.614, 0.382),
    BoxSprite("box-4", 0.660, 0.382),
    BoxSprite("box-4", 0.710, 0.384, 0.12 * Math.PI),
    BoxSprite("box-4", 0.688, 0.246),
    BoxSprite("box-4", 0.643, 0.246),
    BoxSprite("box-4", 0.597, 0.246),
    BoxSpriteL(16, "box-4", 0.556, 0.246),
    BoxSprite("box-5", 0.442, 0.246),
    BoxSprite("box-5", 0.396, 0.246),
    BoxSprite("box-5", 0.349, 0.246),
    BoxSprite("box-5", 0.298, 0.248, -0.1 * Math.PI),
    BoxSprite("box-5", 0.108, 0.154, -0.06 * Math.PI),
    BoxSprite("box-5", 0.154, 0.142, 0.08 * Math.PI),
    BoxSprite("box-5", 0.101, 0.246),
    BoxSprite("box-5", 0.142, 0.246),
    BoxSprite("box-5", 0.101, 0.320),
    BoxSprite("box-5", 0.142, 0.320),
    BoxSprite("box-5", 0.101, 0.394),
    BoxSprite("box-5", 0.142, 0.394),
    BoxSprite("box-5", 0.101, 0.472),
    BoxSprite("box-5", 0.142, 0.472),
  ];

  app.stage.addChild(backgroundSprite);

  boxSprites.forEach((box) => {
    app.stage.addChild(box);
  })


  let floppyTicker = new Ticker();
  floppyTicker.maxFPS = 1;

  // floppyTicker.add(ticker => {
  //   logTickerInfo(ticker);
  // });

  let n = 0;
  floppyTicker.add(ticker => {
    console.log("N #" + ++n);
    if (n % 10 === 0 && n < 100) {
      const fps = 1 + (n / 10) / 2.0;
      console.log("INCREASING FPS: " + fps);
      ticker.maxFPS = fps;
    }
  });

  const boxes = [];

  floppyTicker.add(ticker => {
    if ((n + 1) % 10 === 0) {
      boxes.push(new Box());
    }

    for (let sprite of boxSprites) {
      sprite.visible = false;
    }


    for (let box of boxes) {
      boxSprites[box.pos].visible = true;
      box.pos++;
    }

  });


    floppyTicker.start();

  window.addEventListener('keydown', function (e) {
    switch (e.key) {
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
        boxSprites.y += 10;
      }
    }
  });

  function BoxSprite(box, x, y, r) {
    return BoxSprite_(boxAssets[box], x, y, r)
  }

  function BoxSprite_(texture, x, y, r) {
    return new Sprite({
      texture: texture,
      alpha: 0.5,
      anchor: 0.5,
      scale: scale / 2.35,
      rotation: r,
      visible: false,
      position: {x: x * backgroundSprite.width, y: y * backgroundSprite.height}
    });
  }

  function BoxSpriteL(crop, box, x, y, r) {
    const texture = boxAssets[box];
    const croppedTexture = new Texture({
      source: texture.source,
      frame: new Rectangle(
        crop,
        0,
        texture.width - crop,
        texture.height
      )
    });
    return BoxSprite_(croppedTexture, x, y, r)
  }

  class Box {
    constructor() {
      this.pos = 0;
    }
  }


  function logTickerInfo(ticker) {
    console.log("speed=" + ticker.speed);
    console.log("deltaTime=" + ticker.deltaTime);
    console.log("deltaMS=" + ticker.deltaMS);
    console.log("elapsedMS=" + ticker.elapsedMS);
    console.log("lastTime=" + ticker.lastTime);
    console.log("targetFPMS=" + Ticker.targetFPMS);
    console.log("maxFPS=" + ticker.maxFPS);
    console.log("minFPS=" + ticker.minFPS);
    console.log("--------------------------------");
  }

})();
