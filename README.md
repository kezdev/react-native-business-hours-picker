# react-native-business-hours-picker

A React Native datetime picker with customizable hour ranges (e.g. 8am–8pm), minute intervals, and always-visible wheel UI.

## Install

```bash
npm install react-native-business-hours-picker
```

## Usage

```jsx
import BusinessHoursPicker from 'react-native-business-hours-picker';

<BusinessHoursPicker
  initialDate={new Date()}
  minHour={8}
  maxHour={20}
  minuteInterval={5}
  onSet={(date) => console.log('Selected:', date)}
  itemTextStyle={{ fontSize: 18, color: '#333', fontFamily: 'Courier' }}
  selectedIndicatorStyle={{ backgroundColor: '#eee' }}
/>
```

## Props

| Prop                   | Type     | Required | Description |
|------------------------|----------|----------|-------------|
| `initialDate`          | `Date`   | No       | Defaults to 3 days from now |
| `minHour`              | `number` | No       | Earliest hour to allow (24h format, e.g. `8` = 8am) |
| `maxHour`              | `number` | No       | Latest hour to allow (e.g. `20` = 8pm) |
| `minuteInterval`       | `number` | No       | Time interval between selectable minutes (e.g. `5`) |
| `onSet`                | `function(Date)` | Yes | Called every time the picker changes |
| `itemTextStyle`        | `object` | No       | Custom styles for the picker text items |
| `selectedIndicatorStyle` | `object` | No    | Custom style for the selected indicator background |

## Demo

![Screen Recording 2025-10-09 at 21 32 40](https://github.com/user-attachments/assets/c61d7152-cbfa-43f9-89ab-484fdfe137eb)
