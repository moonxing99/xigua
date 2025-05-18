export const getImagePath = (path) => {
  const base = import.meta.env.BASE_URL || '/xigua/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}; 