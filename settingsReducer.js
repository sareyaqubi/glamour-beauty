export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LAYOUT = 'SET_LAYOUT';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export const initialState = {
  theme: 'dark',
  language: 'en',
  layout: 'grid',
};

export function settingsReducer(state, action) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_LAYOUT:
      return { ...state, layout: action.payload };
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    default:
      return state;
  }
}
