import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

export default function ExportPage() {
  const exportItems = () => {
    window.electron.ipcRenderer.sendMessage('export-items', []);
  };

  const exportProducts = () => {
    window.electron.ipcRenderer.sendMessage('export-products', []);
  };

  const exportShops = () => {
    window.electron.ipcRenderer.sendMessage('export-shops', []);
  };

  const exportUnits = () => {
    window.electron.ipcRenderer.sendMessage('export-units', []);
  };

  return (
    <Card>
      <Card.Header className="text-white bg-primary">
        <div>
          <h3>
            <b>Export</b>
          </h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Card>
          <Card.Body className="text-center">
            <Card.Text>Please pick desired export option.</Card.Text>
            <ButtonGroup vertical>
              <Button variant="outline-success" onClick={exportItems}>
                Export items
              </Button>
              <Button variant="outline-success" onClick={exportProducts}>
                Export products
              </Button>
              <Button variant="outline-success" onClick={exportShops}>
                Export shops
              </Button>
              <Button variant="outline-success" onClick={exportUnits}>
                Export units
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}
