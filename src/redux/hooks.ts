import { rootState } from './store';


import { useSelector as defaultUseSelector, TypedUseSelectorHook } from 'react-redux';

export const useSelector: TypedUseSelectorHook<rootState> = defaultUseSelector;