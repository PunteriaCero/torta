import { useState } from "react";

export const useRadarComponent = (data, onClick, radius) => {
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, settTargetsData] = useState(data.targets);
  const width = radius * 2;
  const height = width;

  const updateSelectedState = (dataArray, label) =>
    dataArray.map((data) => ({ ...data, selected: data.label === label }));

  const handleClick = (event, d) => {
    const newSectionsData = updateSelectedState(sectionsData, d.data.label);
    const newTargetsData = updateSelectedState(targetsData, null); // Unselect all targets
    settTargetsData(newTargetsData);
    setSectionsData(newSectionsData);
    d.data.selected = true;
    onClick(d.data);
  };

  const handleTargetsClick = (event, d) => {
    const newTargetsData = updateSelectedState(targetsData, d.data.label);
    const newSectionsData = updateSelectedState(sectionsData, null); // Unselect all sections
    settTargetsData(newTargetsData);
    setSectionsData(newSectionsData);
    d.data.selected = true;
    onClick(d.data);
  };

  return {
    handleClick,
    handleTargetsClick,
    targetsData,
    sectionsData,
    width,
    height,
  };
};

export default useRadarComponent;
