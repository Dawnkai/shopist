import Unit from './Unit';

type DeleteModalProps = {
    visible: boolean,
    setVisible: (arg : boolean) => void,
    selectedObject: Unit,
    handleSubmit: (arg : number) => void
}

export default DeleteModalProps;
