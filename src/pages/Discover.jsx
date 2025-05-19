import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import StarParticles from "@/components/StarParticles";
import { getImagePath, getOptimizedImageProps } from "@/utils/imagePath";

const filters = [
  { label: "筛选", type: "title" },
  { label: "年份", type: "subtitle" },
  { label: "2025年", type: "option", active: true },
  { label: "2024年", type: "option" },
  { label: "全部中心", type: "subtitle" },
  { label: "体验", type: "option" },
  { label: "品牌", type: "option" },
  { label: "营销", type: "option" },
  { label: "文创", type: "option" },
  { label: "设计打分", type: "subtitle" },
  { label: "90+", type: "option" },
  { label: "80+", type: "option" },
  { label: "已筛", type: "option", special: true },
];

const projects = [
  {
    title: "美食频道异地氛围AIGC专项",
    desc: "团购和软硬件服务设计中心/创意营销设计组",
    tags: ["80+", "创意", "C端"],
    badge: "2025年第28期",
    img: getImagePath("/1.png"),
    like: 126,
    view: 813,
  },
  {
    title: "214情人节活动设计",
    desc: "美团平台设计中心/用户增长与运营设计组",
    tags: ["80+", "创意", "C端"],
    badge: "2025年第27期",
    img: getImagePath("/2.png"),
    like: 126,
    view: 813,
  },
  {
    title: "异地场景地图探索模式设计",
    desc: "异地地图探索模式设计",
    tags: ["90+", "体验", "C端"],
    badge: "2025年第26期",
    img: getImagePath("/3.png"),
    like: 126,
    view: 813,
  },
  {
    title: "乐生活春节大促营销活动",
    desc: "乐生活春节大促营销活动",
    tags: ["80+", "创意", "C端"],
    badge: "2025年第25期",
    img: getImagePath("/4.png"),
    like: 126,
    view: 813,
  },
  {
    title: "2024骑手年终盘点配送报告H5设计",
    desc: "品牌创意设计中心/品牌设计组",
    tags: ["80+", "创意", "C端"],
    badge: "2025年第24期",
    img: getImagePath("/5.png"),
    like: 126,
    view: 813,
  },
  {
    title: "学城星空知识社区2.0改版",
    desc: "基础研发平台设计中心",
    tags: ["80+", "创意", "B端"],
    badge: "2025年第23期",
    img: getImagePath("/6.png"),
    like: 126,
    view: 813,
  },
  {
    title: "春节集福蛇活动",
    desc: "酒旅设计中心/创意营销设计组",
    tags: ["80+", "创意", "C端"],
    badge: "2025年第22期",
    img: getImagePath("/7.png"),
    like: 126,
    view: 813,
  },
  {
    title: "外卖首页橱窗迭代复盘",
    desc: "外卖和履约平台设计中心/外卖用户端设计组",
    tags: ["80+","体验", "C端"],
    badge: "2025年第21期",
    img: getImagePath("/8.png"),
    like: 126,
    view: 813,
  },
  {
    title: "团购和软硬件服务设计中心/创意营销设计组",
    desc: "美团安心学物料手册",
    tags: ["80+", "创意", "文创"],
    badge: "2025年第20期",
    img: getImagePath("/9.png"),
    like: 126,
    view: 813,
  },
];

export default function Discover() {
  const [searchParams] = useSearchParams();
  // 修改状态为数组，支持多选
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [selectedScores, setSelectedScores] = useState([]);
  // 添加下拉选择器状态
  const [selectedYear, setSelectedYear] = useState('全部');
  const [selectedCenter, setSelectedCenter] = useState('全部');

  // 在组件加载时处理 URL 参数
  useEffect(() => {
    const score = searchParams.get('score');
    const tab = searchParams.get('tab');

    // 处理分数筛选
    if (score) {
      setSelectedScores([`${score}+`]);
      // 清除其他筛选
      setSelectedTypes([]);
      setSelectedObjects([]);
      setSelectedYear('全部');
      setSelectedCenter('全部');
    }

    // 处理标签筛选
    if (tab && !score) {  // 只有在没有分数筛选时才处理标签筛选
      if (tab === '体验设计项目') {
        setSelectedTypes(['体验']);
      } else if (tab === '创意项目') {
        setSelectedTypes(['创意']);
      }
    }
  }, [searchParams]);

  // 检查是否有任何筛选项被选中
  const hasActiveFilters = selectedTypes.length > 0 || 
    selectedObjects.length > 0 || 
    selectedScores.length > 0 || 
    selectedYear !== '全部' || 
    selectedCenter !== '全部';

  // 处理按钮点击的通用函数
  const handleButtonClick = (value, currentSelected, setSelected) => {
    if (currentSelected.includes(value)) {
      // 如果已选中，则取消选择
      setSelected(currentSelected.filter(item => item !== value));
    } else {
      // 如果未选中，则添加到选中列表
      setSelected([...currentSelected, value]);
    }
  };

  // 重置所有筛选项
  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedObjects([]);
    setSelectedScores([]);
    setSelectedYear('全部');
    setSelectedCenter('全部');
  };

  // 筛选卡片数据
  const filteredProjects = projects.filter(project => {
    // 如果没有选中任何筛选项，显示所有卡片
    if (!hasActiveFilters) return true;

    // 检查项目类型
    const typeMatch = selectedTypes.length === 0 || 
      selectedTypes.some(type => project.tags.includes(type));

    // 检查设计对象
    const objectMatch = selectedObjects.length === 0 || 
      selectedObjects.some(object => project.tags.includes(object));

    // 检查项目得分
    const scoreMatch = selectedScores.length === 0 || 
      selectedScores.some(score => project.tags.includes(score));

    // 检查年份
    const yearMatch = selectedYear === '全部' || 
      project.badge.includes(selectedYear);

    // 检查设计中心
    const centerMatch = selectedCenter === '全部' || 
      project.desc.includes(selectedCenter);

    // 所有选中的筛选项都必须匹配
    return typeMatch && objectMatch && scoreMatch && yearMatch && centerMatch;
  });

  return (
    <div className="min-h-screen bg-[#1C1B24] text-white flex flex-col relative overflow-hidden">
      {/* 星星粒子动画 */}
      <StarParticles />
      {/* 顶部背景图 */}
      <img 
        {...getOptimizedImageProps("/发现bg.png", "发现页顶部背景")}
        className="pointer-events-none select-none w-full absolute top-0 left-0 z-0" 
        style={{objectFit: 'cover'}} 
      />
      {/* 底部背景图 */}
      <img 
        {...getOptimizedImageProps("/bg2.png", "bg2")}
        className="pointer-events-none select-none w-full absolute bottom-0 left-0 z-0" 
        style={{objectFit: 'cover'}} 
      />
      {/* 顶部导航栏 */}
      <header className="relative z-10 h-[52px] flex items-center border-none bg-transparent">
        <div className="container mx-auto px-4 py-0 flex items-center justify-between h-full">
          <div className="flex items-center space-x-12 h-full">
            <div className="flex items-center space-x-2">
              <img {...getOptimizedImageProps(getImagePath("/logo.svg"), "这设计妙")} className="h-7" />
            </div>
            <nav className="hidden md:flex space-x-6 h-full">
              <Link to="/" className="text-[#F3F3F4] hover:text-[#9A4DFF] transition-colors h-full flex items-end pb-[13px] border-b-2 border-transparent">首页</Link>
              <Link to="/discover" className="text-[#9A4DFF] border-b-2 border-[#9A4DFF] pb-[13px] h-full flex items-end">发现</Link>
            </nav>
          </div>
          <div className="flex items-center">
            <img
              src={getImagePath("/头像.PNG")}
              alt="头像"
              className="w-8 h-8 rounded-full object-cover"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full h-px" style={{background: 'rgba(255,255,255,0.15)'}} />
      </header>
      {/* 主内容区 */}
      <main className="flex-1 flex w-full max-w-[1440px] mx-auto mt-2 relative z-10">
        {/* 左侧筛选栏 */}
        <aside
          className="flex-shrink-0"
          style={{
            width: '200px',
            height: '714px',
            position: 'sticky',
            top: '172px',
            zIndex: 20,
            background: `url(${getImagePath('/搜索栏bg.png')}) no-repeat center/cover`,
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 24px 0 rgba(80,40,120,0.10)',
            marginRight: '24px',
          }}
        >
          {/* 顶部筛选标题区 */}
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 24,
            width: '100%'
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src={getImagePath("/slider-settings.svg")} alt="筛选设置" style={{width: 16, height: 16, marginRight: 4}} />
              <span style={{fontSize: 16, fontWeight: 400, color: '#fff'}}>筛选</span>
            </div>
            <button
              style={{
                background: hasActiveFilters ? 'rgba(125,119,155,0.45)' : 'rgba(38,33,64,0.45)',
                border: 'none',
                borderRadius: '6px',
                color: hasActiveFilters ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                fontSize: 12,
                fontWeight: 400,
                padding: '4px 8px',
                cursor: hasActiveFilters ? 'pointer' : 'default',
                transition: 'all 0.2s',
                opacity: hasActiveFilters ? 1 : 0.6
              }}
              onClick={hasActiveFilters ? handleReset : undefined}
            >重置</button>
          </div>
          {/* 年份 下拉选择器 */}
          <div style={{marginBottom: 18}}>
            <div style={{fontSize: 14, color: 'rgba(255,255,255,1)', marginBottom: 8}}>年份</div>
            <select 
              style={{
                width: '100%',
                height: 32,
                borderRadius: 6,
                background: 'rgba(125,119,155,0.45)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                fontSize: 13,
                paddingLeft: 12,
                paddingRight: 32,
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url(${getImagePath('/箭头_v_小_下.svg')})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                backgroundSize: '16px 16px'
              }}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="全部">全部</option>
              <option value="2025年">2025年</option>
              <option value="2024年">2024年</option>
            </select>
          </div>
          {/* 设计中心 下拉选择器 */}
          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 14, color: 'rgba(255,255,255,1)', marginBottom: 8}}>设计中心</div>
            <select 
              style={{
                width: '100%',
                height: 32,
                borderRadius: 6,
                background: 'rgba(125,119,155,0.45)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                fontSize: 14,
                paddingLeft: 12,
                paddingRight: 32,
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url(${getImagePath('/箭头_v_小_下.svg')})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                backgroundSize: '16px 16px'
              }}
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
            >
              <option value="全部">全部</option>
              <option value="出行和科技设计中心">出行和科技设计中心</option>
              <option value="基础研发平台设计中心">基础研发平台设计中心</option>
              <option value="即时零售设计中心">即时零售设计中心</option>
              <option value="品牌营销设计中心">品牌营销设计中心</option>
              <option value="食杂零售设计中心">食杂零售设计中心</option>
              <option value="酒店旅行设计中心">酒店旅行设计中心</option>
              <option value="金融服务设计中心">金融服务设计中心</option>
              <option value="产品体验设计中心">产品体验设计中心</option>
              <option value="团购设计中心">团购设计中心</option>
              <option value="医药健康设计中心">医药健康设计中心</option>
            </select>
          </div>
          {/* 项目类型 按钮组 */}
          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 14, color: 'rgba(255,255,255,1)', marginBottom: 8}}>项目类型</div>
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {['创意', '体验', '文创'].map(type => (
                <button
                  key={type}
                  style={{
                    borderRadius: 4,
                    background: selectedTypes.includes(type) ? 'rgba(107,78,255,0.3)' : 'rgba(125,119,155,0.45)',
                    color: '#fff',
                    border: selectedTypes.includes(type) ? '1px solid #956BFF' : '1px solid transparent',
                    fontSize: 14,
                    padding: '2px 10px',
                    minWidth: 48,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => handleButtonClick(type, selectedTypes, setSelectedTypes)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          {/* 设计对象 按钮组 */}
          <div style={{marginBottom: 18}}>
            <div style={{fontSize: 14, color: 'rgba(255,255,255,1)', marginBottom: 8}}>设计对象</div>
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {['B端','C端', '文创'].map(type => (
                <button
                  key={type}
                  style={{
                    borderRadius: 4,
                    background: selectedObjects.includes(type) ? 'rgba(107,78,255,0.3)' : 'rgba(125,119,155,0.45)',
                    color: '#fff',
                    border: selectedObjects.includes(type) ? '1px solid #956BFF' : '1px solid transparent',
                    fontSize: 14,
                    padding: '2px 10px',
                    minWidth: 48,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => handleButtonClick(type, selectedObjects, setSelectedObjects)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          {/* 项目得分 按钮组 */}
          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 14, color: 'rgba(255,255,255,1)', marginBottom: 8}}>项目得分</div>
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {['90+', '80+'].map(type => (
                <button
                  key={type}
                  style={{
                    borderRadius: 4,
                    background: selectedScores.includes(type) ? 'rgba(107,78,255,0.3)' : 'rgba(125,119,155,0.45)',
                    color: '#fff',
                    border: selectedScores.includes(type) ? '1px solid #956BFF' : '1px solid transparent',
                    fontSize: 14,
                    padding: '2px 10px',
                    minWidth: 48,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => handleButtonClick(type, selectedScores, setSelectedScores)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </aside>
        {/* 右侧内容区 */}
        <section className="flex-1 flex flex-col mt-8">
          {/* 搜索与筛选 */}
          <div className="flex items-center gap-4 mb-6" style={{marginTop: '80px'}}>
            <div className="relative" style={{ width: '98px', marginRight: '0px' }}>
              <select
                className="text-white text-sm outline-none w-full"
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '6px',
                  background: 'rgba(125,119,155,0.45)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  paddingLeft: '12px',
                  paddingRight: '32px',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  transition: 'border 0.2s',
                }}
              >
                <option>最新</option>
                <option>最热</option>
              </select>
              <img
                src={getImagePath("/箭头_v_小_下.svg")}
                alt="下拉"
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  pointerEvents: 'none'
                }}
              />
            </div>
            <div className="relative" style={{width: '1006px'}}>
              <Input
                type="text"
                placeholder="搜索项目标题"
                className="w-[1006px] h-[40px] pl-4 pr-12 bg-[#262140]/45 border-[rgba(251,250,255,0.3)] text-gray-200 focus:border-[rgba(251,250,255,0.3)] focus:ring-[rgba(251,250,255,0.3)] rounded-md"
                style={{
                  background: 'rgba(38,33,64,0.45)',
                  borderColor: 'rgba(251,250,255,0.3)',
                  height: '40px',
                  width: '1006px',
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
          {/* 卡片区 */}
          <div
            className="grid grid-cols-3 gap-x-5 gap-y-5"
            style={{ width: '1120px' }}
          >
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#262140]/60 overflow-hidden relative group transition-all border border-transparent hover:border-[#484552] hover:shadow-[0_8px_24px_rgba(149,107,255,0.15)]"
                style={{ width: '360px', height: '294px', minWidth: '360px' }}
              >
                <div className="relative" style={{ width: '360px', height: '200px', background: '#33323E' }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" style={{ width: '360px', height: '200px' }} />
                  <span
                    className="absolute left-2 top-2 flex items-center justify-center rounded"
                    style={{
                      width: '80px',
                      height: '22px',
                      background: 'rgba(125,119,155,0.7)',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 200,
                      lineHeight: '22px',
                      textAlign: 'center',
                    }}
                  >
                    {p.badge}
                  </span>
                </div>
                <div className="px-4 pt-3 pb-0 relative z-10" style={{height: '94px'}}>
                  {/* 标题 */}
                  <div
                    className="line-clamp-1"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#fff',
                      marginBottom: '2px',
                    }}
                  >
                    {p.title}
                  </div>
                  {/* 副标题 */}
                  <div
                    className="line-clamp-1"
                    style={{
                      fontSize: '12px',
                      fontWeight: 200,
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: '0px',
                    }}
                  >
                    {p.desc}
                  </div>
                  {/* 标签+点赞评论 */}
                  <div className="flex items-center justify-between mt-2" style={{marginTop: '8px'}}>
                    <div className="flex gap-2">
                      {p.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            height: '20px',
                            minWidth: '40px',
                            borderRadius: '2px',
                            background: 'rgba(125,119,155,0.3)',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '12px',
                            fontWeight: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '0 8px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <img src={getImagePath("/fabulous-fill.svg")} alt="点赞" style={{width: 16, height: 16}} />
                        {p.like}
                      </span>
                      <span className="flex items-center gap-1">
                        <img src={getImagePath("/visibility-on-fill.svg")} alt="评论" style={{width: 16, height: 16}} />
                        {p.view}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 