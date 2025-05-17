import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Sparkles, Heart, ArrowRight } from "lucide-react";
import GameCard from "../components/GameCard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("体验设计项目");
  const [searchQuery, setSearchQuery] = useState("");
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  // 项目分类数据
  const categories = [
    { id: "体验设计项目", label: "体验设计项目", count: 25 },
    { id: "品牌", label: "品牌", count: 18 },
    { id: "营销", label: "营销", count: 32 },
    { id: "文创与创意项目", label: "文创与创意项目", count: 15 }
  ];

  // 精选项目数据
  const featuredProjects = [
    {
      id: 1,
      title: "美食频道异地氪围AIGC专项",
      description: "图像和软硬件服务设计中心/创意氪钻设计组",
      tags: ["80+", "创意", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=food,design&width=400&height=300&source=meituan"
    },
    {
      id: 2,
      title: "城市风貌设计系统",
      description: "建筑生态与风格迁移研究",
      tags: ["90+", "标准", "B端"],
      image: "https://nocode.meituan.com/photo/search?keyword=city,architecture&width=400&height=300&source=meituan"
    },
    {
      id: 3,
      title: "异地体验交互设计",
      description: "学城星空主题体验设计",
      tags: ["体验", "创新", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=space,experience&width=400&height=300&source=meituan"
    }
  ];

  // 项目卡片数据
  const projectCards = [
    {
      id: 1,
      title: "90+项目",
      icon: <Star className="w-5 h-5 text-yellow-300" />,
      iconBg: "bg-yellow-500/20",
      description: "异地地图探索模式设计、品牌链路...",
      count: 21,
      color: "from-yellow-500/30 to-yellow-600/10"
    },
    {
      id: 2,
      title: "80+项目",
      icon: <Star className="w-5 h-5 text-green-300" />,
      iconBg: "bg-green-500/20",
      description: "美食频道异地氪围AIGC专项, 214...",
      count: 68,
      color: "from-green-500/30 to-green-600/10"
    },
    {
      id: 3,
      title: "创意项目",
      icon: <Sparkles className="w-5 h-5 text-purple-300" />,
      iconBg: "bg-purple-500/20",
      description: "美食频道异地氪围AIGC专项, 214...",
      count: 43,
      color: "from-purple-500/30 to-purple-600/10"
    },
    {
      id: 4,
      title: "体验项目",
      icon: <Heart className="w-5 h-5 text-pink-300" />,
      iconBg: "bg-pink-500/20",
      description: "异地地图探索模式设计、学城星空...",
      count: 25,
      color: "from-pink-500/30 to-pink-600/10"
    }
  ];

  // 标准卡片数据
  const standardCards = [
    {
      id: 1,
      quote: "新体验优于旧体验，且带来超出预期的业务收益",
      description: "需要提供明确超出预期的业务收益，同时需要讲清楚新旧体验差异"
    },
    {
      id: 2,
      quote: "有创意的信息传递，能给用户带来温暖的设计",
      description: "与众不同的交互形式，例如外表红包二维，下拉时红包动画，领取开水等元素，在有趣的同时，更快的传递了二维领券的心意"
    },
    {
      id: 3,
      quote: "为设计部体验设计提论体系赋价值，产生设计部可复用经验（体验标准和方法）",
      description: "包括体验标准（性能体验标准等）、专业判断框架（图标判断框架等）、专业执行方法（合意性、GSM模型）、前技术新能力的引入和推广"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticle = (x, y) => ({
      x,
      y,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: `hsla(${260 + Math.random() * 60}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`,
      life: Math.random() * 0.8 + 0.2
    });
    
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      // 鼠标移动时创建粒子
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(createParticle(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20
        ));
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制粒子
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 0.01;
        
        if (particle.life > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${particle.life})`);
          ctx.fill();
          return true;
        }
        return false;
      });
      
      // 随机添加背景粒子
      if (Math.random() < 0.1) {
        particlesRef.current.push(createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* 背景粒子效果 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
      
      {/* 顶部导航 */}
      <header className="relative z-10 border-b border-purple-900/30 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="font-bold text-lg text-purple-300">这设计妙</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-purple-300 border-b-2 border-purple-500 pb-1">首页</a>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">发现</a>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
        </div>
      </header>
      
      {/* 主标题区域 */}
      <section className="relative z-10 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-300">
          Excellent Project
        </h1>
        
        {/* 搜索框 */}
        <div className="max-w-md mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="搜索项目标题"
              className="pl-10 bg-gray-800/50 border-purple-500/30 text-gray-200 focus:border-purple-500 focus:ring-purple-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* 精选项目轮播 */}
      <section className="relative z-10 py-8 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-300">精选项目</h2>
            <div className="text-sm text-gray-400">
              <span className="font-bold text-purple-400">NEW</span> 2023年第28期
            </div>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-6 snap-x">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="min-w-[300px] md:min-w-[400px] bg-gray-800/30 rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 snap-center group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-gray-300">{project.description}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-purple-300 hover:text-purple-200 hover:bg-purple-900/20"
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 项目分类卡片 */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectCards.map((card) => (
              <div 
                key={card.id}
                className={`p-6 rounded-lg border border-gray-700/50 bg-gradient-to-br ${card.color} backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-white">{card.title}</h3>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-300 mb-3 line-clamp-1">{card.description}</p>
                <div className="text-xs text-gray-400">等{card.count}个</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 90+标准区域 */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-purple-300">90+标准</h2>
            <Button 
              variant="link" 
              className="text-purple-400 hover:text-purple-300"
            >
              设计部 90+项目标准
            </Button>
          </div>
          
          {/* 标准分类标签 */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeTab === category.id
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50"
                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* 标准卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standardCards.map((card) => (
              <div 
                key={card.id}
                className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex mb-4">
                  <span className="text-4xl text-purple-500 leading-none">"</span>
                </div>
                <p className="text-gray-200 font-medium mb-4">{card.quote}</p>
                <div className="flex justify-end mb-4">
                  <span className="text-4xl text-purple-500 leading-none">"</span>
                </div>
                <p className="text-sm text-gray-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 底部区域 */}
      <footer className="relative z-10 py-8 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 这设计妙 - 优秀设计项目展示平台</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
