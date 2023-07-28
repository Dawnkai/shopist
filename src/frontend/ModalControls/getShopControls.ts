import { FormControl } from 'types/ModalProps';
import Shop from '../../types/Shop';

function getShopControls(currentValues?: Shop) {
  const values: FormControl[] = [
    {
      type: 'basic',
      control: {
        name: 'shop_id',
        title: 'Shop id',
        inputType: 'input',
        valueType: 'number',
        placeholder: 'Shop id',
        defaultValue: 0,
        value: currentValues ? currentValues.shop_id : 0,
        validation: (value: any): value is number => value > -1,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'shop_display_name',
        title: 'Shop display name',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Shop display name',
        defaultValue: '',
        value: currentValues ? currentValues.shop_display_name : '',
        validation: (value: any): value is string => !!value,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'shop_name',
        title: 'Shop name',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Shop name',
        defaultValue: '',
        value: currentValues ? currentValues.shop_name : '',
        validation: (value: any): value is string => !!value,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'shop_description',
        title: 'Shop description',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Shop description',
        defaultValue: 0,
        value: currentValues ? currentValues.shop_description : 0,
        validation: (value: any): value is string => !!value,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'shop_address',
        title: 'Shop address',
        inputType: 'input',
        valueType: 'number',
        placeholder: 'Shop address',
        defaultValue: 0,
        value: currentValues ? currentValues.shop_address : 0,
        validation: (value: any): value is string => !!value,
      },
    },
  ];
  return values;
}

export default getShopControls;
