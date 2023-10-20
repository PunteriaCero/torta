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
