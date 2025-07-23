import { useEffect, useState } from 'react';
import {
    FlatList, StatusBar, StyleSheet, useColorScheme, View, Text, ActivityIndicator, Platform,
    SafeAreaView, RefreshControl,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';


import CardComponents from '../../components/CardComponents'

const PAGE_SIZE = 10;

const HomePage = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [refreshing, setrefreshing] = useState(false)


    const fetchData = async () => {
        if (!hasMore || loading) return;

        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`)

            if (!response.ok) {
                throw new Error('Network error')
            }
            const result = await response.json()
            const newData = result.products.slice(0, PAGE_SIZE);

            const filteredNewData = newData.filter(newItem =>
                !data.some(existItem => existItem.id === newItem.id)
            );

            const updatedData = [...data, ...filteredNewData];

            setData(updatedData);
            setSkip((prev) => prev + PAGE_SIZE)


            if (searchQuery.trim() !== '') {
                const filtered = updatedData.filter(product =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                setFilteredData(filtered);
            } else {
                setFilteredData(updatedData);
            }

            if (updatedData.length >= result.total) {
                setHasMore(false);
            }

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
            <View style={styles.safeArea}>
                <Text>{error}</Text>
            </View>
        )
    }
    if (loading && data.length === 0) {
        return (
            <ActivityIndicator style={styles.loadingIndicator} size="large" color='blue' />
        )
    }

    const onRefresh = () => {
        setrefreshing(true)
        setSkip(0)
        setData([])
        setFilteredData([])
        setHasMore(true)
        setError('')
        fetchData()

    }

    const handleonEndReached = () => {
        if (!refreshing && !loading && hasMore) {
            fetchData();
        }
    }

    const handleChange = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(product =>
                product.title.toLowerCase().includes(text.toLowerCase())
            )
            setFilteredData(filtered);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={'#aaa'}
                    style={styles.searchInput}
                    onChangeText={handleChange}
                    value={searchQuery}
                />

                <View style={{ justifyContent: 'flex-end', paddingLeft: 10 }}>
                    <Feather name="search" size={22} color={isDarkMode ? 'white' : 'black'} />
                </View>
            </View>
            <FlatList
                data={filteredData}
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
                        <TouchableOpacity
                            onPress={() => {
                                navigation.getParent()?.navigate('NewsDetails', {
                                    image: item.thumbnail,
                                    title: item.title,
                                    description: item.description,
                                })
                            }}
                        >
                            <CardComponents
                                image={item.thumbnail}
                                title={item.title}
                                description={item.description}
                            />
                        </TouchableOpacity>
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
    loadingIndicator: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 40 : 0,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 16,
        height: 40,
        width: '100%'
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        backgroundColor: '#E8FFD7',
        borderRadius: 8,
        paddingHorizontal: 12,

    },
    flatListContainer: {
        paddingBottom: Platform.OS === 'android' ? 80 : 50,
    },
    row: {
        justifyContent: 'space-around',
    },
    container: {
        margin: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: 'gray',
        width: 200,
        height: 200,
        backgroundColor: '#93DA97',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: '#5E936C',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    price: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black'
    }
});

export default HomePage