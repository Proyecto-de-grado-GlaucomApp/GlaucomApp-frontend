import {useField} from "formik";
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons';

const InputField = ({name, placeholder, iconName, secureTextEntry = false, ...props}) => {
    const [field, meta, helpers] = useField(name);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(secureTextEntry);

    const togglePasswordVisibility = () => {
        if (secureTextEntry) {
            setIsPasswordVisible(!isPasswordVisible);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#4E4E4E"
                    secureTextEntry={isPasswordVisible}
                    value={field.value}
                    onChangeText={value => helpers.setValue(value)}
                    style={styles.input}
                    {...props}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.viewIcon}>
                    <Ionicons
                        name={isPasswordVisible ? "eye-off" : iconName}
                        size={24}
                        color="#4E4E4E"
                    />
                </TouchableOpacity>

            </View>
            {meta.error && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        marginVertical: 10,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#4E4E4E',
        fontFamily: 'SansationRegular',
    },
    viewIcon: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: 'rgb(255,255,255)',
    },
    errorText: {
        color: 'rgb(255,255,255)',
        marginLeft: 10,
        fontFamily: 'SansationRegular',
    },
});

export default InputField;
