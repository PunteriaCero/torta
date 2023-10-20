# Interactive Data Visualization Project

This project consists of an interactive data visualization using D3.js and React. The visualization shows circular elements with sections and points, where users can interact by selecting different sections and points.

example online: https://punteriacero.github.io/torta/

## Characteristics

- The visualization shows circular elements with sections and points.
- Users can click on sections and points to select them.
- Selected sections and points show a shadow and highlight effect.
- Section and point labels change color and style when selected.
- When clicking an element or section, it is returned in the onclick function received by props.
- Use **useState** hook to configurate data information. `data` is an object of data containing the necessary information for the visualization.

## Used technology

- React
- D3.js

## Functional limitations

- If a section is covered by another, it is not selectable.
- If a point is in the same position as another, it is not selectable.
- The label value must be unique.

## Available Properties

- `sections`: State variables are used to store and manage data that can change over time, this containing the necessary information for the visualization.
- `setSections`: State setter function that is used to update the value of a state variable named sectionsData.
- `targets`: State variables are used to store and manage data that can change over time, this containing the necessary information for the visualization.
- `settTargets`: State setter function that is used to update the value of a state variable named targetsData.
- `showSections`: Boolean that valid if show section or target.
- `onClick`: A click event handler function called when a section or point is clicked.
- `onDrag`: A drag event handler function called when a section or point is dragged.
- `config`: Style config in object.
  configuration required: - radius - colorCircles - strokeLines - strokeCircles

      config={{
            radius: '280',
            colorCircles: 'rgb(0, 189, 88)',
            strokeLines: 2,
            strokeCircles: 2,
          }}

<a id="config-properties"></a>
## Available Data Properties

- `sections`: sections array(Example Value:`{label, startAngle, endAngle, innerRadius, outerRadius, startElevation, endElevation, color, selected}`).

  - label:string(key)
  - startAngle:number(0-360)
  - endAngle:number(0-360)
  - innerRadius:number(0-1)
  - outerRadius:number(0-1)
  - startElevation:number
  - endElevation:number
  - color:string
  - selected:boolean

- `targets`: sections array(Example Value:`{label, angle, radius, elevation, color, selected}`).
  - label:string(key)
  - angle:number(0-360)
  - radius:number(0-1)
  - elevation:number
  - color:string
  - selected:boolean

## Available Config Properties

- `radius`: The radius of the main circle in the visualization. (Default value: `200`).
- `numCircles`: The number of concentric circles in the visualization. (Default value: `9`).
- `colorCircles`: The color of the concentric circles. (Default value: `"green"`).
- `strokeCircle`: The stroke of the circles. (Default value: `3`).
- `numLines`: The number of lines originating from the center of the circle. (Default value: `24`).
- `opacityLines`: The opacity of the lines originating from the center of the circle. (Default value: `0.1`).
- `strokeLines`: The stroke thickness of the lines originating from the center of the circle. (Default value: `2`).
- `colorLines`: The color of the lines originating from the center of the circle. (Default value: `"green"`).
- `north`: The label indicating the north direction. (Default value: `"N"`).
- `opacity`: The opacity of elements in the visualization. (Default value: `0.4`).

- `sectionLabelFontSize`: The font size for section labels. (Default value: `"12px"`).
- `sectionLabelFontWeight`: The font weight for section labels. (Default value: `"bold"`).
- `sectionLabelDefaultColor`: The default font color for section labels. (Default value: `"rgb(100, 100, 100)"`).
- `sectionLabelSelectedColor`: The font color for selected section labels. (Default value: `"whitesmoke"`).
- `unSelectedSectionLabelShadow` :The shadow for unselected section labels. (Default value: `"drop-shadow(0px 0px 0.7px rgba(0, 0, 0, 1))"`),
- `selectedSectiondropShadowFilter`: The shadow filter for selected sections. (Default value: `"drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.6))"`).
- `unSelectedSectiondropShadowFilter`: The shadow filter for unselected sections. (Default value: `"drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))"`).
- `sectionRectWidth`: The width of the rectangle for sections. (Default value: `(radius) => radius * 0.08`).
- `sectionRectHeight`: The height of the rectangle for sections. (Default value: `(radius) => radius * 0.08`).
- `sectionBorderStroke`: The border thickness of sections. (Default value: `2`).
- `sectionStrokeColor`: The border color of sections. (Default value: `"white"`).
- `sectionRecBorderSrtoke`: The border thickness of the section rectangle. (Default value: `"1"`).
- `unselecteSectionRecColor`: The background color of unselected section rectangles. (Default value: `"white"`).
- `selectedSectionRecBorderColor`: The border color of selected section rectangles. (Default value: `"black"`).
- `unselectedSectionRecBorderColor`: The border color of unselected section rectangles. (Default value: `"white"`).

- `pointLabelFontSize`: The font size for point labels. (Default value: `"12px"`).
- `pointLabelFontWeight`: The font weight for point labels. (Default value: `"bold"`).
- `pointLabelTextColor`: The font color for point labels. (Default value: `"whitesmoke"`).
- `pointLabelTextShadow`: The text shadow for point labels. (Default value: `"0 0 1px black, 0 0 1px black"`).
- `pointRectWidth`: The width of the rectangle for points. (Default value: `(radius) => radius * 0.03`).
- `pointRectHeight`: The height of the rectangle for points. (Default value: `(radius) => radius * 0.03`).
- `pointBorderStroke`: The border thickness of points. (Default value: `1.4`).
- `selectedPointRectborderShadow`: The border shadow of selected point rectangles. (Default value: `(color) => drop-shadow(0px 0px 3px ${color})`).
- `unSelectedPointRectborderShadow`: The border shadow of unselected point rectangles. (Default value: `"drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))"`).
- `selectedPointStrokeColor`: The border color of selected points. (Default value: `"white"`).
- `pointRectRx`: The horizontal radius of the corners of point rectangles. (Default value: `12`).
- `pointRectRy`: The vertical radius of the corners of point rectangles. (Default value: `12`).

## Usage

Before to start with the implementation, you must define your states with hook useState.

### Step 1. Create your state variables

Examples:

```js
const [showSections, setShowSections] = useState(true);
const [sectionsData, setSectionsData] = useState(sections);
const [targetsData, settTargetsData] = useState(targets);
const [currentData, setCurrentData] = useState(data); // data contains the object {sections:[], targets: []}
const [selectedRow, setSelectedRow] = useState(
  data.sections.find((section) => section.selected) ?? data.sections[0]
); //set the first selected row from array objects
```

> Note: sections and targets are array objects, it must be defined wiht this properties [Available Data Properties](#config-properties)

### Step 2. Import the library

```js
import {
  RadarComponent, // Return the component render.
  ReferenceSectionSVG, // return the reference section that you select from pie.
  UpdatePositionCircle, // return method to update position
} from 'radar-render';

<RadarComponent
  key={JSON.stringify(currentData)}
  sections={sectionsData}
  setSections={setSectionsData}
  targets={targetsData}
  settTargets={settTargetsData}
  showSections={showSections} // if true then render pie with the sections, if is not then render radar with the targets
  onClick={onClick} // return the object that was clicked
  onDrag={(updatedValue) => {
    // return the object that was dragged
    setSelectedRow(updatedValue); // set the selected to use in any compoent such as data table or slider
  }}
  config={{
    radius: '280',
    colorCircles: 'rgb(0, 189, 88)',
    strokeLines: 2,
    strokeCircles: 2,
  }}
/>;
```

### Step 2. Use callback from library functions

1. **Datatable**: Update the row selected in the useState then you can use this state in Datatable component, for example:

```js
 const onClick = (row) => {
    setSelectedRow(row);
  };
...
   <DataTable
            showSections={showSections} // show all sections or targets, depends on state attribute
            targets={targetsData}// pass target data
            sections={sectionsData} // pass sections data
            selectedRow={selectedRow} // pass selected row
          />
```

2. **Slider**: Update the row selected in the useState then you can use this state in Slider component, and show this component if it `showSections` is true, for example:

```js
<div style={{ visibility: showSections ? 'visible' : 'hidden' }}>
            <Slider
              key={JSON.stringify(selectedRow)}
              selectedRow={selectedRow} // pass selected row
              onChange={onChange} // callback to update the position and angle of the sections
            />
          </div>
```

This is an implementation of `onChange` event:

```js

/**
 * Handles changes in the values of a slider component.
 *
 * @param newValues - An array of new values for the slider start and end angle.
 * @param activeThumb - The index of the active thumb that indicate if  start or end angle is changing.
 * @param [isChangeRadius=false] - Indicates if the radius is cahnging or not.
 */
const onChange = (newValues, activeThumb, isChangeRadius = false) => {
    let [startAngle, endAngle, innerRadius, outerRadius] = newValues;

    if (startAngle < 0) {
      startAngle += 360;
    }
    if (endAngle < 0) {
      endAngle += 360;
    }

    const newSelectedRow = {
      ...selectedRow,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
    };

    const objetoExistenteIndex = sectionsData.findIndex(
      (obj) => obj.label === newSelectedRow.label
    );

    if (objetoExistenteIndex !== -1) {
      const dataSectionsCopy = [...sectionsData];
      dataSectionsCopy.map((section) => section.selected === false);
      dataSectionsCopy[objetoExistenteIndex] = newSelectedRow;
      setSectionsData(dataSectionsCopy); // update section data
      const reference = ReferenceSectionSVG(newSelectedRow);
      if (isChangeRadius) { // if true update both circles start and end.
        UpdatePositionCircle(newSelectedRow, reference, true);
        UpdatePositionCircle(newSelectedRow, reference, false);
      } else {// if false update start or end depends on activeThumb
        UpdatePositionCircle(newSelectedRow, reference, !activeThumb);
      }
    }
  };
  ```
> Note: with this function you can change the slider and affect the radar component Radar and update the angles and radius of the selected row.
