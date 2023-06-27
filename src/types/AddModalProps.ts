import Unit from './Unit';

type AddModalProps = {
    visible : boolean,
    setVisible : (arg: boolean) => void,
    handleSubmit : (arg: Unit) => void
}

export default AddModalProps;
