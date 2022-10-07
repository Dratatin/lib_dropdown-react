import "./style.css";
import Arrow from "./full-arrow.svg";
import { useState, useRef, useEffect } from "react";

const useAccessibleDropdown = (options, value, setValue) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFocus, setIsFocus] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const wrapperRef = useRef(null);

    const handleKeyDown = (e) => {
        if (isDropdownOpen) {
            openDropdownHandler(e)
        } else {
            closedDropdownHandler(e)
        }
    }

    const openDropdownHandler = e => {
        e.preventDefault()
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
            case ' ': // Space
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
    }

    const closedDropdownHandler = e => {
        switch (e.key) {
            case 'Up':
            case 'ArrowUp':
            case 'Down':
            case 'ArrowDown':
            case ' ': // Space
            case 'Enter':
                e.preventDefault()
                setIsDropdownOpen(true);
                setActiveIndex(options.findIndex(option => option === value));
                break
            default:
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        // Bind the event listener
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
    }
}


function Dropdown({ options, value, setValue, name, labelId }) {
    const [input, setInput] = useState(options[0])

    const { isDropdownOpen, isFocus, activeIndex, setIsDropdownOpen, setIsFocus, setActiveIndex, handleKeyDown, wrapperRef } = useAccessibleDropdown(options, input, setInput)

    useEffect(() => {
        if (value && setValue) {
            setValue(input)
        }
    }, [input])

    return (
        <div
            className={`dropdown-ctn ${name ? name + "-ctn" : ""}`}
            ref={wrapperRef}
            onKeyDown={handleKeyDown}
        >
            <button
                className={`dropdown-btn ${name ? name + "-btn" : ""}`}
                onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                }}
                role="combobox"
                aria-haspopup="listbox"
                aria-controls={`${name}_dropdown`}
                aria-labelledby={labelId}
                aria-expanded={isDropdownOpen}
                aria-activedescendant={`${name}_element_${input}`}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            >
                <span className={`dropdown-btn-content ${name ? name + "-btn-content" : ""}`}>{input}</span>
                <img src={Arrow} alt="full arrow icon" className={`dropdown-btn-icon ${name ? name + "-icon" : ""}`}></img>
            </button>
            <ul
                className={`dropdown-list ${name ? name + "-list" : ""}`}
                role="listbox"
                tabIndex={-1}
                aria-multiselectable={false}
            >
                {options.map((option, index) => (
                    <li
                        key={option}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`dropdown-option ${name ? name + "-opt" : ""} ${option === input ? "chosen" : ""}`}
                        onMouseOver={() => setActiveIndex(index)}
                    >
                        <label>
                            <input
                                type="radio"
                                name={`${name}_radio`}
                                checked={option === input}
                                className="radio"
                                onChange={() => {
                                    setInput(option)
                                    setIsDropdownOpen(false)
                                }}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default Dropdown