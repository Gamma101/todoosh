import {View, Text, TouchableWithoutFeedback, Animated, StyleSheet} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import {changeNote, deleteNote} from "@/lib/storage"; // Make sure you have this import

export default function Note({ categories, id, isCompleted, text, title, endDate, onDelete}: {
    endDate: Date,
    categories: Array<string>,
    id: string,
    isCompleted: boolean,
    text: string,
    title: string,
    onDelete: (id: string) => void // Add this prop
}): JSX.Element {

    const [noteComplete, setNoteComplete] = React.useState<boolean>();


    const handleChangeNote = async () => {
        const updatedNote = {
            endDate,
            categories,
            id,
            text,
            title,
            isCompleted: !noteComplete, // Toggle current state
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
            <Swipeable
                renderRightActions={renderRightActions}
                onSwipeableOpen={() => onDelete(id)}
                rightThreshold={40}
                friction={2}
            >
                <View className="flex flex-row gap-5 items-center my-2 bg-white p-5 w-[90%] self-center rounded-xl">
                    <TouchableWithoutFeedback onPress={async () => {
                        const newState = !noteComplete;
                        setNoteComplete(newState);
                        await handleChangeNote();
                    }}>
                        {noteComplete ? <Ionicons name="checkmark-circle-outline" className="bg-primary rounded-full" color="white" size={30} /> :
                            <Ionicons name="ellipse-outline" className="rounded-full" color="black" size={30} />}
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={noteComplete ? styles.doneNote : ""} className="font-bold">{title}</Text>
                        <Text style={noteComplete ? styles.doneNote : ""} className="">{text.length > 20 ? text.slice(0, 25) + "..." : text}</Text>
                    </View>
                </View>
            </Swipeable>
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