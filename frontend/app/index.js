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
			<SafeAreaView className='flex flex-col w-full h-full bg-[#f6fff8]'>
				<View className='grow'>
					<Text className='text-2xl '>Message Area</Text>
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
