import React, { useEffect, useRef } from 'react';

const StarParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // 设置canvas尺寸
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 创建星星粒子
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        
        // 绘制五角星
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size,
                    -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
          ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size * 0.4),
                    -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size * 0.4));
        }
        
        ctx.closePath();
        ctx.fillStyle = `rgba(149, 107, 255, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.y += this.speed;
        this.angle += this.rotationSpeed;
        
        if (this.y > canvas.height) {
          this.reset();
          this.y = -this.size;
        }
      }
    }

    // 初始化粒子
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 20000); // 根据屏幕大小调整粒子数量
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Star());
      }
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // 初始化
    setCanvasSize();
    initParticles();
    animate();

    // 窗口大小改变时重置
    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
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
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default StarParticles; 