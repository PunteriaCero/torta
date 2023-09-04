import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";


function valuetext(value) {
  return `${value}°C`;
}

export default function MinimumDistanceSlider({
  selectedRow,
  onChange,
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

  const handleChange1 = (event, newValue) => {
    const newValues = [newValue[0], newValue[1], value2[0] / 100, value2[1] / 100]
    setValue1(newValue);
    onChange(newValues);
  };

  const handleChange2 = (event, newValue) => {
    const newValues = [value1[0] , value1[1], newValue[0] / 100, newValue[1] / 100]
    setValue2(newValue);
    onChange(newValues);
  };

  return (
    <Box sx={{ width: 600 }}>
     <div style={{color:"whitesmoke"}}>
        Angle
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        getAriaValueText={valuetext}
        min={0}
        max={360}
        size="small"
        valueLabelDisplay="on"
      />
      <br />
      <br />
      <div style={{color:"whitesmoke"}}>
        Radius
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value2}
        onChange={handleChange2}
        getAriaValueText={valuetext}
        min={0}
        max={100}
        size="small"
        valueLabelDisplay="on"
      />
    </Box>
  );
}
