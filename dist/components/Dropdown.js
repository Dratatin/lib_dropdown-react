"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("./style.css");

var _fullArrow = _interopRequireDefault(require("./full-arrow.svg"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useAccessibleDropdown = (options, value, setValue) => {
  const [isDropdownOpen, setIsDropdownOpen] = (0, _react.useState)(false);
  const [isFocus, setIsFocus] = (0, _react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, _react.useState)(0);
  const wrapperRef = (0, _react.useRef)(null);

  const handleKeyDown = e => {
    if (isDropdownOpen) {
      openDropdownHandler(e);
    } else {
      closedDropdownHandler(e);
    }
  };

  const openDropdownHandler = e => {
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

  const closedDropdownHandler = e => {
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
      case ' ': // Space

      case 'Enter':
        e.preventDefault();
        setIsDropdownOpen(true);
        setActiveIndex(options.findIndex(option => option === value));
        break;

      default:
    }
  };

  (0, _react.useEffect)(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }; // Bind the event listener


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return {
    isDropdownOpen,
    isFocus,
    activeIndex,
    setIsDropdownOpen,
    setIsFocus,
    setActiveIndex,
    handleKeyDown,
    wrapperRef
  };
};

function Dropdown(_ref) {
  let {
    options,
    value,
    setValue,
    name,
    labelId
  } = _ref;
  const [input, setInput] = (0, _react.useState)(options[0]);
  const {
    isDropdownOpen,
    isFocus,
    activeIndex,
    setIsDropdownOpen,
    setIsFocus,
    setActiveIndex,
    handleKeyDown,
    wrapperRef
  } = useAccessibleDropdown(options, input, setInput);
  (0, _react.useEffect)(() => {
    if (value && setValue) {
      setValue(input);
    }
  }, [input]);
  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown-ctn ".concat(name ? name + "-ctn" : ""),
    ref: wrapperRef,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React.createElement("button", {
    className: "dropdown-btn ".concat(name ? name + "-btn" : ""),
    onClick: () => {
      setIsDropdownOpen(!isDropdownOpen);
    },
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-controls": "".concat(name, "_dropdown"),
    "aria-labelledby": labelId,
    "aria-expanded": isDropdownOpen,
    "aria-activedescendant": "".concat(name, "_element_").concat(input),
    onFocus: () => setIsFocus(true),
    onBlur: () => setIsFocus(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dropdown-btn-content ".concat(name ? name + "-btn-content" : "")
  }, input), /*#__PURE__*/React.createElement("img", {
    src: _fullArrow.default,
    alt: "full arrow icon",
    className: "dropdown-btn-icon ".concat(name ? name + "-icon" : "")
  })), /*#__PURE__*/React.createElement("ul", {
    className: "dropdown-list ".concat(name ? name + "-list" : ""),
    role: "listbox",
    tabIndex: -1,
    "aria-multiselectable": false
  }, options.map((option, index) => /*#__PURE__*/React.createElement("li", {
    key: option,
    role: "option",
    "aria-selected": index === activeIndex,
    className: "dropdown-option ".concat(name ? name + "-opt" : "", " ").concat(option === input ? "chosen" : ""),
    onMouseOver: () => setActiveIndex(index)
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "".concat(name, "_radio"),
    checked: option === input,
    className: "radio",
    onChange: () => {
      setInput(option);
      setIsDropdownOpen(false);
    }
  }), option)))));
}

var _default = Dropdown;
exports.default = _default;