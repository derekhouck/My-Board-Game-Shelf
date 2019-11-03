export const separateTags = tags => {
  const mechanics = [];
  const themes = [];
  tags.forEach(tag => {
    switch (tag.category) {
      case 'Mechanics':
        mechanics.push(tag);
        break;
      case 'Themes':
        themes.push(tag);
        break;
      default:
        break;
    }
  })
  return {
    mechanics,
    themes
  };
};