import { useState, useEffect } from 'react';

/**
 * 自定义翻译钩子，用于处理多语言内容
 * @param {string} key - 翻译键值
 * @param {Object} options - 翻译选项
 * @returns {string} 翻译后的文本
 */
const useTranslation = (key, options = {}) => {
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 翻译字典
  const translations = {
    zh: {
      welcome: '欢迎来到优秀设计项目展示平台',
      search: '搜索项目',
      featured: '精选项目',
      categories: '项目分类',
      standards: '设计标准',
      experience: '体验设计项目',
      brand: '品牌',
      marketing: '营销',
      creative: '文创与创意项目',
      viewMore: '查看更多',
      newProject: '新项目',
      loading: '加载中...',
      error: '加载失败',
      noResults: '没有找到结果'
    },
    en: {
      welcome: 'Welcome to Excellent Design Project Platform',
      search: 'Search Projects',
      featured: 'Featured Projects',
      categories: 'Project Categories',
      standards: 'Design Standards',
      experience: 'Experience Design Projects',
      brand: 'Brand',
      marketing: 'Marketing',
      creative: 'Creative Projects',
      viewMore: 'View More',
      newProject: 'New Project',
      loading: 'Loading...',
      error: 'Failed to load',
      noResults: 'No results found'
    }
  };

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        setIsLoading(true);
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 获取当前语言，默认为中文
        const currentLang = options.lang || 'zh';
        
        // 获取翻译文本
        const translatedText = translations[currentLang][key] || key;
        
        // 处理插值变量
        let finalText = translatedText;
        if (options.variables) {
          Object.entries(options.variables).forEach(([varKey, varValue]) => {
            finalText = finalText.replace(`{{${varKey}}}`, varValue);
          });
        }
        
        setTranslation(finalText);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        setTranslation(key); // 出错时返回原始键值
      }
    };

    fetchTranslation();
  }, [key, options]);

  return {
    text: translation,
    isLoading,
    error
  };
};

export default useTranslation;
