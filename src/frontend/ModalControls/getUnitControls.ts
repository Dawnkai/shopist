import { FormControl } from 'types/ModalProps';
import Unit from '../../types/Unit';

function getUnitControls(currentValues?: Unit) {
  const values: FormControl[] = [
    {
      type: 'basic',
      control: {
        name: 'unit_id',
        title: 'Unit id',
        inputType: 'input',
        valueType: 'number',
        placeholder: 'Unit id',
        defaultValue: 0,
        value: currentValues ? currentValues.unit_id : 0,
        validation: (value: any): value is number => value > -1,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'unit_display_name',
        title: 'Unit display name',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Unit display name',
        defaultValue: '',
        value: currentValues ? currentValues.unit_display_name : '',
        validation: (value: any): value is string => !!value,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'unit_name',
        title: 'Unit name',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Unit name',
        defaultValue: '',
        value: currentValues ? currentValues.unit_name : '',
        validation: (value: any): value is string => !!value,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'unit_num',
        title: 'Unit numerical value',
        inputType: 'input',
        valueType: 'number',
        placeholder: 'Unit value',
        defaultValue: 0,
        value: currentValues ? currentValues.unit_num : 0,
        validation: (value: any): value is number => value > 0,
      },
    },
  ];
  return values;
}

export default getUnitControls;
