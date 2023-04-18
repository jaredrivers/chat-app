import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { Button, Input, Icon } from "@rneui/base";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TextArea({ message, setMessage, handleSubmitMessage }) {
	return (
		<View className='flex flex-row p-2'>
			<TextInput
				placeholder='TEXT'
				className='grow px-3 border border-[#dcdcdc] rounded-full bg-white'
				onChangeText={(text) => setMessage(text)}
			/>
			<Button type='clear' onPress={handleSubmitMessage}>
				<Ionicons name='send-outline' size={20} color='#3A5D4F' />
			</Button>
		</View>
	);
}
