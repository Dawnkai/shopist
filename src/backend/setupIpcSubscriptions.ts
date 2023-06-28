import addItem from "./addItem";
import addProduct from "./addProduct";
import addShop from "./addShop";
import addUnit from "./addUnit";

import deleteItem from "./deleteItem";
import deleteProduct from "./deleteProduct";
import deleteShop from "./deleteShop";
import deleteUnit from "./deleteUnit";

import editItem from "./editItem";
import editProduct from "./editProduct";
import editShop from "./editShop";
import editUnit from "./editUnit";

import fetchItems from "./fetchItems";
import fetchProducts from "./fetchProducts";
import fetchShops from "./fetchShops";
import fetchUnits from "./fetchUnits";

import Item from "../types/Item";
import Product from "../types/Product";
import Shop from "../types/Shop";
import Unit from "../types/Unit";

export default function setupIpcSubscriptions(ipc : Electron.IpcMain) {
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
}
