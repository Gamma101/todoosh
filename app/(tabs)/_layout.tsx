import React from 'react'
import {Tabs, useSegments} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import "../../global.css"
import { StatusBar } from "expo-status-bar";
import {useColorScheme} from "react-native";
import colors from "@/constants/colors";

export default function _Layout() {
    const theme = useColorScheme()
    const segments = useSegments()

    return (
        <>
        <StatusBar  style={theme === "dark" ? "light" : "dark"} backgroundColor={theme === "dark" ? "black" : "white"} translucent={true} />
        <Tabs screenOptions={{
            tabBarItemStyle: {
                alignItems: 'center',
                flexDirection: 'row',
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
                position: 'absolute',
                marginBottom: 20,
                borderRadius: 100,
                marginHorizontal: 30,
                backgroundColor: theme === "dark" ? colors.black : colors.white,
                borderTopWidth: 0,
                height: 50

            },
            headerTitleAlign: "center",

        }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({size, color}) => <Ionicons name="book" size={size} color={color} />,
                headerShown: false
            }} />
            <Tabs.Screen name="create" options={{
                tabBarIcon: ({ color}) => <Ionicons name="add-circle" size={30} color={color} />,
                headerShown: false,
                tabBarStyle: {display: segments[1] === "create" ? 'none' : "flex"}
            }} />
            <Tabs.Screen name="settings" options={{
                tabBarIcon: ({size, color}) => <Ionicons name="settings" size={size} color={color} />,
                headerShown: false
            }} />

        </Tabs>
        </>
    )
}
