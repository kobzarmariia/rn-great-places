import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = ({ onImageTaken }) => {
	const [pickedImage, setPickedImage] = useState(null);

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
		if (result.status != 'granted') {
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant camera permissions to use this app.',
				[{ text: 'Okay ' }]
			);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		setPickedImage(image.uri);
		onImageTaken(image.uri);
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>No image picked yet.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
			</View>
			<Button title="Take image" color={Colors.primary} onPress={takeImageHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
		marginBottom: 15,
	},
	imagePreview: {
		marginBottom: 10,
		width: '100%',
		height: 150,
		borderColor: '#ccc',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		marginBottom: 10,
		width: '100%',
		height: 150,
		borderColor: '#ccc',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ImgPicker;
