import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImageScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {imageUri} = route.params;

    const images = [
        {
            url: imageUri,
        },
    ];

    return (
        <View style={styles.container}>
            <ImageViewer
                testID="image-viewer"
                imageUrls={images}
                enableSwipeDown={true}
                onSwipeDown={() => navigation.goBack()}
                renderIndicator={() => null}
                renderHeader={() => null}
                enablePreload={true}
                useNativeDriver={true}
                backgroundColor="white"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

export default ViewImageScreen;
