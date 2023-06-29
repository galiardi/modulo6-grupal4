const isHttpsUrl = (url) => {
  if (!url.includes('https://')) return false;
  if (!url.split('https://')[0] === '') return false;
  return true;
};

export { isHttpsUrl };
