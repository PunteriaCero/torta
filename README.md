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
- `setTargets`: State setter function that is used to update the value of a state variable named targetsData.
- `showSections`: Boolean that valid if show section or target.
- `onClick`: A click event handler function called when a section or point is clicked.

````js
  const onClick = (row) => {
    setSelectedRow(row);
    /*
    updatedValue contians the value (object with):
    if is section then return this:
    {
      "label": "3",
      "startAngle": 74,
      "endAngle": 150,
      "innerRadius": 0.3,
      "outerRadius": 1,
      "startElevation": 4,
      "endElevation": 2,
      "color": "orange",
      "selected": true, <--
      "value": 10,
      "start": true
    }

     if is target then return this:
    {
      "label": "1",
      "angle": 340,
      "radius": 0.3,
      "elevation": 5,
      "color": "orange",
      "selected": true <--
    }
    */

  };
  ...
  ...

  onClick={onClick}
````
> In this example, the value is used to update and select the item information in the table.

- `onDrag`: A drag event handler function called when a **section** is dragged. If you drag start or end circles, the value of the angle will change automatically. You can use this value to update your state.
````js
  onDrag={(updatedValue) => { 
    setSelectedRow(updatedValue);
    /*
    updatedValue contians the value (object with):
    {
      "label": "3",
      "startAngle": 74,<--- 
      "endAngle": 150, <---
      "innerRadius": 0.3,
      "outerRadius": 1,
      "startElevation": 4,
      "endElevation": 2,
      "color": "orange",
      "selected": true,
      "value": 10,
      "start": true
    }
    */
  }}
````
> In this example, the value is used to update the information in the table.
- `config`: Style config in object.
  configuration required: - radius - colorCircles - strokeLines - strokeCircles

````js
  config={{
        radius: '280',
        colorCircles: 'rgb(0, 189, 88)',
        strokeLines: 2,
        strokeCircles: 2,
      }}
````

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
const [targetsData, setTargetsData] = useState(targets);
const [currentData, setCurrentData] = useState(data); // data contains the object {sections:[], targets: []}
const [selectedRow, setSelectedRow] = useState(
  data.sections.find((section) => section.selected) ?? data.sections[0]
); //set the first selected row from array objects
````

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
  setTargets={setTargetsData}
  showSections={showSections} // if true then render pie with the sections, if is not then render radar with the targets
  onClick={onClick} // return the object that was clicked
  onDrag={(updatedValue) => {
    // return the object that was dragged
    setSelectedRow(updatedValue); // set the selected to use in any component such as data table or slider
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

 <div>
  {showSections ? (
    <Slider
      key={JSON.stringify(selectedRow)}
      sections={sectionsData} // pass sections data
      setSections={setSectionsData}
      selectedRow={selectedRow} // pass selected row
    />
  ) : null}
</div>
```

## Demo

### Data with sections and targets

[Download data.json](https://raw.githubusercontent.com/PunteriaCero/torta/main/src/data/index.js)

### App.js

```js
import React, { useState } from 'react';
import './App.css';
import { DataTable, Slider } from './components';
import { data, dataDos } from './data';
import Button from '@mui/material/Button';
import { RadarComponent } from 'radar-render';
import { Grid } from '@mui/material';

function App() {
  const [showSections, setShowSections] = useState(true);
  const [sectionsData, setSectionsData] = useState(data.sections);
  const [targetsData, setTargetsData] = useState(data.targets);
  const [selectedRow, setSelectedRow] = useState(
    data.sections.find((section) => section.selected) ?? data.sections[0]
  );
  const [currentData, setCurrentData] = useState(data.sections);
  
  const onClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <Grid
      container
      spacing={2}
      padding={0}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '96vh' }}
    >
      <Grid item xs={6}>
        <div className="tableContainer">
          <Button
            variant="contained"
            style={{
              backgroundColor: 'black',
              width: '100%',
              position: 'relative',
              top: '18px',
            }}
            onClick={() => {
              setCurrentData(currentData.length ? [] : data.sections);
              setShowSections(!showSections);
            }}
          >
            Change Mode
          </Button>
          <DataTable
            showSections={showSections}
            targets={targetsData}
            sections={sectionsData}
            selectedRow={selectedRow}
          />
          <div>
            {showSections ? (
              <Slider
                key={JSON.stringify(selectedRow)}
                selectedRow={selectedRow}
                sections={sectionsData}
                setSections={setSectionsData}
              />
            ) : null}
          </div>
        </div>
      </Grid>
      <Grid item xs="auto"></Grid>
      <Grid item xs={5}>
        <RadarComponent
          key={JSON.stringify(currentData)}
          sections={sectionsData}
          setSections={setSectionsData}
          targets={targetsData}
          setTargets={setTargetsData}
          showSections={showSections}
          onClick={onClick}
          onDrag={(updatedValue) => {
            setSelectedRow(updatedValue);
          }}
          config={{
            radius: '280',
            colorCircles: 'rgb(0, 189, 88)',
            strokeLines: 2,
            strokeCircles: 2,
          }}
        />
      </Grid>
    </Grid>
  );
}
export default App;
```

### DataTable.js

```js
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({
  showSections,
  sections,
  targets,
  selectedRow,
}) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        style={{ backgroundColor: 'rgb(37, 36, 36)', borderRadius: '10px' }}
        aria-label="customized table"
      >
        <TableHead>
          {
            showSections ? (
              <TableRow>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Label
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Start Angle
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  End Angle
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Inner Radius
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Outer Radius
                </StyledTableCell>
              </TableRow>
            ) : (
              <TableRow>
                <StyledTableCell align="center" style={{ width: 50 }}>Label</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>Angle</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>Radius</StyledTableCell>
              </TableRow>
            ) // Targets
          }
        </TableHead>
        <TableBody>
          {showSections
            ? sections.map((row) => (
                <StyledTableRow
                  key={row.label}
                  style={{
                    backgroundColor:
                      selectedRow?.label === row.label
                        ? 'rgb(0, 189, 88)'
                        : 'rgb(82, 82, 82)',
                  }}
                >
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {row.label}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {row.startAngle}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {row.endAngle}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {Math.trunc(row.innerRadius * 100)}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ color: 'white' }}>
                    {Math.trunc(row.outerRadius * 100)}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : targets.map((row) => (
                <StyledTableRow
                  key={row.label}
                  style={{
                    backgroundColor:
                      selectedRow?.label === row.label
                        ? 'rgb(0, 189, 88)'
                        : 'rgb(82, 82, 82)',
                  }}
                >
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {row.label}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {row.angle}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }} align="center">
                    {Math.round(row.radius * 100)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

### Slider.js

```js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ReferenceSectionSVG, UpdatePositionCircle } from 'radar-render';

function valuetext(value) {
  return `${value}`;
}

export default function MinimumDistanceSlider({
  sections,
  setSections,
  selectedRow,
}) {
  const [value1, setValue1] = useState([
    selectedRow.startAngle,
    selectedRow.endAngle,
  ]);
  const [value2, setValue2] = useState([
    Math.trunc(selectedRow.innerRadius * 100),
    Math.trunc(selectedRow.outerRadius * 100),
  ]);

  useEffect(() => {
    setValue1([selectedRow.startAngle, selectedRow.endAngle]);
    setValue2([
      Math.trunc(selectedRow.innerRadius * 100),
      Math.trunc(selectedRow.outerRadius * 100),
    ]);
  }, [selectedRow]);

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

    const objetoExistenteIndex = sections.findIndex(
      (obj) => obj.label === newSelectedRow.label
    );

    if (objetoExistenteIndex !== -1) {
      const dataSectionsCopy = [...sections];
      dataSectionsCopy.map((section) => section.selected === false);
      dataSectionsCopy[objetoExistenteIndex] = newSelectedRow;
      setSections(dataSectionsCopy);
      const reference = ReferenceSectionSVG(newSelectedRow);
      if (isChangeRadius) {
        UpdatePositionCircle(newSelectedRow, reference, true);
        UpdatePositionCircle(newSelectedRow, reference, false);
      } else {
        UpdatePositionCircle(newSelectedRow, reference, !activeThumb);
      }
    }
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    const newValues = [
      newValue[0],
      newValue[1],
      value2[0] / 100,
      value2[1] / 100,
    ];

    // Mantener una distancia de 5 unidades en el rango -360 a 360
    if (newValue[1] - newValue[0] < 5) {
      if (activeThumb === 0) {
        const clamped = Math.max(newValue[0], -360 + 5);
        setValue1([clamped, clamped + 5]);
      } else {
        const clamped = Math.min(newValue[1], 360 - 5);
        setValue1([clamped - 5, clamped]);
      }
    } else {
      setValue1(newValue);
    }

    onChange(newValues, activeThumb);
  };

  const handleChange2 = (event, newValue, activeThumb) => {
    const newValues = [
      value1[0],
      value1[1],
      newValue[0] / 100,
      newValue[1] / 100,
    ];

    if (newValue[1] - newValue[0] < 5) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - 5);
        setValue2([clamped, clamped + 5]);
      } else {
        const clamped = Math.max(newValue[1], 5);
        setValue2([clamped - 5, clamped]);
      }
    } else {
      setValue2(newValue);
    }
    onChange(newValues, activeThumb, true);
  };

  return (
    <Box sx={{ width: 600 }}>
      <div style={{ color: 'whitesmoke' }}>Angle</div>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        min={-360}
        max={360}
        size="small"
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value < 0 ? value + 360 : value}°`}
        disableSwap
      />
      <br />
      <br />
      <div style={{ color: 'whitesmoke' }}>Radius</div>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        min={0}
        max={100}
        size="small"
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
```

> Note: with this function you can change the slider and affect the radar component and update the angles and radius of the selected row.

## Modifying, Updating and Publishing Package to npm

This guide will walk you through the process of modifying, updating and publishing your package to the npm registry using Rollup.

### Step 1: Run webpack server locally

If you want to modify directly the component or you need to verify something, you must run this command before you make/verify your changes.

```sh
cd radar-render
npm run start
```

> Note: The above command run component and watch your changes inmediatly.

### Step 2: Update Package Version

**Option 1**

1. Open your package.json file of your package (radar-render)
2. Locate the version field.
3. Update the version number according to semantic versioning.
   - For example, you can use patch, minor, or major version bumps.
4. Save the package.json file.

**Option 2**

1. Open your terminal and go to the package location and follow these commands.

```sh
cd radar-render
npm version <update_type>
```

> Note: Replace <update_type> with one of the following options:
>
> - patch: for small, backwards-compatible bug fixes.
> - minor: for adding new features in a backwards-compatible manner.
> - major: for making incompatible API changes.

### Step 3: Build the Package

1. Open your terminal or command prompt.
2. Run the build command:

```sh
npm run build
```

> Note: This will bundle your code according to the configuration in `rollup.config.js.`

### Step 4: Publish to npm

1. Log in to your npm account (if not already logged in):

```sh
npm login
```

Follow the prompts to log in.

2. Publish your package:

```sh
npm publish
```

This will upload your package to the npm registry.

### Step 5: Version Control

1. Commit the changes to your version control system (e.g., Git):

```sh
git add .
git commit -m "chore(release): bump version to X.Y.Z"
git push
```
