export const getImagePath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// 图片优化配置
export const getOptimizedImageProps = (path, alt = '') => {
  return {
    src: getImagePath(path),
    alt,
    loading: 'lazy',
    decoding: 'async',
    onError: (e) => {
      e.target.onerror = null;
      e.target.src = getImagePath('/placeholder.png');
    }
  };
}; 