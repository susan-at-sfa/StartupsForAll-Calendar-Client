import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './store/store';
import { RootState } from './store/slices/rootReducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const titleCase = (title: string): string => {
  return title[0].toUpperCase().concat(title.slice(1));
}
