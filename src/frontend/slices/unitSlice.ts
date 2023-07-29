import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultUnit, Unit } from '../types/Unit';

type UnitSliceState = {
  selectedUnit: Unit;
  units: Unit[];
};

const initialState: UnitSliceState = {
  selectedUnit: defaultUnit,
  units: [],
};

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setSelectedUnit: (state: UnitSliceState, action: PayloadAction<Unit>) => {
      return { ...state, selectedUnit: action.payload };
    },

    setUnitDisplayName: (
      state: UnitSliceState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedUnit: {
          ...state.selectedUnit,
          unit_display_name: action.payload,
        },
      };
    },

    setUnitName: (state: UnitSliceState, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedUnit: {
          ...state.selectedUnit,
          unit_name: action.payload,
        },
      };
    },

    setUnitNum: (state: UnitSliceState, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedUnit: {
          ...state.selectedUnit,
          unit_num: action.payload,
        },
      };
    },

    setUnits: (state: UnitSliceState, action: PayloadAction<Unit[]>) => {
      return {
        ...state,
        units: action.payload,
      };
    },

    addUnit: (state: UnitSliceState, action: PayloadAction<Unit>) => {
      return {
        ...state,
        units: [...state.units, action.payload],
      };
    },

    deleteUnit: (state: UnitSliceState, action: PayloadAction<number>) => {
      return {
        ...state,
        shops: state.units.filter((unit) => unit.shop_id !== action.payload),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedUnit,
  setUnitDisplayName,
  setUnitName,
  setUnitNum,
  setUnits,
  addUnit,
  deleteUnit,
} = unitSlice.actions;

export default unitSlice.reducer;
