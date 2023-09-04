import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function MinimumDistanceSlider({
  selectedRow = { startAngle: 0, endAngle: 0, innerRadius: 0, outerRadius: 0 },
  onChangeAngle,
}) {
  const defaultRow = {
    startAngle: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
  };

  const handleChange1 = (event, newValue) => {
    const newSection = {
      ...selectedRow,
      selected: false,
      startAngle: newValue[0],
      endAngle: newValue[1],
    };
    onChangeAngle(newSection);
  };

  const handleChange2 = (event, newValue) => {
    const newSection = {
      ...selectedRow,
      selected: false,
      innerRadius: newValue[0] / 100,
      outerRadius: newValue[1] / 100,
    };
    onChangeAngle(newSection);
  };

  return (
    <Box sx={{ width: 600 }}>
      <div style={{ color: "whitesmoke" }}>Angle</div>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={[selectedRow.startAngle, selectedRow.endAngle]}
        onChange={handleChange1}
        getAriaValueText={valuetext}
        min={0}
        max={360}
        size="small"
        valueLabelDisplay="on"
        disabled={selectedRow === defaultRow}
      />
      <br />
      <br />
      <div style={{ color: "whitesmoke" }}>Radius</div>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={[
          Math.trunc(selectedRow.innerRadius * 100),
          Math.trunc(selectedRow.outerRadius * 100),
        ]}
        onChange={handleChange2}
        getAriaValueText={valuetext}
        min={0}
        max={100}
        size="small"
        valueLabelDisplay="on"
        disabled={selectedRow === defaultRow}
      />
    </Box>
  );
}
