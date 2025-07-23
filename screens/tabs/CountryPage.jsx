import { useEffect, useState } from 'react';
import {
    FlatList, StatusBar, StyleSheet, useColorScheme, View, Text, ActivityIndicator, Platform,
    SafeAreaView, RefreshControl,
    TouchableOpacity,
    TextInput, 
} from 'react-native';

const CountryPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('');

    const [refreshing, setrefreshing] = useState(false)


    const fetchData = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all')

            if (!response.ok) {
                throw new Error('Network error')
            }
            const result = await response.json()
            setData(result)
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false)
            setrefreshing(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (error) {
        return (
            <View>
                <Text>{error}</Text>
            </View>
        )
    }
    if (loading) {
        return (
            <ActivityIndicator size="large" color='blue' />
        )
    }

    const onRefresh = () => {
        setrefreshing(true)
        setError('')
        fetchData()
    }

    const handleonEndReached = () => {
        if (!refreshing) {
            console.log('End reached')
        }
    }
//duzelt 



    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                onEndReached={handleonEndReached}
                onEndReachedThreshold={0.1}
                contentContainerStyle={styles.flatListContainer}
                columnWrapperStyle={styles.row}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <Text style={styles.name}>{item.name.common}</Text>
                            <Image source={{ uri: item.flags.png }} style={styles.image} />
                            <Text style={styles.region}>{item.region}</Text>
                        </View>
                    )
                }}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 40 : 0,
        backgroundColor: '#3E5F44',
    },
    flatListContainer: {
        paddingBottom: Platform.OS === 'android' ? 80 : 50,
    },
    row: {
        justifyContent: 'space-around',
    },
    container: {
        backgroundColor: '#3D8D7A',
        margin: 8,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: 180
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 4
    },
    region: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },

});

export default CountryPage