export const data = {
  sections: [
    // {label, startAngle, endAngle, innerRadius, outerRadius, startElevation, endElevation, color, selected},
    {
      label: '1',
      startAngle: 12,
      endAngle: 49,
      innerRadius: 0.1,
      outerRadius: 0.9,
      startElevation: 4,
      endElevation: 100,
      color: 'red',
      selected: false,
      value: 10,
    },

    {
      label: '2',
      startAngle: 210,
      endAngle: 339,
      innerRadius: 0,
      outerRadius: 1,
      startElevation: 4,
      endElevation: 1,
      color: 'gray',
      selected: true,
      value: 10,
    },

    {
      label: '3',
      startAngle: 61,
      endAngle: 150,
      innerRadius: 0.3,
      outerRadius: 1,
      startElevation: 4,
      endElevation: 2,
      color: 'orange',
      selected: false,
      value: 10,
    },
    // {
    //   label: '4',
    //   startAngle: 10,
    //   endAngle: 60,
    //   innerRadius: 0,
    //   outerRadius: 1,
    //   startElevation: 4,
    //   endElevation: 2,
    //   color: 'blue',
    //   selected: false,
    //   value: 10,
    // },
  ],

  targets: [
    //   // {label, angle, radius, elevation, color, selected},
  ],
};

export const dataDos = {
  sections: [
    // {label, startAngle, endAngle, innerRadius, outerRadius, startElevation, endElevation, color, selected},
  ],
  targets: [
    // {label, angle, radius, elevation, color, selected},
    {
      label: '3',
      angle: 90,
      radius: 0.89,
      elevation: 5,
      color: 'purple',
      selected: true,
    },
    {
      label: '1',
      angle: 340,
      radius: 0.3,
      elevation: 5,
      color: 'orange',
      selected: false,
    },
    {
      label: '2',
      angle: 160,
      radius: 0.5,
      elevation: 5,
      color: 'blue',
      selected: false,
    },
  ],
};
