import Map from './03-components/GoogleMap/Map';
import { incidentData } from './02-constants';
import './App.css';

function App() {
  return (
    <div>
      <Map incidentData={incidentData}></Map>
    </div>
  );
}

export default App;
