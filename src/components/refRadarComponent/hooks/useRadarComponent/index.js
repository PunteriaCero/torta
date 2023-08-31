import { useEffect, useState } from "react";
import { compareByEndElevation } from "../../utils";

export const useRadarComponent = (data, onClick, radius) => {
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, settTargetsData] = useState(data.targets);
  const width = radius * 2;
  const height = width;

  useEffect(()=>{
    sectionsData.sort(compareByEndElevation);
  }, [sectionsData])
  
  useEffect(()=>{
    targetsData.sort(compareByEndElevation);
  }, [targetsData])

  const updateSelectedState = (dataArray, label) =>
    dataArray.map((data) => ({ ...data, selected: data.label === label }));

  const handleClick = (event, d) => {
    const newSectionsData = updateSelectedState(sectionsData, d.data.label);
    const newTargetsData = updateSelectedState(targetsData, null); // Unselect all targets
    settTargetsData(newTargetsData);
    setSectionsData(newSectionsData);
    const newSelectedSection = { ...d.data, selected: true };
    onClick(newSelectedSection);
  };

  const handleTargetsClick = (event, d) => {
    const newTargetsData = updateSelectedState(targetsData, d.data.label);
    const newSectionsData = updateSelectedState(sectionsData, null); // Unselect all sections
    settTargetsData(newTargetsData);
    setSectionsData(newSectionsData);
    const newSelectedTarget = { ...d.data, selected: true };
    onClick(newSelectedTarget);
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
