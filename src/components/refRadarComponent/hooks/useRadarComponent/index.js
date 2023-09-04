import { useEffect, useState } from "react";
import { compareByEndElevation } from "../../utils";

export const useRadarComponent = ({data, onClick ,config: {
  radius = 200,
  numCircles = 9,
  colorCircles = "green",
  numLines = 24,
  opacityLines = 0.3,
  strokeLines = 1,
  colorLines = "green",
  circleStroke = 3,
  north = "N",
  northColor = "rgb(9, 115, 9)",
  northFontSize = (radius) => radius * 0.06,
  opacity = 0.4,
  sectionLabelFontSize = (radius) => radius * 0.06,
  sectionLabelFontWeight = "bold",
  sectionLabelDefaultColor = "rgb(100, 100, 100)",
  sectionLabelSelectedColor = "whitesmoke",
  selectedSectiondropShadowFilter = "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.6))",
  unSelectedSectiondropShadowFilter = "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))",
  sectionRectWidth = (radius) => radius * 0.08,
  sectionRectHeight = (radius) => radius * 0.08,
  sectionBorderStroke = (radius) => radius * 0.01,
  sectionStrokeColor = "white",
  sectionRecBorderSrtoke = (radius) => radius * 0.005,
  unselecteSectionRecColor = "white",
  selectedSectionRecBorderColor = "black",
  unselectedSectionRecBorderColor = "black",
  unSelectedSectionLabelShadow = "drop-shadow(0px 0px 0.7px rgba(0, 0, 0, 1))",
  pointLabelFontSize = (radius) => radius * 0.06,
  pointLabelFontWeight = "bold",
  pointLabelTextColor = "whitesmoke",
  pointLabelTextShadow = "0 0 1px black, 0 0 1px black",
  pointRectWidth = (radius) => radius * 0.04,
  pointRectHeight = (radius) => radius * 0.04,
  pointBorderStroke = 1.4,
  selectedPointRectborderShadow = (color) =>
    `drop-shadow(0px 0px 3px ${color})`,
  unSelectedPointRectborderShadow = "drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))",
  selectedPointStrokeColor = "white",
  pointRectRx = (radius) => radius * 0.08,
  pointRectRy = (radius) => radius * 0.08,
}}) => {
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, settTargetsData] = useState(data.targets);
  const width = radius * 2;
  const height = width;

  useEffect(()=>{
    if(sectionsData){
      sectionsData.sort(compareByEndElevation);
    }
  }, [sectionsData])

  useEffect(()=>{
    if(targetsData){
      targetsData.sort(compareByEndElevation);
    }
  }, [targetsData])

  const updateSelectedState = (dataArray, label) =>
    dataArray.map((data) => ({ ...data, selected: data.label === label }));

  const handleSectionClick = (event, d) => {
    const newSectionsData = updateSelectedState(sectionsData, d.data.label);
    if(targetsData){
      const newTargetsData = updateSelectedState(targetsData, null); // Unselect all targets
      settTargetsData(newTargetsData);
    }
    setSectionsData(newSectionsData);
    const newSelectedSection = { ...d.data, selected: true };
    onClick(newSelectedSection);
  };

  const handleTargetsClick = (event, d) => {
    const newTargetsData = updateSelectedState(targetsData, d.data.label);
    if(sectionsData){
      const newSectionsData = updateSelectedState(sectionsData, null); // Unselect all sections
      setSectionsData(newSectionsData);
    }
    settTargetsData(newTargetsData);
    const newSelectedTarget = { ...d.data, selected: true };
    onClick(newSelectedTarget);
  };

  return {
    handleSectionClick,
    handleTargetsClick,
    targetsData,
    sectionsData,
    width,
    height,
    radius ,
    numCircles,
    colorCircles ,
    numLines,
    opacityLines ,
    strokeLines ,
    colorLines ,
    circleStroke ,
    north ,
    northColor ,
    northFontSize ,
    opacity,

    sectionLabelFontSize ,
    sectionLabelFontWeight ,
    sectionLabelDefaultColor ,
    sectionLabelSelectedColor ,
    selectedSectiondropShadowFilter ,
    unSelectedSectiondropShadowFilter,
    sectionRectWidth ,
    sectionRectHeight ,
    sectionBorderStroke ,
    sectionStrokeColor ,
    sectionRecBorderSrtoke ,
    unselecteSectionRecColor ,
    selectedSectionRecBorderColor ,
    unselectedSectionRecBorderColor ,
    unSelectedSectionLabelShadow ,

    pointLabelFontSize ,
    pointLabelFontWeight ,
    pointLabelTextColor ,
    pointLabelTextShadow ,
    pointRectWidth ,
    pointRectHeight,
    pointBorderStroke ,
    selectedPointRectborderShadow ,
    unSelectedPointRectborderShadow ,
    selectedPointStrokeColor ,
    pointRectRx ,
    pointRectRy,
  };
};

export default useRadarComponent;
