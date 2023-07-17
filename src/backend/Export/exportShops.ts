import path from 'path';
import { dialog } from 'electron';
import xl from 'excel4node';
import fetchShops from '../Shops/fetchShops';

export default async function exportShops() {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Shops');

  ws.cell(1, 1).string('Id');
  ws.cell(1, 2).string('Name');
  ws.cell(1, 3).string('Full name');
  ws.cell(1, 4).string('Description');
  ws.cell(1, 5).string('Address');

  const shops = await fetchShops();
  shops.forEach((shop, index) => {
    ws.cell(index + 2, 1).number(shop.shop_id);
    ws.cell(index + 2, 2).string(
      shop.shop_display_name ? shop.shop_display_name : ''
    );
    ws.cell(index + 2, 3).string(shop.shop_name ? shop.shop_name : '');
    ws.cell(index + 2, 4).string(
      shop.shop_description ? shop.shop_description : ''
    );
    ws.cell(index + 2, 5).string(shop.shop_address ? shop.shop_address : '');
  });

  dialog
    .showSaveDialog({
      title: 'Select export destination',
      defaultPath: path.join(__dirname, '../assets/shops.xlsx'),
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
