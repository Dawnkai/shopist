/* eslint-disable @typescript-eslint/no-unused-vars */
import addItem from './Items/addItem';
import addProduct from './Products/addProduct';
import addShop from './Shops/addShop';
import addUnit from './Units/addUnit';

import deleteItem from './Items/deleteItem';
import deleteProduct from './Products/deleteProduct';
import deleteShop from './Shops/deleteShop';
import deleteUnit from './Units/deleteUnit';

import editItem from './Items/editItem';
import editProduct from './Products/editProduct';
import editShop from './Shops/editShop';
import editUnit from './Units/editUnit';

import fetchItems from './Items/fetchItems';
import fetchProducts from './Products/fetchProducts';
import fetchShops from './Shops/fetchShops';
import fetchUnits from './Units/fetchUnits';

import { Item } from '../types/Item';
import { Product } from '../types/Product';
import { Shop } from '../types/Shop';
import { Unit } from '../types/Unit';

import exportProducts from './Export/exportProducts';
import exportItems from './Export/exportItems';
import exportShops from './Export/exportShops';
import exportUnits from './Export/exportUnits';

// eslint-disable-next-line no-undef
export default function setupIpcSubscriptions(ipc: Electron.IpcMain) {
  ipc.on('add-item', async (event, arg) => {
    event.reply('add-item', await addItem(arg[0] as Item));
  });
  ipc.on('add-product', async (event, arg) => {
    event.reply('add-product', await addProduct(arg[0] as Product));
  });
  ipc.on('add-shop', async (event, arg) => {
    event.reply('add-shop', await addShop(arg[0] as Shop));
  });
  ipc.on('add-unit', async (event, arg) => {
    event.reply('add-unit', await addUnit(arg[0] as Unit));
  });

  ipc.on('delete-item', async (event, arg) => {
    event.reply('delete-item', await deleteItem(arg[0] as number));
  });
  ipc.on('delete-product', async (event, arg) => {
    event.reply('delete-product', await deleteProduct(arg[0] as number));
  });
  ipc.on('delete-shop', async (event, arg) => {
    event.reply('delete-shop', await deleteShop(arg[0] as number));
  });
  ipc.on('delete-unit', async (event, arg) => {
    event.reply('delete-unit', await deleteUnit(arg[0] as number));
  });

  ipc.on('edit-item', async (event, arg) => {
    event.reply('edit-item', await editItem(arg[0] as Item));
  });
  ipc.on('edit-product', async (event, arg) => {
    event.reply('edit-product', await editProduct(arg[0] as Product));
  });
  ipc.on('edit-shop', async (event, arg) => {
    event.reply('edit-shop', await editShop(arg[0] as Shop));
  });
  ipc.on('edit-unit', async (event, arg) => {
    event.reply('edit-unit', await editUnit(arg[0] as Unit));
  });

  ipc.on('fetch-items', async (event, arg) => {
    event.reply('fetch-items', await fetchItems());
  });
  ipc.on('fetch-products', async (event, arg) => {
    event.reply('fetch-products', await fetchProducts());
  });
  ipc.on('fetch-shops', async (event, arg) => {
    event.reply('fetch-shops', await fetchShops());
  });
  ipc.on('fetch-units', async (event, arg) => {
    event.reply('fetch-units', await fetchUnits());
  });

  ipc.on('export-items', async (event, arg) => {
    event.reply('export-items', await exportItems());
  });
  ipc.on('export-products', async (event, arg) => {
    event.reply('export-products', await exportProducts());
  });
  ipc.on('export-shops', async (event, arg) => {
    event.reply('export-products', await exportShops());
  });
  ipc.on('export-units', async (event, arg) => {
    event.reply('export-products', await exportUnits());
  });
}
