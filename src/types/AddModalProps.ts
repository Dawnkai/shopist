import Product from './Product';
import Shop from './Shop';
import Unit from './Unit';

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
