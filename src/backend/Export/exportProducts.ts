import path from 'path';
import { dialog } from 'electron';
import xl from 'excel4node';
import fetchProducts from '../Products/fetchProducts';

export default async function exportProdcts() {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Products');

  ws.cell(1, 1).string('Id');
  ws.cell(1, 2).string('Name');
  ws.cell(1, 3).string('Description');

  const products = await fetchProducts();
  products.forEach((product, index) => {
    ws.cell(index + 2, 1).number(product.product_id);
    ws.cell(index + 2, 2).string(
      product.product_name ? product.product_name : ''
    );
    ws.cell(index + 2, 3).string(
      product.product_description ? product.product_description : ''
    );
  });

  dialog
    .showSaveDialog({
      title: 'Select export destination',
      defaultPath: path.join(__dirname, '../assets/products.xlsx'),
      filters: [
        {
          name: 'Spreadsheets',
          extensions: ['xls', 'xlsx'],
        },
      ],
      properties: [],
    })
    .then((file) => {
      wb.write(file.filePath?.toString());
      return true;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
}
