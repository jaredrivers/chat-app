import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import { Button } from "@rneui/base";
import TextArea from "../components/textarea";
import { useState } from "react";

export default function Home() {
	const [message, setMessage] = useState("");

	const handleSubmitMessage = () => {
		if (message.trim() == "") {
			return;
		} else {
			console.log(message);
		}
	};

	return (
		<View>
			<SafeAreaView style={styles.background}>
				<View style={styles.chatArea}>
					<Text>Message Area</Text>
				</View>
				<TextArea
					message={message}
					setMessage={setMessage}
					handleSubmitMessage={handleSubmitMessage}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		display: "flex",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		backgroundColor: "#f6fff8",
	},
	chatArea: {
		flexGrow: 1,
		backgroundColor: "red",
	},
});
