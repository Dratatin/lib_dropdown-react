![made-with-node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![made-with-react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

# dropdown-react library

A simple customizable react dropdown component.

## Installation
```npm install @dratatin/dropdown-react```
or
```yarn add @dratatin/dropdown-react```

## Usage
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Dropdown } from "@dratatin/dropdown-react";

const MyComponent = () => {
  return (
    <div>
      <Dropdown
        options={["option1", "option2", "option3", "option4", "option5"]}
      />
    </div>
  )
};
```

## Props
|Label|Type|Required|Default|
|:----|:----:|:------:|:----:|
|options | string[ ] | Yes | N/A |
|value | string | No | ```options[0]``` |
|setValue | callback() | No | N/A |
|name | string | No | ```"basic"``` |
|className | string | No | N/A |
|labelledby | string | No | N/A |


## Features
- Personalize the style of the dropdown with your className or overwrite style on the current className
```
.className{} (container)

.className__btn{}
.className__btn__value{}
.className__btn__icon{}

.className__list{}
.className__list__item{}
.className__list__item__content{}
```
- Manage dropdown value with (value and setValue props)
```jsx
const MyComponent = () => {
  const options = ["option1", "option2", "option3", "option4", "option5"]
  const [selected, setSelected] = useState(options[0])
  return (
    <div>
      <Dropdown
        options={datas}
        value={selected}
        setValue={(value) => setSelected(value)}
      />
    </div>
  )
};
```