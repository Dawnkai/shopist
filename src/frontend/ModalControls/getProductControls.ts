import { FormControl } from 'types/ModalProps';
import Product from '../../types/Product';

function getProductControls(currentValues?: Product) {
  const values: FormControl[] = [
    {
      type: 'basic',
      control: {
        name: 'product_id',
        title: 'Product id',
        inputType: 'input',
        valueType: 'number',
        placeholder: 'Product id',
        defaultValue: 0,
        value: currentValues ? currentValues.product_id : 0,
        validation: (value: any): value is number => value > -1,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'product_name',
        title: 'Product name',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Product name',
        defaultValue: '',
        value: currentValues ? currentValues.product_name : '',
        validation: (value: any): value is string => !!value,
      },
    },
    {
      type: 'basic',
      control: {
        name: 'product_description',
        title: 'Product description',
        inputType: 'input',
        valueType: 'text',
        placeholder: 'Product description',
        defaultValue: '',
        value: currentValues ? currentValues.product_description : '',
        validation: (value: any): value is string => !!value,
      },
    },
  ];
  return values;
}

export default getProductControls;
