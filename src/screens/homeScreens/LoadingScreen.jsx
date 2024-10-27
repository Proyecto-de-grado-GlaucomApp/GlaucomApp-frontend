import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {postUploadImage} from "../../services/imageProcessingApi";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import ResultMessage from "../../components/home/ResultMessage";

const LoadingScreen = ({navigation}) => {
    const route = useRoute();
    const {uri} = route.params || {};
    const [loading, setLoading] = useState(true);
    const successRef = useRef(null); // Usar useRef para mantener el valor de success
    const responseDataRef = useRef(null); // Mantener los datos de la respuesta

    useEffect(() => {
        if (uri) {
            (async () => {
                await loadRequest(uri);
            })();
        }
    }, [uri]);

    const loadRequest = async (imageUri) => {
        try {
            const respuesta = await postUploadImage(imageUri);
            console.log('Respuesta del servidor:', respuesta);

            if (respuesta) {
                successRef.current = true;
                responseDataRef.current = respuesta;
                console.log('Entro aqui True');
            } else {
                successRef.current = false;
                console.log('Entro aqui False');
            }
        } catch (error) {
            console.log('Error al enviar la imagen:', error);
            successRef.current = false;
        } finally {
            setLoading(false);
            setTimeout(() => {
                const success = successRef.current;
                console.log('success:', success);
                if (success === true) {

                    navigation.navigate('Result', { responseData: responseDataRef.current });
                } else {
                    navigation.navigate('Home');
                }
            }, 2000);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingIndicator message="Procesando imagen..." />
            ) : (
                <ResultMessage success={successRef.current} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default LoadingScreen;
