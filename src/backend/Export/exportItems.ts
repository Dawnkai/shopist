import path from 'path';
import { dialog } from 'electron';
import xl from 'excel4node';
import fetchItems from '../Items/fetchItems';

export default async function exportItems() {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Items');

  ws.cell(1, 1).string('Id');
  ws.cell(1, 2).string('Product name');
  ws.cell(1, 3).string('Quantity');
  ws.cell(1, 4).string('Unit');
  ws.cell(1, 5).string('Price');
  ws.cell(1, 6).string('Shop');

  const items = await fetchItems();
  items.forEach((item, index) => {
    ws.cell(index + 2, 1).number(item.item_id);
    ws.cell(index + 2, 2).string(item.product_name ? item.product_name : '');
    ws.cell(index + 2, 3).number(item.item_quantity);
    ws.cell(index + 2, 4).string(
      item.unit_display_name ? item.unit_display_name : ''
    );
    ws.cell(index + 2, 5).number(item.item_price);
    ws.cell(index + 2, 6).string(
      item.shop_display_name ? item.shop_display_name : ''
    );
  });

  dialog
    .showSaveDialog({
      title: 'Select export destination',
      defaultPath: path.join(__dirname, '../assets/items.xlsx'),
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
