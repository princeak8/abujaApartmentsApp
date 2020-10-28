import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const Spinner = ({ size, style, color }) => {
    const {spinnerStyle} = styles;
    const spinnerColor = color ? color : 'white';
    return (
        <View style={[styles.spinnerStyle, style]}>
            <ActivityIndicator size={ size || 'large'} color={spinnerColor} />
        </View>
    );
}

const styles = {
    spinnerStyle: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export { Spinner };