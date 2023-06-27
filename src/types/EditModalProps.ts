import Unit from './Unit';

type EditModalProps = {
    visible: boolean,
    setVisible: (arg : boolean) => void,
    selectedObject: Unit,
    handleSubmit: (arg : Unit) => void
}

export default EditModalProps;
