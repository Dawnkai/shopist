import Item from './Item';
import Product from './Product';
import Shop from './Shop';
import Unit from './Unit';

export type AddItemModalProps = {
    visible : boolean,
    setVisible : (arg: boolean) => void,
    shops : Shop[],
    units : Unit[],
    products : Product[],
    handleSubmit : (arg: Item) => void
}

export type AddProductModalProps = {
    visible : boolean,
    setVisible : (arg: boolean) => void,
    handleSubmit : (arg: Product) => void
}

export type AddShopModalProps = {
    visible : boolean,
    setVisible : (arg: boolean) => void,
    handleSubmit : (arg: Shop) => void
}

export type AddUnitModalProps = {
    visible : boolean,
    setVisible : (arg: boolean) => void,
    handleSubmit : (arg: Unit) => void
}
