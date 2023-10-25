'use strict';

var React = require('react');
var d3 = require('d3');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var PropTypes = require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var d3__namespace = /*#__PURE__*/_interopNamespace(d3);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function generateBaseCircles(numCircles, color) {
  var baseCircles = [];
  for (var i = 0; i < numCircles; i++) {
    var radius = i / (numCircles - 1);
    baseCircles.push({
      radius: radius,
      color: color
    });
  }
  return baseCircles;
}
function BaseCircles(_ref) {
  var svg = _ref.svg,
    numCircles = _ref.numCircles,
    colorCircles = _ref.colorCircles,
    radius = _ref.radius,
    strokeCircles = _ref.strokeCircles;
  var baseCircles = generateBaseCircles(numCircles, colorCircles);
  var base = svg.append('g').attr('class', 'base');
  baseCircles.forEach(function (circle) {
    base.append('circle').attr('cx', 0).attr('cy', 0).attr('r', circle.radius * (radius - 3)).attr('stroke', circle.color).attr('stroke-width', strokeCircles).attr('fill', 'none');
  });
}
function BaseLines(_ref2) {
  var lineAngles = _ref2.lineAngles,
    radius = _ref2.radius,
    colorLines = _ref2.colorLines,
    strokeLines = _ref2.strokeLines,
    opacityLines = _ref2.opacityLines,
    svg = _ref2.svg;
  // Dibujar líneas desde el centro hasta el radio especificado
  lineAngles.forEach(function (angle) {
    var x2 = Math.cos(angle) * radius;
    var y2 = Math.sin(angle) * (-radius + 1.5);
    svg.append('line').attr('x1', 0).attr('y1', 0).attr('x2', x2).attr('y2', y2).attr('stroke', colorLines).attr('stroke-width', strokeLines).attr('opacity', opacityLines);
  });
}
function compareByEndElevation(a, b) {
  return a.endElevation - b.endElevation;
}
var setPositionCircle = function setPositionCircle(newSection, reference, start) {
  var circleStart = d3__namespace.select(reference.classSelectStart);
  var circleEnd = d3__namespace.select(reference.classSelectEnd);
  if (start) {
    var _getCoordinatesCircle = getCoordinatesCircles(newSection),
      cxStart = _getCoordinatesCircle.cxStart,
      cyStart = _getCoordinatesCircle.cyStart;
    if (circleStart) {
      circleStart.attr('cx', cxStart).attr('cy', cyStart);
    }
  } else {
    var _getCoordinatesCircle2 = getCoordinatesCircles(newSection),
      cxEnd = _getCoordinatesCircle2.cxEnd,
      cyEnd = _getCoordinatesCircle2.cyEnd;
    if (circleEnd) {
      circleEnd.attr('cx', cxEnd).attr('cy', cyEnd);
    }
  }
};
var getCoordinatesCircles = function getCoordinatesCircles(data) {
  var outerRadius = data.outerRadius * 280; // Convert relative radius to actual pixels

  // Calculate start point coordinates
  var cxStart = 280 + outerRadius * Math.cos((data.startAngle * Math.PI - 280) / 180);
  var cyStart = 280 + outerRadius * Math.sin((data.startAngle * Math.PI - 280) / 180);

  // Calculate end point coordinates
  var cxEnd = 280 + outerRadius * Math.cos((data.endAngle * Math.PI - 280) / 180);
  var cyEnd = 280 + outerRadius * Math.sin((data.endAngle * Math.PI - 280) / 180);
  return {
    cxStart: cxStart,
    cyStart: cyStart,
    cxEnd: cxEnd,
    cyEnd: cyEnd
  };
};
var generateReferencesDOM = function generateReferencesDOM(section) {
  var referencesClass = {
    classStart: "start-circle item-".concat(section.label),
    classEnd: "end-circle item-".concat(section.label),
    classSelectStart: ".start-circle.item-".concat(section.label),
    classSelectEnd: ".end-circle.item-".concat(section.label)
  };
  referencesClass['existCircleStart'] = d3__namespace.select(referencesClass.classSelectStart).node();
  referencesClass['existCircleEnd'] = d3__namespace.select(referencesClass.classSelectEnd).node();
  return referencesClass;
};
var addCirclesSVG = function addCirclesSVG(section, drag, reference) {
  var svg = d3__namespace.select('svg');
  var _getCoordinatesCircle3 = getCoordinatesCircles(section),
    cxStart = _getCoordinatesCircle3.cxStart,
    cyStart = _getCoordinatesCircle3.cyStart,
    cxEnd = _getCoordinatesCircle3.cxEnd,
    cyEnd = _getCoordinatesCircle3.cyEnd;
  if (!reference.existCircleStart) {
    var startCircle = svg.append('circle').attr('class', reference.classStart).attr('r', 8);
    startCircle.attr('cx', cxStart).attr('cy', cyStart);
    startCircle.call(drag);
  }
  if (!reference.existCircleEnd) {
    var endCircle = svg.append('circle').attr('class', reference.classEnd).attr('r', 8);
    endCircle.attr('cx', cxEnd).attr('cy', cyEnd);
    endCircle.call(drag);
  }
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty__default["default"](e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var useRadarComponent = function useRadarComponent(_ref) {
  var sections = _ref.sections,
    setSections = _ref.setSections,
    targets = _ref.targets,
    settTargets = _ref.settTargets,
    onClick = _ref.onClick,
    onDrag = _ref.onDrag,
    _ref$config = _ref.config,
    _ref$config$radius = _ref$config.radius,
    radius = _ref$config$radius === void 0 ? 200 : _ref$config$radius,
    _ref$config$numCircle = _ref$config.numCircles,
    numCircles = _ref$config$numCircle === void 0 ? 9 : _ref$config$numCircle,
    _ref$config$colorCirc = _ref$config.colorCircles,
    colorCircles = _ref$config$colorCirc === void 0 ? 'green' : _ref$config$colorCirc,
    _ref$config$numLines = _ref$config.numLines,
    numLines = _ref$config$numLines === void 0 ? 24 : _ref$config$numLines,
    _ref$config$opacityLi = _ref$config.opacityLines,
    opacityLines = _ref$config$opacityLi === void 0 ? 0.3 : _ref$config$opacityLi,
    _ref$config$strokeLin = _ref$config.strokeLines,
    strokeLines = _ref$config$strokeLin === void 0 ? 1 : _ref$config$strokeLin,
    _ref$config$colorLine = _ref$config.colorLines,
    colorLines = _ref$config$colorLine === void 0 ? 'green' : _ref$config$colorLine,
    _ref$config$circleStr = _ref$config.circleStroke,
    circleStroke = _ref$config$circleStr === void 0 ? 3 : _ref$config$circleStr,
    _ref$config$north = _ref$config.north,
    north = _ref$config$north === void 0 ? 'N' : _ref$config$north,
    _ref$config$northColo = _ref$config.northColor,
    northColor = _ref$config$northColo === void 0 ? 'rgb(9, 115, 9)' : _ref$config$northColo,
    _ref$config$northFont = _ref$config.northFontSize,
    northFontSize = _ref$config$northFont === void 0 ? function (radius) {
      return radius * 0.06;
    } : _ref$config$northFont,
    _ref$config$opacity = _ref$config.opacity,
    opacity = _ref$config$opacity === void 0 ? 0.4 : _ref$config$opacity,
    _ref$config$sectionLa = _ref$config.sectionLabelFontSize,
    sectionLabelFontSize = _ref$config$sectionLa === void 0 ? function (radius) {
      return radius * 0.06;
    } : _ref$config$sectionLa,
    _ref$config$sectionLa2 = _ref$config.sectionLabelFontWeight,
    sectionLabelFontWeight = _ref$config$sectionLa2 === void 0 ? 'bold' : _ref$config$sectionLa2,
    _ref$config$sectionLa3 = _ref$config.sectionLabelDefaultColor,
    sectionLabelDefaultColor = _ref$config$sectionLa3 === void 0 ? 'rgb(100, 100, 100)' : _ref$config$sectionLa3,
    _ref$config$sectionLa4 = _ref$config.sectionLabelSelectedColor,
    sectionLabelSelectedColor = _ref$config$sectionLa4 === void 0 ? 'whitesmoke' : _ref$config$sectionLa4,
    _ref$config$selectedS = _ref$config.selectedSectiondropShadowFilter,
    selectedSectiondropShadowFilter = _ref$config$selectedS === void 0 ? 'drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.6))' : _ref$config$selectedS,
    _ref$config$unSelecte = _ref$config.unSelectedSectiondropShadowFilter,
    unSelectedSectiondropShadowFilter = _ref$config$unSelecte === void 0 ? 'drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))' : _ref$config$unSelecte,
    _ref$config$sectionRe = _ref$config.sectionRectWidth,
    sectionRectWidth = _ref$config$sectionRe === void 0 ? function (radius) {
      return radius * 0.08;
    } : _ref$config$sectionRe,
    _ref$config$sectionRe2 = _ref$config.sectionRectHeight,
    sectionRectHeight = _ref$config$sectionRe2 === void 0 ? function (radius) {
      return radius * 0.08;
    } : _ref$config$sectionRe2,
    _ref$config$sectionBo = _ref$config.sectionBorderStroke,
    sectionBorderStroke = _ref$config$sectionBo === void 0 ? function (radius) {
      return radius * 0.01;
    } : _ref$config$sectionBo,
    _ref$config$sectionSt = _ref$config.sectionStrokeColor,
    sectionStrokeColor = _ref$config$sectionSt === void 0 ? 'white' : _ref$config$sectionSt,
    _ref$config$sectionRe3 = _ref$config.sectionRecBorderSrtoke,
    sectionRecBorderSrtoke = _ref$config$sectionRe3 === void 0 ? function (radius) {
      return radius * 0.005;
    } : _ref$config$sectionRe3,
    _ref$config$unselecte = _ref$config.unselecteSectionRecColor,
    unselecteSectionRecColor = _ref$config$unselecte === void 0 ? 'white' : _ref$config$unselecte,
    _ref$config$selectedS2 = _ref$config.selectedSectionRecBorderColor,
    selectedSectionRecBorderColor = _ref$config$selectedS2 === void 0 ? 'black' : _ref$config$selectedS2,
    _ref$config$unselecte2 = _ref$config.unselectedSectionRecBorderColor,
    unselectedSectionRecBorderColor = _ref$config$unselecte2 === void 0 ? 'black' : _ref$config$unselecte2,
    _ref$config$unSelecte2 = _ref$config.unSelectedSectionLabelShadow,
    unSelectedSectionLabelShadow = _ref$config$unSelecte2 === void 0 ? 'drop-shadow(0px 0px 0.7px rgba(0, 0, 0, 1))' : _ref$config$unSelecte2,
    _ref$config$pointLabe = _ref$config.pointLabelFontSize,
    pointLabelFontSize = _ref$config$pointLabe === void 0 ? function (radius) {
      return radius * 0.06;
    } : _ref$config$pointLabe,
    _ref$config$pointLabe2 = _ref$config.pointLabelFontWeight,
    pointLabelFontWeight = _ref$config$pointLabe2 === void 0 ? 'bold' : _ref$config$pointLabe2,
    _ref$config$pointLabe3 = _ref$config.pointLabelTextColor,
    pointLabelTextColor = _ref$config$pointLabe3 === void 0 ? 'whitesmoke' : _ref$config$pointLabe3,
    _ref$config$pointLabe4 = _ref$config.pointLabelTextShadow,
    pointLabelTextShadow = _ref$config$pointLabe4 === void 0 ? '0 0 1px black, 0 0 1px black' : _ref$config$pointLabe4,
    _ref$config$pointRect = _ref$config.pointRectWidth,
    pointRectWidth = _ref$config$pointRect === void 0 ? function (radius) {
      return radius * 0.04;
    } : _ref$config$pointRect,
    _ref$config$pointRect2 = _ref$config.pointRectHeight,
    pointRectHeight = _ref$config$pointRect2 === void 0 ? function (radius) {
      return radius * 0.04;
    } : _ref$config$pointRect2,
    _ref$config$pointBord = _ref$config.pointBorderStroke,
    pointBorderStroke = _ref$config$pointBord === void 0 ? 1.4 : _ref$config$pointBord,
    _ref$config$selectedP = _ref$config.selectedPointRectborderShadow,
    selectedPointRectborderShadow = _ref$config$selectedP === void 0 ? function (color) {
      return "drop-shadow(0px 0px 3px ".concat(color, ")");
    } : _ref$config$selectedP,
    _ref$config$unSelecte3 = _ref$config.unSelectedPointRectborderShadow,
    unSelectedPointRectborderShadow = _ref$config$unSelecte3 === void 0 ? 'drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.5))' : _ref$config$unSelecte3,
    _ref$config$selectedP2 = _ref$config.selectedPointStrokeColor,
    selectedPointStrokeColor = _ref$config$selectedP2 === void 0 ? 'white' : _ref$config$selectedP2,
    _ref$config$pointRect3 = _ref$config.pointRectRx,
    pointRectRx = _ref$config$pointRect3 === void 0 ? function (radius) {
      return radius * 0.08;
    } : _ref$config$pointRect3,
    _ref$config$pointRect4 = _ref$config.pointRectRy,
    pointRectRy = _ref$config$pointRect4 === void 0 ? function (radius) {
      return radius * 0.08;
    } : _ref$config$pointRect4,
    svgRef = _ref.svgRef;
  var width = radius * 2;
  var height = width;
  if (sections) {
    sections.sort(compareByEndElevation);
  }
  if (targets) {
    targets.sort(compareByEndElevation);
  }
  var updateSelectedState = function updateSelectedState(dataArray, index) {
    return dataArray.map(function (data, idx) {
      return _objectSpread(_objectSpread({}, data), {}, {
        selected: idx === index
      });
    });
  };
  var handleSectionClick = function handleSectionClick(event, section) {
    event.stopPropagation();
    var newSectionsData = updateSelectedState(sections, section.index);
    var newSection = newSectionsData.find(function (section) {
      return section.selected === true;
    });
    setSections(function (prevState) {
      onClick(newSection);
      return newSectionsData;
    });
    var referencesClass = generateReferencesDOM(section.data);
    var drag = addEventDragCircles(section, newSection, referencesClass);
    setTimeout(function () {
      resetCircles(newSectionsData);
      addCirclesSVG(section.data, drag, referencesClass);
    }, 0);
  };
  var handleTargetsClick = function handleTargetsClick(event, d) {
    event.stopPropagation();
    var newTargetsData = updateSelectedState(targets, d.data.label);
    if (sections) {
      var newSectionsData = updateSelectedState(sections, null); // Unselect all sections
      setSections(newSectionsData);
    }
    settTargets(newTargetsData);
  };
  var handleTargetDragEnd = function handleTargetDragEnd(event, d) {
    var rad = Math.atan2(event.y, event.x);
    var degrees = rad * (180 / Math.PI) + 90;
    var hp = Math.sqrt(Math.pow(event.y, 2) + Math.pow(event.x, 2));
    var hpMax = svgRef.current.getBoundingClientRect().width / 2;
    var radius = hp / hpMax;
    degrees = Math.round(degrees);
    var newTargets = targets.map(function (target, index) {
      return _objectSpread(_objectSpread({}, target), {}, {
        angle: index === d.index ? degrees : target.angle,
        radius: index === d.index ? radius : target.radius
      });
    });
    settTargets(newTargets);
  };
  var addEventDragCircles = function addEventDragCircles(section, newSection, reference) {
    var drag = d3__namespace.drag().on('start', function () {
      d3__namespace.select(this).raise();
    }).on('end', function (event) {
      var degrees = getDegreesByEvent(event.x, event.y);
      if (d3__namespace.select(this).classed(reference.classStart)) {
        newSection = _objectSpread(_objectSpread({}, newSection), {}, {
          startAngle: degrees
        });
        setPositionCircle(newSection, reference, true);
      }
      if (d3__namespace.select(this).classed(reference.classEnd)) {
        newSection = _objectSpread(_objectSpread({}, newSection), {}, {
          endAngle: degrees
        });
        setPositionCircle(newSection, reference, false);
      }
    }).on('drag', function (event) {
      var degrees = getDegreesByEvent(event.x, event.y);
      if (d3__namespace.select(this).classed(reference.classStart)) {
        var saveItemStart = _objectSpread(_objectSpread({}, newSection), {}, {
          startAngle: degrees,
          start: true
        });
        updateReduxAngles(degrees, section.index);
        setPositionCircle(saveItemStart, reference, true);
        if (typeof onDrag === 'function') {
          onDrag(saveItemStart);
        }
      }
      if (d3__namespace.select(this).classed(reference.classEnd)) {
        var saveItemEnd = _objectSpread(_objectSpread({}, newSection), {}, {
          endAngle: degrees,
          start: false
        });
        updateReduxAngles(degrees, section.index, false);
        setPositionCircle(saveItemEnd, reference);
        if (typeof onDrag === 'function') {
          onDrag(saveItemEnd, false);
        }
      }
    });
    return drag;
  };
  var resetCircles = function resetCircles(data) {
    data.forEach(function (item) {
      if (!item.selected) {
        var circleElements = d3__namespace.selectAll(".item-".concat(item.label)).nodes();
        circleElements.forEach(function (circleElement) {
          d3__namespace.select(circleElement).remove();
        });
      }
    });
  };
  var getDegreesByEvent = function getDegreesByEvent(x, y) {
    var angle = Math.atan2(y - height / 2, x - width / 2);
    var degrees = angle * 180 / Math.PI + 90;
    if (degrees < 0) {
      degrees += 360;
    }
    degrees = Math.round(degrees);
    return degrees;
  };
  var updateReduxAngles = function updateReduxAngles(degrees, index) {
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (start) {
      setSections(function (prevSectionsData) {
        return prevSectionsData.map(function (item, idx) {
          return idx === index ? _objectSpread(_objectSpread({}, item), {}, {
            startAngle: degrees
          }) : item;
        });
      });
    } else {
      setSections(function (prevSectionsData) {
        return prevSectionsData.map(function (item, idx) {
          return idx === index ? _objectSpread(_objectSpread({}, item), {}, {
            endAngle: degrees
          }) : item;
        });
      });
    }
  };
  return {
    handleSectionClick: handleSectionClick,
    handleTargetsClick: handleTargetsClick,
    handleTargetDragEnd: handleTargetDragEnd,
    width: width,
    height: height,
    radius: radius,
    numCircles: numCircles,
    colorCircles: colorCircles,
    numLines: numLines,
    opacityLines: opacityLines,
    strokeLines: strokeLines,
    colorLines: colorLines,
    circleStroke: circleStroke,
    north: north,
    northColor: northColor,
    northFontSize: northFontSize,
    opacity: opacity,
    sectionLabelFontSize: sectionLabelFontSize,
    sectionLabelFontWeight: sectionLabelFontWeight,
    sectionLabelDefaultColor: sectionLabelDefaultColor,
    sectionLabelSelectedColor: sectionLabelSelectedColor,
    selectedSectiondropShadowFilter: selectedSectiondropShadowFilter,
    unSelectedSectiondropShadowFilter: unSelectedSectiondropShadowFilter,
    sectionRectWidth: sectionRectWidth,
    sectionRectHeight: sectionRectHeight,
    sectionBorderStroke: sectionBorderStroke,
    sectionStrokeColor: sectionStrokeColor,
    sectionRecBorderSrtoke: sectionRecBorderSrtoke,
    unselecteSectionRecColor: unselecteSectionRecColor,
    selectedSectionRecBorderColor: selectedSectionRecBorderColor,
    unselectedSectionRecBorderColor: unselectedSectionRecBorderColor,
    unSelectedSectionLabelShadow: unSelectedSectionLabelShadow,
    pointLabelFontSize: pointLabelFontSize,
    pointLabelFontWeight: pointLabelFontWeight,
    pointLabelTextColor: pointLabelTextColor,
    pointLabelTextShadow: pointLabelTextShadow,
    pointRectWidth: pointRectWidth,
    pointRectHeight: pointRectHeight,
    pointBorderStroke: pointBorderStroke,
    selectedPointRectborderShadow: selectedPointRectborderShadow,
    unSelectedPointRectborderShadow: unSelectedPointRectborderShadow,
    selectedPointStrokeColor: selectedPointStrokeColor,
    pointRectRx: pointRectRx,
    pointRectRy: pointRectRy
  };
};

function RadarComponent(_ref) {
  var sections = _ref.sections,
    setSections = _ref.setSections,
    targets = _ref.targets,
    settTargets = _ref.settTargets,
    showSections = _ref.showSections,
    onClick = _ref.onClick,
    onDrag = _ref.onDrag,
    config = _ref.config;
  var svgRef = React.useRef(null);
  var initialConfig = useRadarComponent({
    sections: sections,
    setSections: setSections,
    targets: targets,
    settTargets: settTargets,
    onClick: onClick,
    onDrag: onDrag,
    config: config,
    svgRef: svgRef
  });
  var radarConfigRef = React.useRef(initialConfig);
  var _radarConfigRef$curre = radarConfigRef.current,
    northColor = _radarConfigRef$curre.northColor,
    northFontSize = _radarConfigRef$curre.northFontSize,
    radius = _radarConfigRef$curre.radius,
    north = _radarConfigRef$curre.north;
  var styles = {
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)'
    }
  };
  React.useEffect(function () {
    var handleSectionClick = initialConfig.handleSectionClick,
      handleTargetsClick = initialConfig.handleTargetsClick,
      handleTargetDragEnd = initialConfig.handleTargetDragEnd,
      width = initialConfig.width,
      height = initialConfig.height,
      radius = initialConfig.radius,
      numCircles = initialConfig.numCircles,
      colorCircles = initialConfig.colorCircles,
      numLines = initialConfig.numLines,
      opacityLines = initialConfig.opacityLines,
      strokeLines = initialConfig.strokeLines,
      colorLines = initialConfig.colorLines,
      strokeCircles = initialConfig.strokeCircles,
      opacity = initialConfig.opacity,
      sectionLabelFontSize = initialConfig.sectionLabelFontSize,
      sectionLabelFontWeight = initialConfig.sectionLabelFontWeight,
      sectionLabelDefaultColor = initialConfig.sectionLabelDefaultColor,
      sectionLabelSelectedColor = initialConfig.sectionLabelSelectedColor,
      selectedSectiondropShadowFilter = initialConfig.selectedSectiondropShadowFilter,
      unSelectedSectiondropShadowFilter = initialConfig.unSelectedSectiondropShadowFilter,
      sectionRectWidth = initialConfig.sectionRectWidth,
      sectionRectHeight = initialConfig.sectionRectHeight,
      sectionBorderStroke = initialConfig.sectionBorderStroke,
      sectionStrokeColor = initialConfig.sectionStrokeColor,
      sectionRecBorderSrtoke = initialConfig.sectionRecBorderSrtoke,
      unselecteSectionRecColor = initialConfig.unselecteSectionRecColor,
      selectedSectionRecBorderColor = initialConfig.selectedSectionRecBorderColor,
      unselectedSectionRecBorderColor = initialConfig.unselectedSectionRecBorderColor,
      unSelectedSectionLabelShadow = initialConfig.unSelectedSectionLabelShadow,
      pointLabelFontSize = initialConfig.pointLabelFontSize,
      pointLabelFontWeight = initialConfig.pointLabelFontWeight,
      pointLabelTextColor = initialConfig.pointLabelTextColor,
      pointLabelTextShadow = initialConfig.pointLabelTextShadow,
      pointRectWidth = initialConfig.pointRectWidth,
      pointRectHeight = initialConfig.pointRectHeight,
      pointBorderStroke = initialConfig.pointBorderStroke,
      selectedPointRectborderShadow = initialConfig.selectedPointRectborderShadow,
      unSelectedPointRectborderShadow = initialConfig.unSelectedPointRectborderShadow,
      selectedPointStrokeColor = initialConfig.selectedPointStrokeColor,
      pointRectRx = initialConfig.pointRectRx,
      pointRectRy = initialConfig.pointRectRy;

    // Check if a <g> element with class "radar-component" already exists
    var svg = d3__namespace.select('g.radar-component');
    if (svg.empty()) {
      // If it doesn't exist, create a new one
      svg = d3__namespace.select(svgRef.current).attr('width', width).attr('height', height).append('g').attr('class', 'radar-component')
      // Select SVG element via reference and set its width and height attributes
      .attr('transform', "translate(".concat(width / 2, ", ").concat(height / 2, ")"));
    }

    // Generate circles
    BaseCircles({
      svg: svg,
      numCircles: numCircles,
      colorCircles: colorCircles,
      radius: radius,
      strokeCircles: strokeCircles
    });

    // Define angles for lines from center to maximum radius
    var lineAngles = d3__namespace.range(numLines).map(function (i) {
      return i * 360 / numLines * (Math.PI / 180);
    });
    BaseLines({
      lineAngles: lineAngles,
      radius: radius,
      colorLines: colorLines,
      strokeLines: strokeLines,
      opacityLines: opacityLines,
      svg: svg
    });

    // Create a pie() builder
    var pie = d3__namespace.pie().value(function (d) {
      return d.value;
    }).sort(null);

    // If there are sections and the view is enabled, they are rendered on the radar
    if (sections && showSections) {
      // Select all "arc" groups and bind data for sections
      var sectionsSvg = svg.selectAll('.arc').data(pie(sections)).enter().append('g').attr('id', function (d) {
        return "section-".concat(d.data.label);
      }).on('click', handleSectionClick);

      // Define an arc generator for the sections
      var path = d3__namespace.arc().outerRadius(function (d) {
        return d.data.outerRadius * (radius - 3);
      }).innerRadius(function (d) {
        return d.data.innerRadius * radius;
      }).startAngle(function (d) {
        return d.data.startAngle > d.data.endAngle ? (d.data.startAngle - 360) * (Math.PI / 180) : d.data.startAngle * (Math.PI / 180);
      }).endAngle(function (d) {
        return d.data.endAngle * (Math.PI / 180);
      });

      // Add path elements to sections
      sectionsSvg.append('path').attr('d', path).attr('fill', function (d) {
        return d.data.color;
      }).attr('fill-opacity', opacity).style('cursor', 'pointer').style('filter', function (d) {
        return d.data.selected ? selectedSectiondropShadowFilter : unSelectedSectiondropShadowFilter;
      }).attr('stroke', function (d) {
        return d.data.selected ? sectionStrokeColor : d.data.color;
      }).attr('stroke-width', sectionBorderStroke(radius));

      // Add rectangles as background for section labels
      sectionsSvg.append('rect').attr('x', function (d) {
        var centroid = path.centroid(d);
        return centroid[0] - radius * 0.058;
      }).attr('y', function (d) {
        var centroid = path.centroid(d);
        return centroid[1] - radius * 0.054;
      }).attr('width', sectionRectWidth(radius)).attr('height', sectionRectHeight(radius)).attr('fill', function (d) {
        return d.data.selected ? unselecteSectionRecColor : d.data.color;
      }).attr('rx', radius * 0.02).attr('ry', radius * 0.02).style('cursor', 'pointer').attr('stroke', function (d) {
        return d.data.selected ? selectedSectionRecBorderColor : unselectedSectionRecBorderColor;
      }).attr('stroke-width', sectionRecBorderSrtoke(radius));

      // Add text elements for section labels
      sectionsSvg.append('text').attr('transform', function (d) {
        var centroid = path.centroid(d);
        return "translate(".concat(centroid, ")");
      }).attr('dy', '0.1em').attr('dx', '-0.3em').text(function (d) {
        return d.data.label;
      }).style('cursor', 'pointer').style('text-anchor', 'middle').style('font-size', sectionLabelFontSize(radius)).style('font-weight', sectionLabelFontWeight).style('fill', function (d, i) {
        return d.data.selected ? sectionLabelDefaultColor : sectionLabelSelectedColor;
      }).style('filter', function (d) {
        return d.data.selected ? '' : unSelectedSectionLabelShadow;
      });
    }

    // If targets exist and the view is enabled, they are rendered on the radar
    if (targets && !showSections) {
      // Define an arc generator for the points
      var pathPoint = d3__namespace.arc().outerRadius(function (d) {
        return d.data.radius * radius;
      }).innerRadius(function (d) {
        return d.data.radius * radius;
      }).startAngle(function (d) {
        return d.data.angle * (Math.PI / 180);
      }).endAngle(function (d) {
        return d.data.angle * (Math.PI / 180);
      });

      // Select all "arc" groups and bind the data to the points
      var point = svg.selectAll('.arc').data(pie(targets)).enter().append('g');

      // Add path elements to points
      point.append('path').attr('d', pathPoint).attr('fill', function (d) {
        return d.selected ? d.data.color : 'transparent';
      }).attr('stroke', 'white').attr('stroke-width', 2);

      // Add rectangles as background for point labels
      point.append('rect').attr('x', function (d) {
        var centroid = pathPoint.centroid(d);
        return centroid[0] - 3;
      }).attr('y', function (d) {
        var centroid = pathPoint.centroid(d);
        return centroid[1] - 3;
      }).attr('width', pointRectWidth(radius)).attr('height', pointRectHeight(radius)).style('filter', function (d) {
        return d.data.selected ? selectedPointRectborderShadow(d.data.color) : unSelectedPointRectborderShadow;
      }).attr('fill-opacity', function (d) {
        return d.data.selected ? '1' : '0.7';
      }).attr('fill', function (d) {
        return d.data.color;
      }).attr('rx', pointRectRx(radius)).attr('ry', pointRectRy(radius)).style('cursor', 'pointer').attr('stroke', function (d) {
        return d.data.selected ? selectedPointStrokeColor : d.data.color;
      }).attr('stroke-width', pointBorderStroke);

      // Add text elements for point labels
      point.append('text').attr('transform', function (d) {
        var centroid = pathPoint.centroid(d);
        return "translate(".concat(centroid, ")");
      }).attr('dy', '0.34em').attr('dx', radius * 0.05).text(function (d) {
        return d.data.label;
      }).style('font-size', pointLabelFontSize(radius)).style('text-shadow', pointLabelTextShadow).style('font-weight', pointLabelFontWeight).style('cursor', 'pointer').style('fill', pointLabelTextColor);
      point.on('click', handleTargetsClick);
      point.call(d3__namespace.drag().on('end', handleTargetDragEnd));
    }

    // Cleanup function to remove all elements from the SVG when unmounting the component
    return function () {
      svg.selectAll('*').remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConfig]);
  React.useEffect(function () {
    var timeout = setTimeout(function () {
      var isExecuted = false;
      if (!isExecuted) {
        var existSelected = sections.find(function (item) {
          return item.selected === true;
        });
        var circleElement = d3__namespace.select("#section-".concat(existSelected === null || existSelected === void 0 ? void 0 : existSelected.label)).node();
        if (circleElement) {
          d3__namespace.select(circleElement).dispatch('click');
        }
        isExecuted = true;
      }
    }, 0);
    return function () {
      return clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: styles.body,
    id: "chart"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      color: northColor,
      fontSize: northFontSize(radius),
      fontWeight: 'bold'
    }
  }, north), /*#__PURE__*/React__default["default"].createElement("svg", {
    width: "800px",
    ref: svgRef
  })));
}
RadarComponent.propTypes = {
  sections: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string.isRequired,
    startAngle: PropTypes__default["default"].number.isRequired,
    endAngle: PropTypes__default["default"].number.isRequired,
    innerRadius: PropTypes__default["default"].number.isRequired,
    outerRadius: PropTypes__default["default"].number.isRequired,
    startElevation: PropTypes__default["default"].number.isRequired,
    endElevation: PropTypes__default["default"].number.isRequired,
    color: PropTypes__default["default"].string.isRequired,
    selected: PropTypes__default["default"].bool.isRequired,
    value: PropTypes__default["default"].number.isRequired
  })).isRequired,
  setSections: PropTypes__default["default"].func,
  targets: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    label: PropTypes__default["default"].string.isRequired,
    angle: PropTypes__default["default"].number.isRequired,
    radius: PropTypes__default["default"].number.isRequired,
    elevation: PropTypes__default["default"].number.isRequired,
    color: PropTypes__default["default"].string.isRequired,
    selected: PropTypes__default["default"].bool.isRequired
  })).isRequired,
  settTargets: PropTypes__default["default"].func,
  showSections: PropTypes__default["default"].bool,
  onClick: PropTypes__default["default"].func,
  onDrag: PropTypes__default["default"].func,
  config: PropTypes__default["default"].shape({
    radius: PropTypes__default["default"].string.isRequired,
    colorCircles: PropTypes__default["default"].string.isRequired,
    strokeLines: PropTypes__default["default"].number.isRequired,
    strokeCircles: PropTypes__default["default"].number.isRequired
  }).isRequired
};

var returnLibrary = function returnLibrary() {
  return {
    RadarComponent: RadarComponent,
    ReferenceSectionSVG: generateReferencesDOM,
    UpdatePositionCircle: setPositionCircle
  };
};
var index = returnLibrary();

module.exports = index;
