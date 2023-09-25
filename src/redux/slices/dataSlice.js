import { createSlice } from '@reduxjs/toolkit';
import { data } from '../../data';
import { compareByEndElevation } from '../../components/refRadarComponent/utils';

const initialState = {
  sections: data.sections,
  targets: [],
  item: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    saveData: (state, { payload }) => {
      return { ...state, ...payload };
    },
    saveSections: (state, { payload }) => {
      return { ...state, sections: payload };
    },
    saveTargets: (state, { payload }) => {
      return { ...state, targets: payload };
    },
    saveItem: (state, { payload }) => {
      return { ...state, item: payload };
    },
    sortSections: (state) => {
      const sortedSections = [...state.sections].sort(compareByEndElevation);
      return { ...state, sections: sortedSections };
    },
  },
});

export const { saveData, saveSections, saveTargets, sortSections, saveItem } =
  dataSlice.actions;

export default dataSlice.reducer;
