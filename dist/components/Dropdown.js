"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

require("./style.css");

var _fullArrow = _interopRequireDefault(require("./full-arrow.svg"));

var _react = _interopRequireWildcard(require("react"));

var useAccessibleDropdown = function useAccessibleDropdown(options, value, setValue) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isDropdownOpen = _useState2[0],
      setIsDropdownOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isFocus = _useState4[0],
      setIsFocus = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      activeIndex = _useState6[0],
      setActiveIndex = _useState6[1];

  var wrapperRef = (0, _react.useRef)(null);

  var handleKeyDown = function handleKeyDown(e) {
    if (isDropdownOpen) {
      openDropdownHandler(e);
    } else {
      closedDropdownHandler(e);
    }
  };

  var openDropdownHandler = function openDropdownHandler(e) {
    e.preventDefault();

    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
        return;

      case 'Down':
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(activeIndex + 1 === options.length ? 0 : activeIndex + 1);
        return;

      case 'Enter':
      case ' ':
        // Space
        e.preventDefault();
        setValue(options[activeIndex]);
        setIsDropdownOpen(false);
        return;

      case 'Esc':
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        return;

      case 'PageUp':
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        return;

      case 'PageDown':
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        return;

      default:
    }
  };

  var closedDropdownHandler = function closedDropdownHandler(e) {
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
      case ' ': // Space

      case 'Enter':
        e.preventDefault();
        setIsDropdownOpen(true);
        setActiveIndex(options.findIndex(function (option) {
          return option === value;
        }));
        break;

      default:
    }
  };

  (0, _react.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }; // Bind the event listener


    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return {
    isDropdownOpen: isDropdownOpen,
    isFocus: isFocus,
    activeIndex: activeIndex,
    setIsDropdownOpen: setIsDropdownOpen,
    setIsFocus: setIsFocus,
    setActiveIndex: setActiveIndex,
    handleKeyDown: handleKeyDown,
    wrapperRef: wrapperRef
  };
};

function Dropdown(_ref) {
  var options = _ref.options,
      value = _ref.value,
      setValue = _ref.setValue,
      name = _ref.name,
      labelId = _ref.labelId;

  var _useState7 = (0, _react.useState)(options[0]),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      input = _useState8[0],
      setInput = _useState8[1];

  var _useAccessibleDropdow = useAccessibleDropdown(options, input, setInput),
      isDropdownOpen = _useAccessibleDropdow.isDropdownOpen,
      isFocus = _useAccessibleDropdow.isFocus,
      activeIndex = _useAccessibleDropdow.activeIndex,
      setIsDropdownOpen = _useAccessibleDropdow.setIsDropdownOpen,
      setIsFocus = _useAccessibleDropdow.setIsFocus,
      setActiveIndex = _useAccessibleDropdow.setActiveIndex,
      handleKeyDown = _useAccessibleDropdow.handleKeyDown,
      wrapperRef = _useAccessibleDropdow.wrapperRef;

  (0, _react.useEffect)(function () {
    if (value && setValue) {
      setValue(input);
    }
  }, [input]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown-ctn ".concat(name ? name + "-ctn" : ""),
    ref: wrapperRef,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "dropdown-btn ".concat(name ? name + "-btn" : ""),
    onClick: function onClick() {
      setIsDropdownOpen(!isDropdownOpen);
    },
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-controls": "".concat(name, "_dropdown"),
    "aria-labelledby": labelId,
    "aria-expanded": isDropdownOpen,
    "aria-activedescendant": "".concat(name, "_element_").concat(input),
    onFocus: function onFocus() {
      return setIsFocus(true);
    },
    onBlur: function onBlur() {
      return setIsFocus(false);
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "dropdown-btn-content ".concat(name ? name + "-btn-content" : "")
  }, input), /*#__PURE__*/_react.default.createElement("img", {
    src: _fullArrow.default,
    alt: "full arrow icon",
    className: "dropdown-btn-icon ".concat(name ? name + "-icon" : "")
  })), /*#__PURE__*/_react.default.createElement("ul", {
    className: "dropdown-list ".concat(name ? name + "-list" : ""),
    role: "listbox",
    tabIndex: -1,
    "aria-multiselectable": false
  }, options.map(function (option, index) {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: option,
      role: "option",
      "aria-selected": index === activeIndex,
      className: "dropdown-option ".concat(name ? name + "-opt" : "", " ").concat(option === input ? "chosen" : ""),
      onMouseOver: function onMouseOver() {
        return setActiveIndex(index);
      }
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      name: "".concat(name, "_radio"),
      checked: option === input,
      className: "radio",
      onChange: function onChange() {
        setInput(option);
        setIsDropdownOpen(false);
      }
    }), option));
  })));
}

var _default = Dropdown;
exports.default = _default;