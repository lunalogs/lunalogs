import React, { useEffect, useRef } from 'react';

const NUM_STARS = 1900;
const NUM_DISTANT = 1200;

const FoxConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerX = 0;
    let centerY = 0;
    let focalLength = 0;
    let stars: { x: number; y: number; z: number; o: string }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
      focalLength = canvas.width * 2;

      const w = canvas.width;
      const h = canvas.height;

      stars = [];
      for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * w,
          o: '0.' + (Math.floor(Math.random() * 99) + 1),
        });
      }
      for (let i = 0; i < NUM_DISTANT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: w * 0.5 + Math.random() * w * 1.5,
          o: '0.' + (Math.floor(Math.random() * 30) + 5),
        });
      }
    };

    init();
    window.addEventListener('resize', init);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = 'rgba(0,10,20,1)';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.z--;
        if (s.z <= 1) { s.z = w; s.x = Math.random() * w; s.y = Math.random() * h; continue; }

        const k = focalLength / s.z;
        const px = (s.x - centerX) * k + centerX;
        const py = (s.y - centerY) * k + centerY;
        const pr = Math.min(k, 3);

        if (px < -pr || px > w + pr || py < -pr || py > h + pr) continue;

        ctx.fillStyle = `rgba(209,255,255,${s.o})`;
        ctx.fillRect(px, py, pr, pr);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default FoxConstellation;
