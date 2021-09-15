import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './store/store';
import { RootState } from './store/slices/rootReducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const titleCase = (title: string): string => {
  return title[0].toUpperCase().concat(title.slice(1));
}

export const parseIdFromUrl = (url: string): string | null => {
  const id = url.match(/[0-9]{12}/g);
  return id ? id[0] : null;
}

export const toLocalDate = (dateString: string): string | Date => {
  return new Date(Date.parse(dateString)).toISOString().split("T")[0];
}

export const toLocalTime = (dateString: string): string => {
  return new Date(Date.parse(dateString)).toLocaleTimeString();
}