export const MUSIC = "music";
export const getMusic = () => localStorage.getItem(MUSIC);
export const saveMusic = token => {
  localStorage.setItem(MUSIC, token);
};
export const dropMusic = () => {
  localStorage.removeItem(MUSIC);
};

export const SOUND = "sound";
export const getSound = () => localStorage.getItem(SOUND);
export const saveSound = token => {
  localStorage.setItem(SOUND, token);
};
export const dropSound = () => {
  localStorage.removeItem(SOUND);
};