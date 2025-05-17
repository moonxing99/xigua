import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";
import lottie from "lottie-web";

const GameCard = ({ title, description, icon, onClick, mode }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const isHoveredRef = useRef(false);
  const animationFrameIdRef = useRef(null);
  const cardRef = useRef(null);
  const lottieRef = useRef(null);
  const lottieContainerRef = useRef(null);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // 修改导航逻辑，确保在组件挂载后才执行
    if (mode === "player") {
      navigate("/classic");
    } else if (mode === "ai") {
      navigate("/chat", { state: { mode } });
    }
    // 多人游戏模式不再可点击
  };

  useEffect(() => {
    // 根据不同模式加载不同的动画
    const animationPath = {
      ai: "https://lottie.host/2d25c01e-7e87-4972-908c-9b5e83a9f7fa/a8J4NGRr3i.json",
      player: "https://lottie.host/b8a4d0b3-0c4c-4a84-947a-cf76f7c3d5bb/hbBnC3aUWd.json",
      multiplayer: "https://lottie.host/89a9e041-952d-43c4-a8b4-1ec013c6079c/GpWzxhWzWk.json"
    }[mode];

    if (lottieContainerRef.current && animationPath) {
      lottieRef.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: animationPath
      });

      return () => {
        if (lottieRef.current) {
          lottieRef.current.destroy();
        }
      };
    }
  }, [mode]);

  const createParticle = useCallback(() => ({
    x: Math.random() * canvasRef.current.width,
    y: Math.random() * canvasRef.current.height,
    speedX: (Math.random() - 0.5) * 3,
    speedY: (Math.random() - 0.5) * 3,
    life: 1,
    size: Math.random() * 3 + 1
  }), []);

  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (isHoveredRef.current) {
      const gradient = ctx.createRadialGradient(
        canvasRef.current.width / 2,
        canvasRef.current.height,
        0,
        canvasRef.current.width / 2,
        canvasRef.current.height,
        canvasRef.current.height * 0.8
      );
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.1)');
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (Math.random() < 0.1) {
        particlesRef.current.push(createParticle());
      }
    }

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.life -= 0.02;

      if (particle.life > 0) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.life * 0.5})`;
        ctx.fill();
        return true;
      }
      return false;
    });

    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [createParticle]);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !card) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      particlesRef.current = [];
      if (!animationFrameIdRef.current) {
        animate();
      }
      card.style.transform = 'translateY(-10px)';
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = [];
      card.style.transform = 'translateY(0)';
      if (lottieRef.current) {
        lottieRef.current.stop();
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="relative transition-all duration-300" ref={cardRef}>
      <Card 
        className={`w-[300px] h-[180px] bg-black/80 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 ease-in-out ${mode !== "multiplayer" ? "cursor-pointer" : "cursor-default"} group`} 
        onClick={mode !== "multiplayer" ? handleClick : undefined}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          width={300}
          height={180}
        />
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-purple-300 group-hover:text-purple-200 transition-colors flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400 group-hover:text-gray-300">
            {mode === "multiplayer" ? "难度较大，还在施工中" : description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 px-6 pb-6 mt-4">
          <div ref={lottieContainerRef} className="absolute top-1/2 right-6 transform -translate-y-1/2 w-16 h-16 opacity-70" />
          <Button className="w-full bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 border border-purple-700/30">
            {mode === "player" ? "去查看" : mode === "ai" ? "开始游戏" : "敬请期待"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameCard;
