import "./style.css";
import Arrow from "./full-arrow.svg";
import React, { useState, useRef, useEffect } from "react";

const useAccessibleDropdown = (options, value, setValue) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFocus, setIsFocus] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectIndex, setSelectIndex] = useState(options.findIndex(option => option === value))

    const itemRef = useRef([])
    const wrapperRef = useRef(null);

    const handleKeyDown = (e) => {
        if (isDropdownOpen) {
            openDropdownHandler(e)
        } else {
            closedDropdownHandler(e)
        }
    }

    const scrollToOption = (index) => {
        itemRef.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    const openDropdownHandler = (e) => {
        e.preventDefault()
        switch (e.key) {
            case 'Up':
            case 'ArrowUp':
                e.preventDefault();
                const indexUp = activeIndex <= 0 ? options.length - 1 : activeIndex - 1;
                setActiveIndex(indexUp);
                scrollToOption(indexUp)
                return;
            case 'Down':
            case 'ArrowDown':
                e.preventDefault();
                const indexDown = activeIndex + 1 === options.length ? 0 : activeIndex + 1;
                setActiveIndex(indexDown);
                scrollToOption(indexDown)
                return;
            case 'Enter':
            case ' ': // Space
                e.preventDefault();
                setValue(options[activeIndex]);
                setSelectIndex(activeIndex)
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
                e.preventDefault();
                setIsDropdownOpen(true);
                setActiveIndex(selectIndex);
                scrollToOption(selectIndex)
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
        wrapperRef,
        itemRef
    }
}


function Dropdown({ options, value, setValue, name, className, labelledby }) {
    const [input, setInput] = useState(options[0])

    const { isDropdownOpen, isFocus, activeIndex, setIsDropdownOpen, setIsFocus, setActiveIndex, handleKeyDown, wrapperRef, itemRef } = useAccessibleDropdown(options, input, setInput)

    useEffect(() => {
        if (value && setValue) {
            setValue(input)
        }
    }, [input])

    return (
        <div
            className={`wd-dropdown ${className ? className : ""}`}
            ref={wrapperRef}
            onKeyDown={handleKeyDown}
        >
            <button
                className={`wd-dropdown__btn ${className ? className + "__btn" : ""}`}
                onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                }}
                role="combobox"
                aria-haspopup="listbox"
                aria-controls={`${name}_dropdown`}
                aria-labelledby={labelledby}
                aria-expanded={isDropdownOpen}
                aria-activedescendant={`${name}_element_${input}`}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            >
                <span className={`wd-dropdown__btn__value ${className ? className + "__btn__value" : ""}`}>{input}</span>
                <img src={Arrow} alt="full arrow icon" className={`wd-dropdown__btn__icon ${className ? className + "__btn__icon" : ""}`}></img>
            </button>
            <ul
                className={`wd-dropdown__list ${className ? className + "__list" : ""}`}
                id={`${name}_dropdown`}
                role="listbox"
                tabIndex={-1}
                aria-multiselectable={false}
            >
                {options.map((option, index) => (
                    <li
                        key={option}
                        ref={ref => itemRef.current[index] = ref}
                        id={`${name}_element_${option}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`wd-dropdown__list__item ${className ? className + "__list__item" : ""} ${option === input ? "chosen" : ""}`}
                        onMouseOver={() => setActiveIndex(index)}
                    >
                        <label
                            className={`wd-dropdown__list__item__content ${className ? className + "__list__item__content" : ""}`}
                        >
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

Dropdown.defaultProps = {
    name: "basic",
}

export default Dropdown