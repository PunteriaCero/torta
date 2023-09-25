import { useAppSelector } from '../hooks';

export const useDataSelector = () =>
  useAppSelector((state) => {
    return state.data;
  });
export const useItemSelector = () =>
  useAppSelector((state) => {
    return state.data.item;
  });
export const useSectionsSelector = () =>
  useAppSelector((state) => {
    return state.data.sections;
  });
export const useTargetsSelector = () =>
  useAppSelector((state) => {
    return state.data.targets;
  });
