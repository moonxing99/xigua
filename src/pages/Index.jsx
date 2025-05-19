import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Sparkles, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import GameCard from "../components/GameCard";
import { Link, useNavigate } from "react-router-dom";
import StarParticles from "@/components/StarParticles";
import { getImagePath } from "@/utils/imagePath";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("体验设计项目");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [hoveredStandardIndex, setHoveredStandardIndex] = useState(null);
  const [hoveredCreativeIndex, setHoveredCreativeIndex] = useState(null);

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
      title: "美食频道页异地氛围AIGC专项",
      description: "团购和软硬件服务设计中心/创意营销设计组",
      tags: ["80+", "创意", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=food,design&width=400&height=300&source=meituan",
      content: "本项目提供了提升异地场景用户代入感的设计思路，核心在于融合文化符号与场景叙事。同时通过异地建筑AIGC生产流程，采用定制化Lora等方法，实现了高质量视觉内容的高效生成。项目沉淀的设计资产及AIGC方法可供复用，为业务提供优质视觉支持并提升效率。",
      subDesc: "AIGC ｜ 城市风貌 ｜ 建筑生成 ｜ 风格迁移"
    },
    {
      id: 2,
      title: "214情人节活动设计",
      description: "美团平台设计中心/用户增长与运营设计组",
      tags: ["80+", "创意", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=city,architecture&width=400&height=300&source=meituan",
      content: "1. 情人节活动通过构建场景化情感交互体系，将节日情绪价值转化为消费驱动力，增强用户与美团品牌之间的情感连接。\n2. 沉淀了活动玩法AIGC的方法论以及动效spine动画的经验，有效提高活动设计效率，降低动画大小，提升玩法性能和动画流畅度",
      subDesc: "AIGC ｜ 情绪价值 ｜ 节日营销"
    },
    {
      id: 3,
      title: "异地地图探索模式设计",
      description: "外卖和履约平台设计中心/外卖用户端设计组",
      tags: ["90+", "体验", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=space,experience&width=400&height=300&source=meituan",
      content: "创新地图交互模式，提升异地探索效率。通过视觉与动效优化，增强用户定位感和探索欲望，助力业务场景拓展。",
      subDesc: "AIGC ｜ 情绪价值 ｜ 异地场景"
    },
    {
      id: 4,
      title: "乐生活春节大促营销活动",
      description: "团购和软硬件服务设计中心/创意营销设计组",
      tags: ["80+", "创意", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=brand,upgrade&width=400&height=300&source=meituan",
      content: "通过AI实践创新，乐生活春节大促完成直营58城市的投放活动，会场曝光UV852w+，意向UV11w+，访购率提升2.7pp，成功塑造'春节玩乐上美团'的用户认知，为团队提供可复用的AI+场景设计创意范式。",
      subDesc: "AIGC ｜ 春节大促 "
    },
    {
      id: 5,
      title: "2024骑手年终盘点配送报告H5设计",
      description: "品牌创意设计中心/品牌设计组",
      tags: ["80+", "创意", "C端"],
      image: "https://nocode.meituan.com/photo/search?keyword=ip,creative&width=400&height=300&source=meituan",
      content: "骑手端年度配送报告是骑手专属、回顾自我价值的载体，结合AIGC构建'空降美食星球'奇幻化主线叙事，通过有温度感的画面与数据展现，为骑手重温过往一年的点滴成就，增强骑手对平台的归属感与职业认同感。",
      subDesc: "骑手配送报告 ｜​ AI工具提效 ｜ ​奇幻叙事"
    }
  ];

  // 精选项目图片资源
  const featuredImages = [
    getImagePath('/pj1.png'),
    getImagePath('/pj2.png'),
    getImagePath('/pj3.png'),
    getImagePath('/pj4.png'),
    getImagePath('/pj5.png'),
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
      color: "from-yellow-500/30 to-yellow-600/10",
      filter: "90+"
    },
    {
      id: 2,
      title: "80+项目",
      icon: <Star className="w-5 h-5 text-green-300" />,
      iconBg: "bg-green-500/20",
      description: "美食频道异地氪围AIGC专项, 214...",
      count: 68,
      color: "from-green-500/30 to-green-600/10",
      filter: "80+"
    },
    {
      id: 3,
      title: "创意项目",
      icon: <Sparkles className="w-5 h-5 text-purple-300" />,
      iconBg: "bg-purple-500/20",
      description: "美食频道异地氪围AIGC专项, 214...",
      count: 43,
      color: "from-purple-500/30 to-purple-600/10",
      filter: "创意"
    },
    {
      id: 4,
      title: "体验项目",
      icon: <Heart className="w-5 h-5 text-pink-300" />,
      iconBg: "bg-pink-500/20",
      description: "异地地图探索模式设计、学城星空...",
      count: 25,
      color: "from-pink-500/30 to-pink-600/10",
      filter: "体验"
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

  const handlePrev = () => setFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  const handleNext = () => setFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);

  const handleCardClick = (filter) => {
    // 使用 window.scrollTo 确保页面滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 根据不同的筛选条件设置对应的参数
    let filterParams = '';
    switch(filter) {
      case '90+':
        filterParams = '?score=90&tab=体验设计项目';
        break;
      case '80+':
        filterParams = '?score=80&tab=体验设计项目';
        break;
      case '创意':
        filterParams = '?tab=创意项目';
        break;
      case '体验':
        filterParams = '?tab=体验设计项目';
        break;
      default:
        filterParams = '';
    }
    
    // 使用 setTimeout 确保滚动动画完成后再跳转
    setTimeout(() => {
      navigate(`/discover${filterParams}`);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#1C1B24] text-white relative overflow-hidden">
      {/* 星星粒子动画 */}
      <StarParticles />
      {/* 顶部吸顶背景图 */}
      <img 
        src={getImagePath("/bg1.png")}
        alt="bg1" 
        className="pointer-events-none select-none w-full absolute top-0 left-0 z-0" 
        style={{
          objectFit: 'cover',
          filter: 'blur(0px)',
          transition: 'filter 0.3s ease'
        }} 
      />
      {/* 底部吸底背景图 */}
      <img 
        src={getImagePath("/bg2.png")}
        alt="bg2" 
        className="pointer-events-none select-none w-full absolute bottom-0 left-0 z-0" 
        style={{
          objectFit: 'cover',
          filter: 'blur(0px)',
          transition: 'filter 0.3s ease'
        }} 
      />
      
      {/* 顶部导航 */}
      <header className="relative z-10 h-[52px] flex items-center border-none">
        <div className="container mx-auto px-4 py-0 flex items-center justify-between h-full">
          <div className="flex items-center space-x-12 h-full">
            <div className="flex items-center space-x-2">
              <img src={getImagePath("/logo.svg")} alt="这设计妙" className="h-7" />
            </div>
            <nav className="hidden md:flex space-x-6 h-full">
              <Link to="/" className="text-[#9A4DFF] border-b-2 border-[#9A4DFF] pb-[13px] h-full flex items-end">首页</Link>
              <Link to="/discover" className="text-[#F3F3F4] hover:text-[#9A4DFF] transition-colors h-full flex items-end pb-[13px] border-b-2 border-transparent">发现</Link>
            </nav>
          </div>
          <div className="flex items-center">
            <span
              style={{
                marginRight: 16,
                fontSize: 12,
                fontWeight: 200,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 0,
                lineHeight: "16px"
              }}
            >
              目前是MVP版本，已燃尽TT
            </span>
            <img
              src={getImagePath("/头像.PNG")}
              alt="头像"
              className="w-8 h-8 rounded-full object-cover"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
          </div>
        </div>
        {/* header底部分割线 */}
        <div className="absolute left-0 bottom-0 w-full h-px" style={{background: 'rgba(255,255,255,0.15)'}} />
      </header>
      
      {/* 主标题区域 */}
      <section className="relative z-10 pt-16 pb-0 text-center">
        {/* 搜索框 */}
        <div className="flex justify-center mt-[48px]">
          <div className="relative" style={{width: '540px'}}>
            <Input
              type="text"
              placeholder="搜索项目标题"
              className="w-[540px] h-[40px] pl-4 pr-12 bg-[#262140]/45 border-[rgba(251,250,255,0.3)] text-gray-200 focus:border-[rgba(251,250,255,0.3)] focus:ring-[rgba(251,250,255,0.3)] rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(38,33,64,0.45)',
                borderColor: 'rgba(251,250,255,0.3)',
                height: '40px',
                width: '540px',
                outline: 'none',
                transition: 'border 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#D5CBFF';
                e.target.style.borderWidth = '1.5px';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(251,250,255,0.3)';
                e.target.style.borderWidth = '1px';
              }}
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" style={{width: '20px', height: '20px'}} />
          </div>
        </div>
      </section>
      
      {/* 精选项目轮播 */}
      <section className="relative z-10 overflow-hidden h-[468px] mt-[36px] mb-[66px] max-w-[1360px] w-full mx-auto flex items-start p-0">
        {/* 精选项目区域背景图 */}
        <img 
          src={getImagePath("/精选项目背景.png")}
          alt="精选项目背景" 
          className="absolute left-0 top-0 z-0" 
          style={{
            width: '667px', 
            height: '468px', 
            objectFit: 'contain', 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
          }} 
        />
        <div className="relative z-10 h-full flex w-full" style={{height: '468px'}}>
          {/* 左侧说明内容 */}
          <div className="relative flex flex-col" style={{width: '400px', minWidth: '400px', maxWidth: '400px', height: '468px'}}>
            {/* 期数展示区绝对定位 */}
            <div className="absolute left-0 top-0 z-20" style={{height: '32px'}}>
              <span
                className="inline-flex items-center text-white shadow-sm"
                style={{
                  height: '32px',
                  lineHeight: '20px',
                  background: 'rgba(125,119,155,0.6)',
                  borderRadius: '12px 0 8px 0',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 400,
                  padding: '6px 8px',
                }}
              >
                {featuredIndex === 0 && (
                  <img src={getImagePath("/new.svg")} alt="new" style={{marginRight: 4, height: 16, width: 32, display: 'inline-block', verticalAlign: 'middle'}} />
                )}
                {`2025年第${28 - featuredIndex}期`}
              </span>
            </div>
            <div style={{padding: '56px 0 0 24px', height: '100%'}}>
              <h3 style={{fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '4px', lineHeight: '32px'}}>{featuredProjects[featuredIndex].title}</h3>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', lineHeight: '22px'}}>{featuredProjects[featuredIndex].description}</p>
              <div className="flex" style={{gap: '8px', marginBottom: '24px'}}>
                {featuredProjects[featuredIndex].tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      height: '20px',
                      width: '40px',
                      borderRadius: '2px',
                      background: 'rgba(125,119,155,0.3)',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '12px',
                      fontWeight: 400,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{marginTop: '24px', width: '328px', fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: '22px', wordBreak: 'break-all'}}>
                {featuredProjects[featuredIndex].content}
              </div>
              {/* 分割线 */}
              <div style={{marginTop: '16px', width: '328px', height: '1px', background: 'rgba(255,255,255,0.15)'}} />
              {/* 补充文本 */}
              <div style={{marginTop: '16px', width: '328px', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '22px'}}>
                {featuredProjects[featuredIndex].subDesc}
              </div>
            </div>
            {/* 去看看按钮 */}
            <div style={{position: 'absolute', left: 24, bottom: 24, borderRadius: '18px', padding: '0px', width: '120px', height: '36px', boxSizing: 'border-box', border: '1.5px solid #956BFF', background: 'transparent'}}>
              <button
                style={{
                  width: '120px',
                  height: '36px',
                  background: 'rgba(107,78,255,0.3)',
                  border: 'none',
                  borderRadius: '18px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  boxSizing: 'border-box',
                  backgroundClip: 'padding-box',
                  lineHeight: 'normal',
                }}
              >
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                  去看看
                  <img src={getImagePath("/star.svg")} alt="star" style={{marginLeft: 4, height: 14, width: 21, verticalAlign: 'middle'}} />
                </span>
              </button>
            </div>
          </div>
          {/* 右侧图片堆叠轮播 */}
          <div className="hidden md:flex relative flex-shrink-0 overflow-visible" style={{width: '960px', height: '468px'}}>
            {/* 翻页器按钮右下角 */}
            <div style={{position: 'absolute', right: 32, bottom: 24, zIndex: 30, display: 'flex', gap: '16px'}}>
              <button
                onClick={handlePrev}
                style={{
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  background: 'rgba(125,119,155,0.8)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                <img src={getImagePath("/left.svg")} alt="上一张" style={{width: 24, height: 24}} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  background: 'rgba(125,119,155,0.8)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                <img src={getImagePath("/right.svg")} alt="下一张" style={{width: 24, height: 24}} />
              </button>
            </div>
            {featuredImages.map((img, i) => {
              // 计算当前图片在堆叠中的实际位置
              const idx = (i - featuredIndex + featuredImages.length) % featuredImages.length;
              let style = {
                transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
                position: 'absolute',
                left: `${idx * 72}px`,
                top: 0,
                width: '671px',
                height: '468px',
                borderRadius: '24px',
                boxShadow: '0 8px 32px 0 rgba(80,40,120,0.18)',
                objectFit: 'cover',
                zIndex: 10 - idx,
                opacity: idx < 5 ? 1 : 0,
                filter: idx === 0 ? 'none' : 'blur(0.7px) brightness(0.96)',
              };
              return (
                <img
                  key={img}
                  src={img}
                  alt={`精选项目${i+1}`}
                  style={style}
                  draggable={false}
                />
              );
            })}
          </div>
        </div>
      </section>
      
      {/* 项目分类卡片 */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectCards.map((card) => {
              let imgProps = null;
              if (card.title === "90+项目") {
                imgProps = { src: "/kard1.png", alt: "90+项目" };
              } else if (card.title === "80+项目") {
                imgProps = { src: "/kard2.png", alt: "80+项目" };
              } else if (card.title === "创意项目") {
                imgProps = { src: "/kard3.png", alt: "创意项目" };
              } else if (card.title === "体验项目") {
                imgProps = { src: "/kard4.png", alt: "体验项目" };
              }
              if (imgProps) {
                return (
                  <div
                    key={card.id}
                    className="w-[320px] h-[141px] rounded-[12px] overflow-hidden shadow-lg bg-transparent cursor-pointer"
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    onClick={() => handleCardClick(card.filter)}
                  >
                    <img
                      {...imgProps}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                      alt={imgProps.alt}
                    />
                  </div>
                );
              } else {
                return (
                  <div 
                    key={card.id}
                    className={`p-6 rounded-lg border border-gray-700/50 bg-gradient-to-br ${card.color} backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 cursor-pointer`}
                    onClick={() => handleCardClick(card.filter)}
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
                );
              }
            })}
          </div>
        </div>
      </section>
      
      {/* 90+标准区域 */}
      <section className="relative z-10" style={{width: '1360px', minHeight: '370px', margin: '0 auto', position: 'relative'}}>
        {/* 90+标准区背景图 */}
        <img src={getImagePath("/90标准说明.svg")} alt="90+标准说明" style={{position: 'absolute', left: 0, top: 0, width: '1360px', height: '370px', objectFit: 'cover', zIndex: 0}} />
        {/* 右上角文字链接 */}
        <a
          href="#"
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            display: 'flex',
            alignItems: 'center',
            color: '#C69EFF',
            fontSize: 14,
            fontWeight: 400,
            textDecoration: 'none',
            zIndex: 2
          }}
        >
          <img src={getImagePath("/link-o.svg")} alt="link" style={{width: 16, height: 16, marginRight: 4, display: 'inline-block', verticalAlign: 'middle'}} />
          设计部90+项目标准
        </a>
        <div className="container mx-auto relative z-10" style={{height: '100%', paddingLeft: '24px', paddingBottom: '24px'}}>
          {/* 标题 */}
          <div style={{paddingTop: 24, marginBottom: 20}}>
            <h2 style={{fontSize: 24, fontWeight: 500, color: '#fff', margin: 0}}>90+标准</h2>
          </div>
          {/* tab选项 */}
          <div style={{display: 'flex', gap: '32px', marginBottom: 16, position: 'relative'}}>
            {[
              "体验设计项目", "创意项目"
            ].map((tab) => {
              const selected = activeTab === tab;
              return (
                <div key={tab} style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      fontSize: 16,
                      fontWeight: 500,
                      color: selected ? '#fff' : 'rgba(255,255,255,0.6)',
                      cursor: 'pointer',
                      padding: 0,
                      margin: 0,
                      minWidth: '80px',
                      height: '32px',
                    }}
                  >
                    {tab}
                  </button>
                  {selected && (
                    <img src={getImagePath("/选择条.svg")} alt="tab高亮" style={{marginTop: 0, width: 109, height: 12}} />
                  )}
                </div>
              );
            })}
          </div>
          {/* 标准卡片（体验设计项目） */}
          <div>
            {activeTab === "体验设计项目" && (
              <div style={{display: 'flex', gap: '32px'}}>
                {standardCards.map((card, idx) => (
                  <div
                    key={card.id}
                    onMouseEnter={() => setHoveredStandardIndex(idx)}
                    onMouseLeave={() => setHoveredStandardIndex(null)}
                    style={{
                      width: '412px',
                      height: '206px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'box-shadow 0.3s cubic-bezier(.4,2,.6,1)',
                    }}
                  >
                    <div className="card-glow" style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '0',
                      transform: 'translateX(-50%)',
                      width: '160%',
                      height: '160px',
                      background: `
                        radial-gradient(ellipse 70% 60% at 50% 100%, rgba(154,77,255,0.13) 0%, rgba(154,77,255,0.07) 40%, rgba(154,77,255,0.02) 80%, rgba(154,77,255,0) 100%)
                      `,
                      opacity: hoveredStandardIndex === idx ? 1 : 0,
                      transition: 'opacity 0.4s',
                      pointerEvents: 'none',
                      zIndex: 1,
                      filter: 'blur(36px)',
                      clipPath: 'ellipse(70% 50% at 50% 0%)'
                    }} />
                    {/* 背景图 */}
                    <img src={getImagePath("/标准卡片背景.svg")} alt="卡片背景" style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />
                    {/* 标题 */}
                    <div style={{position: 'relative', zIndex: 2, marginTop: '32px', width: '304px', textAlign: 'center', fontWeight: 500, fontSize: '14px', color: '#fff', lineHeight: '22px', wordBreak: 'break-all'}}>
                      {card.quote}
                    </div>
                    {/* 正文 */}
                    <div style={{position: 'relative', zIndex: 2, marginTop: '16px', width: '304px', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '22px', wordBreak: 'break-all'}}>
                      {card.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "创意项目" && (
              <div style={{display: 'flex', gap: '32px'}}>
                {[0,1,2,3].map((idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredCreativeIndex(idx)}
                    onMouseLeave={() => setHoveredCreativeIndex(null)}
                    style={{
                      width: '302px',
                      height: '206px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'box-shadow 0.3s cubic-bezier(.4,2,.6,1)',
                    }}
                  >
                    <div className="card-glow" style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '0',
                      transform: 'translateX(-50%)',
                      width: '160%',
                      height: '160px',
                      background: `
                        radial-gradient(ellipse 70% 60% at 50% 100%, rgba(154,77,255,0.13) 0%, rgba(154,77,255,0.07) 40%, rgba(154,77,255,0.02) 80%, rgba(154,77,255,0) 100%)
                      `,
                      opacity: hoveredCreativeIndex === idx ? 1 : 0,
                      transition: 'opacity 0.4s',
                      pointerEvents: 'none',
                      zIndex: 1,
                      filter: 'blur(36px)',
                      clipPath: 'ellipse(70% 50% at 50% 0%)'
                    }} />
                    {/* 背景图 */}
                    <img src={getImagePath("/标准卡片背景2.svg")} alt="卡片背景" style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0}} />
                    {/* 标题 */}
                    <div style={{position: 'relative', zIndex: 2, marginTop: '32px', width: '224px', textAlign: 'center', fontWeight: 500, fontSize: '14px', color: '#fff', lineHeight: '22px', wordBreak: 'break-all'}}>
                      创意项目标题{idx+1}
                    </div>
                    {/* 正文 */}
                    <div style={{position: 'relative', zIndex: 2, marginTop: '16px', width: '224px', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '22px', wordBreak: 'break-all'}}>
                      这里是创意项目卡片的正文内容示例，可根据实际需求替换。
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 底部区域 */}
      <footer className="relative z-10 py-8 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 这设计妙 - 8090项目展示平台｜mvp版 敬请期待</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
