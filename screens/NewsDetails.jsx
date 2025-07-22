import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const NewsDetails = ({ route, navigation }) => {
    const { image, title, description } = route?.params || {};


    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>
                    {title && title.length > 20 ? title.substring(0, 20) + '...' : title || 'No Title'}
                </Text>
            </View>

            <Image style={styles.image} source={{ uri: image }} />
            <Text style={styles.description}>{description}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 40 : 0,
        backgroundColor: '#3E5F44',
        padding: 13,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        alignSelf:"center",
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    description: {
        fontSize: 20,
        color: '#E0E0E0',
        marginTop: 20,
        paddingHorizontal: 16,
    }



})
export default NewsDetails