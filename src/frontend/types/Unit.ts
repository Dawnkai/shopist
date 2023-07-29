export type Unit = {
  unit_id?: number;
  unit_display_name: string;
  unit_name: string;
  unit_num: number;
  [key: string]: any;
};

export const defaultUnit: Unit = {
  unit_id: 0,
  unit_display_name: '',
  unit_name: '',
  unit_num: 0,
};
