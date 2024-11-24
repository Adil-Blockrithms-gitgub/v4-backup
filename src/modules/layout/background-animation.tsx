import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const STAR_COLOR = "#fff";
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

    let scale = 1; // device pixel ratio
    let width: number;
    let height: number;
    const stars: Array<{ x: number; y: number; z: number }> = [];
    // let pointerX: number | null = null;
    // let pointerY: number | null = null;
    const velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0001 }; // Reduced z velocity for smoother movement
    // let touchInput = false;

    function generate() {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    function placeStar(star: { x: number; y: number; z: number }) {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    }

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      scale = window.devicePixelRatio || 1;

      width = window.innerWidth * scale;
      height = window.innerHeight * scale;

      canvas.width = width;
      canvas.height = height;

      stars.forEach(placeStar);
    }

    function step() {
      if (!context) return;

      context.clearRect(0, 0, width, height);

      update();
      render();

      requestAnimationFrame(step);
    }

    function update() {
      velocity.tx *= 0.95; // Increased damping for smoother changes in velocity
      velocity.ty *= 0.95;

      velocity.x += (velocity.tx - velocity.x) * 0.05; // Reduced multiplier to make the movement smoother
      velocity.y += (velocity.ty - velocity.y) * 0.05;

      stars.forEach((star) => {
        star.x += velocity.x * star.z * 0.5; // Reduced the effect of velocity for smoother movement
        star.y += velocity.y * star.z * 0.5;
        star.x += (star.x - width / 2) * velocity.z * star.z * 0.02; // Further reduced the velocity for a smoother animation
        star.y += (star.y - height / 2) * velocity.z * star.z * 0.02;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }

    function recycleStar(star: { x: number; y: number; z: number }) {
      let direction = "z";
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        const axis =
          vx > vy ? (Math.random() < vx / (vx + vy) ? "h" : "v") : Math.random() < vy / (vx + vy) ? "v" : "h";
        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    }

    function render() {
      stars.forEach((star) => {
        context!.beginPath();
        context!.lineCap = "round";
        context!.lineWidth = STAR_SIZE * star.z * scale;
        context!.globalAlpha = 0.5 + 0.5 * Math.random();
        context!.strokeStyle = STAR_COLOR;

        context!.moveTo(star.x, star.y);

        const tailX = velocity.x * 1.5 * star.z; // Reduced multiplier for slower trailing effect
        const tailY = velocity.y * 1.5 * star.z;

        context!.lineTo(star.x + tailX, star.y + tailY);
        context!.stroke();
      });
    }

    // function movePointer(x: number, y: number) {
    //   if (pointerX !== null && pointerY !== null) {
    //     const ox = x - pointerX;
    //     const oy = y - pointerY;

    //     velocity.tx = velocity.tx + (ox / 16) * scale * (touchInput ? 1 : -1); // Reduced velocity change for smoother response
    //     velocity.ty = velocity.ty + (oy / 16) * scale * (touchInput ? 1 : -1);
    //   }

    //   pointerX = x;
    //   pointerY = y;
    // }

    // function onMouseMove(event: MouseEvent) {
    //   touchInput = false;
    //   movePointer(event.clientX, event.clientY);
    // }

    // function onTouchMove(event: TouchEvent) {
    //   touchInput = true;
    //   movePointer(event.touches[0].clientX, event.touches[0].clientY);
    //   event.preventDefault();
    // }

    // function onMouseLeave() {
    //   pointerX = null;
    //   pointerY = null;
    // }

    generate();
    resize();
    step();

    // window.addEventListener('resize', resize);
    // window.addEventListener('mousemove', onMouseMove);
    // window.addEventListener('touchmove', onTouchMove);
    // window.addEventListener('mouseleave', onMouseLeave);

    // return () => {
    //   window.removeEventListener('resize', resize);
    //   window.removeEventListener('mousemove', onMouseMove);
    //   window.removeEventListener('touchmove', onTouchMove);
    //   window.removeEventListener('mouseleave', onMouseLeave);
    // };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    />
  );
};

export default AnimatedBackground;
