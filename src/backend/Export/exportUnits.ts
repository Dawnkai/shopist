import path from 'path';
import { dialog } from 'electron';
import xl from 'excel4node';
import fetchUnits from '../Units/fetchUnits';

export default async function exportUnits() {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Units');

  ws.cell(1, 1).string('Id');
  ws.cell(1, 2).string('Name');
  ws.cell(1, 3).string('Full name');
  ws.cell(1, 4).string('Numerical value');

  const units = await fetchUnits();
  units.forEach((unit, index) => {
    ws.cell(index + 2, 1).number(unit.unit_id);
    ws.cell(index + 2, 2).string(unit.unit_name ? unit.unit_name : '');
    ws.cell(index + 2, 3).string(
      unit.unit_display_name ? unit.unit_display_name : ''
    );
    ws.cell(index + 2, 4).number(unit.unit_num);
  });

  dialog
    .showSaveDialog({
      title: 'Select export destination',
      defaultPath: path.join(__dirname, '../assets/units.xlsx'),
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
