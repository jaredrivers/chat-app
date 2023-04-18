import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { Button, Input, Icon } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TextArea({ message, setMessage, handleSubmitMessage }) {
	return (
		<View style={styles.container}>
			<TextInput
				placeholder='TEXT'
				style={styles.input}
				onChangeText={(text) => setMessage(text)}
			/>
			<Button style={styles.button} type='clear' onPress={handleSubmitMessage}>
				<Ionicons
					name='send-outline'
					size={20}
					style={styles.icon}
					color='#3A5D4F'
				/>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		paddingLeft: 10,
		paddingRight: 5,
		paddingVertical: 10,
		alignItems: "center",
	},
	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "#6b9080",
	},
	input: {
		flexGrow: 1,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 40,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#e3e3e3",
	},
});
