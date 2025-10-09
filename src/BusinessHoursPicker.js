import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WheelPicker from 'react-native-wheely';
import dayjs from 'dayjs';

const generateHours = (start = 8, end = 20) => {
    const hours = [];
    for (let i = start; i <= end; i++) {
        hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
};

const generateMinutes = (interval = 5) => {
    const minutes = [];
    for (let i = 0; i < 60; i += interval) {
        minutes.push(i.toString().padStart(2, '0'));
    }
    return minutes;
};

const BusinessHoursPicker = ({
         onSet,
         initialDate = new Date(),
         minHour = 8,
         maxHour = 20,
         minuteInterval = 5,
         itemTextStyle,
         selectedIndicatorStyle,
     }) => {
    const initial = dayjs(initialDate);
    const [selectedDate, setSelectedDate] = useState(() => {
        const diff = initial.startOf('day').diff(dayjs().startOf('day'), 'day');
        return diff === 0 ? 'Today' : initial.format('ddd D MMM');
    });
    const [selectedHour, setSelectedHour] = useState(initial.hour().toString().padStart(2, '0'));
    const [selectedMinute, setSelectedMinute] = useState(
        (Math.round(initial.minute() / minuteInterval) * minuteInterval).toString().padStart(2, '0')
    );

    const hours = generateHours(minHour, maxHour);
    const minutes = generateMinutes(minuteInterval);
    const dates = [...Array(90)].map((_, i) => {
        const d = dayjs().add(i, 'day');
        return i === 0 ? 'Today' : d.format('ddd D MMM');
    });

    const emitChange = (newDateStr = selectedDate, newHour = selectedHour, newMinute = selectedMinute) => {
        const dayOffset = Math.max(0, dates.findIndex(d => d === newDateStr || (newDateStr === 'Today' && d === 'Today')));
        const fullDate = dayjs()
            .add(dayOffset, 'day')
            .hour(parseInt(newHour, 10))
            .minute(parseInt(newMinute, 10))
            .second(0)
            .millisecond(0)
            .toDate();

        if (typeof onSet === 'function') {
            onSet(fullDate);
        }
    };

    const dateIndex = dates.findIndex(d => d === selectedDate);

    return (
        <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerRow}>
                    <WheelPicker
                        selectedIndex={dateIndex >= 0 ? dateIndex : 0}
                        options={dates}
                        onChange={i => {
                            const newDate = dates[i];
                            setSelectedDate(newDate);
                            emitChange(newDate, selectedHour, selectedMinute);
                        }}
                        style={styles.picker}
                        itemTextStyle={[styles.wheelItemText, itemTextStyle]}
                        selectedIndicatorStyle={[styles.selectedIndicator, selectedIndicatorStyle]}
                    />
                    <View style={styles.timeRow}>
                        <WheelPicker
                            selectedIndex={hours.indexOf(selectedHour)}
                            options={hours}
                            onChange={i => {
                                const newHour = hours[i];
                                setSelectedHour(newHour);
                                emitChange(selectedDate, newHour, selectedMinute);
                            }}
                            style={styles.picker}
                            itemTextStyle={[styles.wheelItemText, itemTextStyle]}
                            selectedIndicatorStyle={[styles.selectedIndicator, selectedIndicatorStyle]}
                        />
                        <Text style={styles.timeColon}>:</Text>
                        <WheelPicker
                            selectedIndex={minutes.indexOf(selectedMinute)}
                            options={minutes}
                            onChange={i => {
                                const newMinute = minutes[i];
                                setSelectedMinute(newMinute);
                                emitChange(selectedDate, selectedHour, newMinute);
                            }}
                            style={styles.picker}
                            itemTextStyle={[styles.wheelItemText, itemTextStyle]}
                            selectedIndicatorStyle={[styles.selectedIndicator, selectedIndicatorStyle]}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerWrapper: {
        width: '100%',
        backgroundColor: '#fff',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    picker: {
        height: 200,
        width: 100,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wheelItemText: {
        fontSize: 22,
        color: '#888',
        textAlign: 'center',
        fontFamily: 'System',
    },
    timeColon: {
        fontSize: 22,
        color: '#888',
        textAlign: 'center',
        fontFamily: 'System',
        paddingHorizontal: 4,
    },
    selectedIndicator: {
        borderColor: '#ccc',
    }
});

export default BusinessHoursPicker;