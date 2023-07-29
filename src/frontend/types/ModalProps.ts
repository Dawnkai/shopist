import { ReactElement } from 'react';

export type BasicFormControl = {
  name: string;
  title: string;
  inputType: string;
  valueType?: string;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  valueRange?: any[];
  validation: (value: any) => boolean;
  [key: string]: any;
};

export type FormControl = {
  type: 'basic' | 'extended';
  control: BasicFormControl | ReactElement<any, any>;
};

export type ModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  handleSubmit: (arg: FormControl[]) => void;
  controls: FormControl[];
  title: string;
};
