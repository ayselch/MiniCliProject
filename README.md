# Tasks - React Native Product Catalog App

A modern React Native application featuring product browsing, search functionality, and favorites management. This app fetches product data from an API and allows users to browse, search, and save their favorite products.

## 🚀 Features

- **Product Browsing**: Browse products in a grid layout with images, titles, and descriptions
- **Search Functionality**: Real-time search through products by title
- **Favorites Management**: Add/remove products to/from favorites with persistent storage
- **Pull-to-Refresh**: Refresh product data with pull-to-refresh gesture
- **Responsive Design**: Optimized for both Android and iOS devices
- **Persistent Storage**: Favorites are stored locally using AsyncStorage
- **Navigation**: Tab-based navigation between Home and Favorites pages

## 📱 Screenshots

The app consists of two main screens:
- **Home Page**: Displays all products with search and favorites functionality
- **Favorites Page**: Shows saved favorite products with remove functionality

## 🛠️ Technologies Used

- **React Native 0.80.1**: Core framework
- **React Navigation**: Navigation between screens
- **AsyncStorage**: Local data persistence
- **React Native Vector Icons**: Icon components
- **DummyJSON API**: Product data source

## 📦 Installation

### Prerequisites

Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository (if applicable)
cd tasks

# Install dependencies
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

### Step 2: Start Metro

```bash
# Start the Metro bundler
npm start

# OR with cache reset
npx react-native start --reset-cache
```

### Step 3: Run the Application

#### Android
```bash
# Run on Android
npm run android

# OR using React Native CLI
npx react-native run-android
```

#### iOS
```bash
# Run on iOS
npm run ios

# OR using React Native CLI
npx react-native run-ios
```

## 🏗️ Project Structure

```
tasks/
├── components/
│   └── CardComponents.jsx      # Product card component with favorites
├── screens/
│   ├── HomeScreens.jsx        # Main home screen container
│   ├── NewsDetails.jsx        # Product detail screen
│   └── tabs/
│       ├── HomePage.jsx       # Home tab with product grid
│       └── FavPage.jsx        # Favorites tab
├── App.jsx                    # Main app component with navigation
├── index.js                   # App entry point
└── package.json              # Dependencies and scripts
```

## 🔧 Key Components

### HomePage.jsx
- Fetches products from DummyJSON API
- Implements search functionality
- Displays products in a 2-column grid
- Handles pull-to-refresh and infinite scroll

### FavPage.jsx
- Displays saved favorite products
- Allows removal of favorites
- Implements empty state when no favorites exist
- Auto-refreshes when tab comes into focus

### CardComponents.jsx
- Renders individual product cards
- Handles add/remove favorites functionality
- Manages favorite state with AsyncStorage
- Displays product image, title, and description

## 🎯 API Integration

The app uses the [DummyJSON Products API](https://dummyjson.com/products) to fetch product data:

```javascript
const response = await fetch('https://dummyjson.com/products')
const result = await response.json()
```

## 💾 Data Persistence

Favorites are stored locally using AsyncStorage:

```javascript
// Save favorites
await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))

// Load favorites
const storedFavorites = await AsyncStorage.getItem('favorites')
```

## 🎨 Styling & Design

- **Color Scheme**: Green theme with complementary colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Responsive grid layout for products
- **Icons**: Material Icons for favorites and navigation

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Try clearing cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean and rebuild with `cd android && ./gradlew clean`
3. **iOS build issues**: Clean build folder in Xcode or run `cd ios && pod install`
4. **AsyncStorage issues**: Ensure proper error handling in async functions

### Debug Logs

The app includes console logs for debugging favorites functionality:
- Check React Native debugger console for favorite operations
- Logs show when items are added/removed from favorites
- Network errors are logged for API calls

## 📋 Available Scripts

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint
```

## 🔮 Future Enhancements

- [ ] Add product categories/filtering
- [ ] Implement product ratings and reviews
- [ ] Add cart functionality
- [ ] Implement user authentication
- [ ] Add product search suggestions
- [ ] Implement dark/light theme toggle
- [ ] Add product sharing functionality
- [ ] Implement offline mode

## 📝 Dependencies

### Main Dependencies
- `@react-native-async-storage/async-storage`: Local storage
- `@react-navigation/native`: Navigation framework
- `@react-navigation/bottom-tabs`: Tab navigation
- `@react-navigation/native-stack`: Stack navigation
- `react-native-vector-icons`: Icon components
- `react-native-gesture-handler`: Gesture handling
- `react-native-reanimated`: Animations
- `react-native-safe-area-context`: Safe area handling
- `react-native-screens`: Native screen optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

