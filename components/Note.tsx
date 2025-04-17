import {View, Text, TouchableWithoutFeedback, Animated, StyleSheet, ScrollView, useColorScheme} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import {changeNote} from "@/lib/storage";
import Category from "@/components/Category";
import colors from "@/constants/colors";
import {formatDate, formatTime} from "@/lib/dateHandler";

export default function Note({ categories, id, isCompleted, text, title, endDate, endTime, onDelete}: {
    endDate: Date,
    endTime: Date,
    categories: Array<string>,
    id: string,
    isCompleted: boolean,
    text: string,
    title: string,
    onDelete: (id: string) => void
}): JSX.Element {

    const theme = useColorScheme()

    const [noteComplete, setNoteComplete] = React.useState<boolean>();



    const noteCategories = () => {
        return categories.map((category: string, i: number) => {
            return <Category isJustToWatch={true} categoryName={category} key={i} />
        })
    }
    const noteCategoriesComponent = noteCategories();

    const handleChangeNote = async () => {
        const updatedNote = {
            endDate,
            endTime,
            categories,
            id,
            text,
            title,
            isCompleted: !noteComplete,
        };
        await changeNote(updatedNote);
    };

    const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, 0.5, 1],
        });

        return (
            <TouchableWithoutFeedback onPress={() => onDelete(id)}>
                <View style={styles.deleteBox}>
                    <Animated.Text style={[styles.deleteText, {transform: [{translateX: trans}]}]}>
                        <Ionicons name="trash-outline" size={24} color="white" />
                    </Animated.Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    React.useEffect(() => {
        setNoteComplete(isCompleted);
    }, [isCompleted]);

    return (
        <GestureHandlerRootView>
            <View style={{backgroundColor: theme === "dark" ? colors.black : colors.white}} className={`${noteComplete ? "bg-blue-100" : "bg-white"} p-2 w-[90%] self-center rounded-xl mb-5`}>
                <Swipeable
                    renderRightActions={renderRightActions}
                    onSwipeableOpen={() => onDelete(id)}
                    rightThreshold={40}
                    friction={2}
                >
                    <View className={`flex flex-row items-center my-2 px-2`}>
                        <TouchableWithoutFeedback onPress={async () => {
                            const newState = !noteComplete;
                            setNoteComplete(newState);
                            await handleChangeNote();
                        }}>
                            {noteComplete ? <Ionicons name="checkmark-circle-outline" className="bg-primary rounded-full" color="white" size={30} /> :
                                <Ionicons name="ellipse-outline" className="rounded-full" color={theme === "dark" ? "white" : "black"} size={30} />}
                        </TouchableWithoutFeedback>
                        <View className="ml-2">
                            <Text style={{...noteComplete ? styles.doneNote : "", color: theme === "dark" ? colors.white : colors.black}} className="font-bold">{title}</Text>
                            {text.length > 0 && <Text style={{...noteComplete ? styles.doneNote : "", color: theme === "dark" ? colors.white : colors.black}} className="">{text.length > 20 ? text.slice(0, 25) + "..." : text}</Text>}
                        </View>
                    </View>

                </Swipeable>
                {categories.length > 0 &&
                    <ScrollView style={{borderRadius: 10, margin: 12}} horizontal>
                    <View className="flex flex-row gap-2">
                        {noteCategoriesComponent}
                    </View>
                </ScrollView>}

                <View className="flex flex-row gap-2 justify-between">
                    {
                        endTime &&
                        <View className="flex flex-row gap-2 px-3 items-center">
                            <Ionicons name="alarm-outline" size={20} color="white" className="bg-primary p-1 rounded-md" />
                            <Text style={{color: theme === "dark" ? colors.white : colors.black}}>{formatTime(new Date(endTime)).text}</Text>
                        </View>
                    }
                    {
                        endDate &&
                        <View className="flex flex-row gap-2 px-3 items-center">
                            <Ionicons name="calendar-outline" size={20} color="white" className="bg-primary p-1 rounded-md" />
                            <Text style={{color: theme === "dark" ? colors.white : colors.black}}>{formatDate(new Date(endDate)).text}</Text>
                        </View>
                    }

                </View>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '80%',
        marginTop: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
    doneNote: {
        textDecorationLine: "line-through",
    }
});