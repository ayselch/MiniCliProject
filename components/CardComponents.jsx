import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';



const CardComponents = ({ image, title, description }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        checkIfFavorite()
    }, [image, title]) 

    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites')
            if (favorites) {
                const parsedFavorites = JSON.parse(favorites)
                const isFav = parsedFavorites.some(item => item.title === title &&
                    item.image === image)
                console.log(`Checking favorite for ${title}: ${isFav}`) 
                setIsFavorite(isFav)
            } else {
                setIsFavorite(false)
            }
        } catch (error) {
            console.error('Error checking favorite:', error);
        }
    }

    const storedFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites')
            let favoritesArray = favorites ? JSON.parse(favorites) : []

            const newFavorite = {
                image,
                title,
                description,
                id: Date.now().toString() 
            }

            const alreadyExists = favoritesArray.some(item =>
                item.title === title && item.image === image
            )

            if (!alreadyExists) {
                favoritesArray.push(newFavorite)
                await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
                console.log('Added to favorites:', newFavorite);
                setIsFavorite(true)
                Alert.alert('Success', `${title} added to favorites`)
            }

        } catch (error) {
            console.error('Error storing favorite:', error);
        }
    }

    const removeFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites')
            if (favorites) {
                let favoritesArray = JSON.parse(favorites)
                favoritesArray = favoritesArray.filter(item => !(item.title === title && item.image === image
                    && item.description === description)
                )
                await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))

                setIsFavorite(false)
                Alert.alert('Success', `${title} removed from favorites`)

                console.log('Removed from favorites:');

            }
        } catch (error) {
            console.error(error);

        }
    }

    const toggleFavorite = async () => {
        if (isFavorite) {
            await removeFavorite()
        } else {
            await storedFavorite()
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.favIcon} onPress={toggleFavorite}>
                <MaterialIcons
                    color={isFavorite ? 'green' : 'white'}
                    name={isFavorite ? "favorite" : "favorite-border"} size={24} />
            </TouchableOpacity>

            <Image style={styles.image} source={{ uri: image }} />
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} style={styles.description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 4
    },
    description: {
        fontSize: 12,
        color: '#E0E0E0',
        textAlign: 'center'
    },
    date: {
        fontSize: 10,
        color: '#B0B0B0',
        marginTop: 4
    },
    favIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
    }
})

export default CardComponents