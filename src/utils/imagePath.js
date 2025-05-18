export const getImagePath = (path) => {
  const base = import.meta.env.BASE_URL || '/nocode-6c42701d309d48e8/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}; 