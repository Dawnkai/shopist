export type Unit = {
  unitId?: number;
  unitDisplayName: string;
  unitName: string;
  unitNum: number;
  [key: string]: any;
};

export type UnitModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  handleSubmit: (arg: Unit) => void;
};

export const defaultUnit: Unit = {
  unitId: 0,
  unitDisplayName: '',
  unitName: '',
  unitNum: 0,
};
