import { View, Text, SafeAreaView, StyleSheet, Alert, TouchableOpacity, FlatList, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native';


const FavPage = () => {
    const [favorites, setFavorites] = useState([])

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites()
        }, [])
    )

    useEffect(() => {
        loadFavorites()
    }, [])

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites')
            if (storedFavorites) {
                const parsedFavorites = JSON.parse(storedFavorites)
                setFavorites(parsedFavorites)
            } else {
                setFavorites([])
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
            setFavorites([])
        }
    }

    const removeFavorite = async (itemToRemove) => {
        try {
            const updatedFavorites = favorites.filter(item =>
                !(item.title === itemToRemove.title &&
                    item.image === itemToRemove.image &&
                    item.description === itemToRemove.description)
            )

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            setFavorites(updatedFavorites)
            Alert.alert('Success', 'Removed from favorites')

        } catch (error) {
            console.error(error);

        }
    }

    const confirmRemove = (item) => {
        Alert.alert(
            'Remove Favorite',
            `Are you sure you want to remove ${item.title} from favorites?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', style: 'destructive', onPress: () => { removeFavorite(item) } }
            ]
        )
    }

    const renderFavoriteItem = ({ item }) => {
        return (
            <View style={styles.favoriteItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription} numberOfLines={3}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => confirmRemove(item)}>
                    <MaterialIcons name="delete" size={24} color="#FF6B6B" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>Favorites</Text>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item, index) => `${item.title}-${index}`}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="favorite-border" size={64} color="#B0B0B0" />
                    <Text style={styles.emptyText}>No Favorites Yet</Text>
                    <Text style={styles.emptySubText}>
                        Start adding items to your favorites by tapping the heart icon on any product!
                    </Text>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 50 : 0,
        backgroundColor: '#3E5F44',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    favoriteItem: {
        backgroundColor: '#3D8D7A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    itemContent: {
        flex: 1,
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 14,
        color: '#E0E0E0',
        lineHeight: 20,
    },
    removeButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 16,
        color: '#B0B0B0',
        textAlign: 'center',
        lineHeight: 24,
    },

})
export default FavPage