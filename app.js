document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 50;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;

  const createDoodler = () => {
    doodler.classList.add("doodler");
    grid.appendChild(doodler);
    doodlerLeftSpace = platforms[0].leftSpacing;
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  };

  class Platform {
    constructor(newPlatformBottom) {
      this.bottomSpacing = newPlatformBottom;
      this.leftSpacing = Math.random() * 315;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.bottom = `${this.bottomSpacing}px`;
      visual.style.left = `${this.leftSpacing}px`;

      grid.appendChild(visual);
    }
  }

  const createPlatforms = () => {
    for (let i = 0; i < platformCount; i++) {
      let platformSpacing = 600 / platformCount;
      let newPlatformBottom = 100 + i * platformSpacing;
      let newPlatform = new Platform(newPlatformBottom);
      platforms.push(newPlatform);
      console.log(platforms);
    }
  };

  const movePlatforms = () => {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottomSpacing -= 4;
        let visual = platform.visual;
        visual.style.bottom = `${platform.bottomSpacing}px`;
      });
    }
  };

  const jump = () => {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  };

  const fall = () => {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 50;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottomSpacing &&
          doodlerBottomSpace <= platform.bottomSpacing + 15 &&
          doodlerLeftSpace + 60 >= platform.leftSpacing &&
          doodlerLeftSpace <= platform.leftSpacing + 85 &&
          !isJumping
        ) {
          console.log("landed");
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 300);
  };

  const gameOver = () => {
    console.log(`game over`);
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  };

  const showGameInfo = () => {
    console.log(`doodlerLeftSpace => ${doodlerLeftSpace}`);
    console.log(`startPoint => ${startPoint}`);
    console.log(`doodlerBottomSpace => ${doodlerBottomSpace}`);
    console.log(`isGameOver => ${isGameOver}`);
    console.log(`platformCount => ${platformCount}`);
    console.log(`platforms => ${platforms}`);
    console.log(`upTimerId => ${upTimerId}`);
    console.log(`downTimerId => ${downTimerId}`);
    console.log(`isJumping => ${isJumping}`);
    console.log(`isGoingLeft => ${isGoingLeft}`);
    console.log(`isGoingRight => ${isGoingRight}`);
    console.log(`leftTimerId => ${leftTimerId}`);
    console.log(`rightTimerId => ${rightTimerId}`);
  };

  const control = (event) => {
    console.log(event);
    switch (event.key) {
      case "ArrowLeft":
        moveLeft();
        showGameInfo();
        break;
      case "ArrowRight":
        moveRight();
        showGameInfo();
        break;
      default:
        break;
    }
  };

  const moveLeft = () => {
    if (isGoingRight) {
        clearInterval()
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(() => {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else moveRight();
    }, 30);
  };

  const moveRight = () => {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(() => {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else moveLeft();
    }, 30);
  };

  const start = () => {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 40);
      jump();
      document.addEventListener("keyup", control);
    }
  };

  // connect this to a button to start the game.
  start();
});
