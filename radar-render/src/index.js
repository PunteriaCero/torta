import AwesomeButton from './button.jsx';
import RadarComponent from './components/RadarComponent.js';
import { generateReferencesDOM, setPositionCircle } from './utils/index.js';

const returnLibrary = () => {
  return {
    AwesomeButton: AwesomeButton,
    RadarComponent: RadarComponent,
    ReferenceSectionSVG: generateReferencesDOM,
    UpdatePositionCircle: setPositionCircle,
  };
};
export default returnLibrary();
