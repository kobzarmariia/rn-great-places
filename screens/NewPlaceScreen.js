import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';

import Colors from '../constants/Colors';
import { addPlace } from '../store/places-actions';
import ImagePicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = ({ navigation }) => {
	const [titleValue, setTitleValue] = useState('');
	const [selectedImage, setSelectedImage] = useState();
	const [selectedLocation, setSelectedLocation] = useState();

	const dispatch = useDispatch();

	const titleChangeHandler = text => {
		// validation
		setTitleValue(text);
	};

	const locationPickedHandler = useCallback(location => {
		setSelectedLocation(location);
	}, []);

	const savePlaceHandler = () => {
		dispatch(addPlace(titleValue, selectedImage, selectedLocation));
		navigation.goBack();
	};

	const imageTakenHandler = imagePath => {
		setSelectedImage(imagePath);
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title: </Text>
				<TextInput style={styles.textInput} value={titleValue} onChangeText={titleChangeHandler} />
				<ImagePicker onImageTaken={imageTakenHandler} />
				<LocationPicker navigation={navigation} onLocationPicked={locationPickedHandler} />
				<Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
			</View>
		</ScrollView>
	);
};

NewPlaceScreen.navigationOptions = {
	headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
});

export default NewPlaceScreen;
