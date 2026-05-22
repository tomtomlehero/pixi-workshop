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

  const scale = 2;

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
    BoxSprite("box-5", 0.154, 0.142, 0.08 * Math.PI),
    BoxSprite("box-5", 0.108, 0.154, -0.06 * Math.PI),
    BoxSprite("box-5", 0.101, 0.246),
    BoxSprite("box-5", 0.101, 0.320),
    BoxSprite("box-5", 0.101, 0.394),
    BoxSprite("box-5", 0.101, 0.472),
    BoxSprite("box-5", 0.142, 0.246),
    BoxSprite("box-5", 0.142, 0.320),
    BoxSprite("box-5", 0.142, 0.394),
    BoxSprite("box-5", 0.142, 0.472),
  ];

  const marioAssets = await Assets.load([
    {alias: "mario-0", src: "/img/mario.svg"},
    {alias: "mario-1", src: "/img/mario.svg"},
    {alias: "mario-2", src: "/img/mario.svg"},
    {alias: "mario-3", src: "/img/mario.svg"},
    {alias: "mario-4", src: "/img/mario.svg"},
    {alias: "mario-5", src: "/img/mario.svg"},
    {alias: "luigi-0", src: "/img/mario.svg"},
    {alias: "luigi-1", src: "/img/mario.svg"},
    {alias: "luigi-2", src: "/img/mario.svg"},
    {alias: "luigi-3", src: "/img/mario.svg"},
    {alias: "luigi-4", src: "/img/mario.svg"},
    {alias: "luigi-5", src: "/img/mario.svg"},
  ]);

  const marioSprites = [
    MarioSprite("mario-0", 0.770, 0.830),
    MarioSprite("mario-1", 0.750, 0.830),
    MarioSprite("mario-2", 0.750, 0.586),
    MarioSprite("mario-3", 0.750, 0.566),
    MarioSprite("mario-4", 0.750, 0.318),
    MarioSprite("mario-5", 0.750, 0.298),
    MarioSprite("luigi-0", 0.250, 0.730),
    MarioSprite("luigi-1", 0.250, 0.720),
    MarioSprite("luigi-2", 0.250, 0.470),
    MarioSprite("luigi-3", 0.250, 0.450),
    MarioSprite("luigi-4", 0.250, 0.185),
    MarioSprite("luigi-5", 0.230, 0.185),
  ];

  app.stage.addChild(backgroundSprite);

  boxSprites.forEach((box) => {
    app.stage.addChild(box);
  })

  marioSprites.forEach((mario) => {
    app.stage.addChild(mario);
  })


  let n = 0;
  const boxes = [];

  let floppyTicker = new Ticker();

  floppyTicker.add(ticker => {
    n++;
    // console.log("-- #" + n + "--");
    changeRate(ticker);
    pushNewBox();
    moveBoxes();
    displayBoxes();
  });


  function changeRate(ticker) {
    if ((n - 1) % 10 === 0 && n < 2) {
      // const fps = 4 + (n / 10) / 2.0;
      const fps = 5;
      console.log("INCREASING RATE: " + fps + " FPS");
      ticker.maxFPS = fps;
    }
  }

  function pushNewBox() {
    if ((n - 1) % 10 === 0) {
      boxes.push(new Box());
    }
  }

  function displayBoxes() {
    for (let sprite of boxSprites) {
      sprite.visible = false;
    }
    for (let box of boxes) {
      boxSprites[box.pos].visible = true;
    }
  }

  function moveBoxes() {
    for (let box of boxes) {
      if (box.pos <= 42) {
        box.pos++;
        if (box.pos === 42) {
          ship(box);
        }
      }
    }
  }

  const shipmentRow1 = [45, 46, 47, 48];
  const shipmentRow2 = [49, 50, 51, 52];
  let lastShippedPos = 0;

  function ship(box) {

    let shipmentRow;
    if (shipmentRow2.includes(lastShippedPos) || lastShippedPos === 0) {
      shipmentRow = 1;
    } else if (shipmentRow1.includes(lastShippedPos)) {
      shipmentRow = 2;
    }
    let shipmentTicker = new Ticker();
    shipmentTicker.maxFPS = 3;
    shipmentTicker.add(ticker => {

      if (shipmentRow === 1) {

        if ((box.pos >= 45 && box.pos === lastShippedPos - 5) || box.pos === 48) {
          lastShippedPos = box.pos;
          ticker.stop();
        } else {
          box.pos++;
        }

      } else if (shipmentRow === 2) {
        if (box.pos >= 49 && box.pos === lastShippedPos + 4) {
          lastShippedPos = box.pos;
          ticker.stop();
        } else if (box.pos === 43) {
          box.pos = 49;
        } else {
          box.pos++;
        }
      }

    if (lastShippedPos === 49) {
        // TODO end of shipment batch
      lastShippedPos = 0;
      for (let box of boxes) {
        if (box.pos >= 45) {
          boxes.pop();
          boxes.pop();
          boxes.pop();
          boxes.pop();
          boxes.pop();
          boxes.pop();
          boxes.pop();
          boxes.pop();
        }
      }

      console.log("END OF SHIPMENT BATCH");
    }

      displayBoxes();

    });
    shipmentTicker.start();
  }


  function displayMarioAndLuigi() {
    for (let sprite of marioSprites) {
      sprite.visible = false;
    }
    marioSprites[marioPosition].visible = true;
    marioSprites[luigiPosition].visible = true;
  }

  let marioPosition = 2;
  let luigiPosition = 6;

  displayMarioAndLuigi();

  floppyTicker.start();

  window.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'a': {
        if (luigiPosition === 6) {
          luigiPosition = 8;
        } else if (luigiPosition === 8) {
          luigiPosition = 10;
        }
        break;
      }

      case 's': {
        if (luigiPosition === 10) {
          luigiPosition = 8;
        } else if (luigiPosition === 8) {
          luigiPosition = 6;
        }
        break;
      }

      case 'p': {
        if (marioPosition === 0) {
          marioPosition = 2;
        } else if (marioPosition === 2) {
          marioPosition = 4;
        }
        break;
      }

      case 'l': {
        if (marioPosition === 4) {
          marioPosition = 2;
        } else if (marioPosition === 2) {
          marioPosition = 0;
        }
        break;
      }
    }

    displayMarioAndLuigi();
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


  function MarioSprite(mario, x, y, r) {
    return MarioSprite_(marioAssets[mario], x, y, r)
  }

  function MarioSprite_(texture, x, y, r) {
    return new Sprite({
      texture: texture,
      alpha: 0.5,
      anchor: 0.5,
      scale: scale / 0.9,
      // rotation: r,
      visible: false,
      position: {x: x * backgroundSprite.width, y: y * backgroundSprite.height}
    });
  }


  class Box {
    constructor() {
      this.pos = 35;
    }
  }


  function logTickerInfo(ticker) {
    const currentTime = performance.now();
    const timeSinceLastFrame = currentTime - ticker.lastTime;
    console.log(`Time since last frame: ${timeSinceLastFrame}ms`);

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
