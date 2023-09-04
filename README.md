# Interactive Data Visualization Project

This project consists of an interactive data visualization using D3.js and React. The visualization shows circular elements with sections and points, where users can interact by selecting different sections and points.

example online: https://punteriacero.github.io/torta/

## Characteristics

- The visualization shows circular elements with sections and points.
- Users can click on sections and points to select them.
- Selected sections and points show a shadow and highlight effect.
- Section and point labels change color and style when selected.
- When clicking an element or section, it is returned in the onclick function received by props.


## Used technology

-React
-D3.js

## functional limitations 

- If a section is covered by another, it is not selectable.
- If a point is in the same position as another, it is not selectable.
- The label value must be unique.

## Available Properties

- `data`: An object of data containing the necessary information for the visualization.
- `onClick`: A click event handler function called when a section or point is clicked.
- `config`: style config.

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
- `circleStroke`: The stroke of the circles. (Default value: `3`).
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
