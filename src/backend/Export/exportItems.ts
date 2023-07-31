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
    ws.cell(index + 2, 1).number(item.itemId);
    ws.cell(index + 2, 2).string(
      item.itemProductName ? item.itemProductName : ''
    );
    ws.cell(index + 2, 3).number(item.itemQuantity);
    ws.cell(index + 2, 4).string(
      item.itemUnitDisplayName ? item.itemUnitDisplayName : ''
    );
    ws.cell(index + 2, 5).number(item.itemPrice);
    ws.cell(index + 2, 6).string(
      item.itemShopDisplayName ? item.itemShopDisplayName : ''
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
