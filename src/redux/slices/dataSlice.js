import { createSlice } from '@reduxjs/toolkit';
import { data } from '../../data';
import { compareByEndElevation } from '../../components/refRadarComponent/utils';

const initialState = {
  sections: data.sections,
  targets: [],
  item: null,
  newAngle: 0,
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
    changeStartAngle: (state, { payload }) => {
      const { label, degrees } = payload;
      return {
        ...state,
        sections: state.sections.map((item) =>
          item.label === label ? { ...item, startAngle: degrees } : item
        ),
      };
    },
    changeEndAngle: (state, { payload }) => {
      const { label, degrees } = payload;
      return {
        ...state,
        sections: state.sections.map((item) =>
          item.label === label ? { ...item, endAngle: degrees } : item
        ),
      };
    },
  },
});

export const {
  saveData,
  saveSections,
  saveTargets,
  saveItem,
  sortSections,
  changeStartAngle,
  changeEndAngle,
} = dataSlice.actions;

export default dataSlice.reducer;
