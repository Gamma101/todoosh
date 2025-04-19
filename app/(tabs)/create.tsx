import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert, useColorScheme
} from 'react-native'
import React, {useState} from 'react'
import colors from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {addNote} from "@/lib/storage";
import {uuid} from "expo-modules-core";
import {useFocusEffect, useRouter} from "expo-router";
import Category from "@/components/Category";
import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {formatDate, formatTime} from "@/lib/dateHandler";

export default function Create() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories]  = useState<string[]>([])
    const theme = useColorScheme()


    const [date, setDate] = useState<Date | null>(null);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);

    const [time, setTime] = useState<Date | null>(null);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const router = useRouter()

    const [textDate, setTextDate] = useState<string>("No Data Provided");
    const [textTime, setTextTime] = useState<string>("No Time Provided");

    function deleteCategory(categoryToDelete: string) {
        const newCategory = categories.filter(category => category != categoryToDelete);
        setCategories(newCategory);
    }

    const noteCategories = () => {
        return categories.map((category: string, i: number) => {
            return <Category isJustToWatch={false} categoryName={category} deleteFunction={() => deleteCategory(category)} key={i} />
        })
    }

    const noteCategoriesComponent = noteCategories();

    function onChangeDate(e: DateTimePickerEvent, selectedDate: Date | undefined) {
        if (selectedDate) {
            setDate(selectedDate);
            setShowDateTimePicker(false);
            setTextDate(formatDate(selectedDate).text)
        }

    }

    function onChangeTime(e: DateTimePickerEvent, selectedTime: Date | undefined) {
        if (selectedTime) {
            setTime(selectedTime);
            setShowTimePicker(false);
            setTextTime(formatTime(selectedTime).text);

        }
    }



    function addCategory(categoryToAdd: string) {
        if(!categories.includes(categoryToAdd) && categoryToAdd) {
            const newCategory = [...categories, categoryToAdd];
            setCategories(newCategory)

        }
        setCategory("")
    }

    function clearInputs() {
        setTitle("");
        setText("");
        setCategory("");
        setCategories([])
        setTime(null)
        setDate(null)
        setTextTime("No Time Provided");
        setTextDate("No Date Provided");
    }

    async function sendForm() {

        if(title.trim()) {
            const newNote = {
                title,
                text,
                endDate: date,
                endTime: time,
                isCompleted: false,
                categories: categories,
                id: uuid.v4()
            }
            await addNote(newNote);
            router.back();
            clearInputs();
        } else {
            Alert.alert("Please enter at least a title!");
        }



    }

    useFocusEffect(
        React.useCallback(() => {
            clearInputs()
        }, [])
    );

    return (
        <View style={{...styles.container, backgroundColor: theme === "dark" ? colors.darkBg : colors.whiteBg}}>
            <View className="bg-white py-5 px-5 flex-row justify-between" style={{backgroundColor: theme === "dark" ? colors.black : colors.white}}>

                <View className="flex flex-row gap-5">
                    <TouchableWithoutFeedback onPress={() => {router.back(); clearInputs()}}>
                        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={30} />
                    </TouchableWithoutFeedback>
                    <Text className="text-3xl font-bold text-primary">Todoosh</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => sendForm()}>
                    <Ionicons name={"checkmark"} color={colors.primary} size={30} />
                </TouchableWithoutFeedback>
            </View>

            <ScrollView  >
                <View style={styles.scrollView} >
                    <View style={{...styles.label, backgroundColor: theme === "dark" ? colors.black : colors.white}}>
                        <Text style={styles.inputTitle}>Title</Text>
                        <TextInput placeholderTextColor={colors.grey} value={title} onChangeText={(val) => setTitle(val)} placeholder="Enter a Title" style={{...styles.inputContainer, color: theme === "dark" ? colors.white : colors.black}}/>
                    </View>
                    <View style={{...styles.label, backgroundColor: theme === "dark" ? colors.black : colors.white}}>
                        <Text style={styles.inputTitle}>Note</Text>
                        <TextInput placeholderTextColor={colors.grey} value={text} onChangeText={(val) => setText(val)} multiline numberOfLines={5} placeholder="Enter additional info" style={{...styles.inputContainer, ...styles.textInput, color: theme === "dark" ? colors.white : colors.black}}/>
                    </View>
                    <View style={{...styles.label, backgroundColor: theme === "dark" ? colors.black : colors.white}}>
                        <Text style={styles.inputTitle}>Categories</Text>
                        <View className="flex flex-row justify-between items-center">
                            <TextInput placeholderTextColor={colors.grey} value={category} className="w-[80%]" onChangeText={(val) => setCategory(val)} placeholder="Enter Category" style={{...styles.inputContainer, color: theme === "dark" ? colors.white : colors.black}}/>
                            <TouchableOpacity onPress={() => addCategory(category)}>
                                <Ionicons className="bg-primary rounded-full p-2" color="white" name="add-outline" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-wrap flex-row gap-2 p-3">
                            {noteCategoriesComponent}
                        </View>
                    </View>
                    <View style={{...styles.label, backgroundColor: theme === "dark" ? colors.black : colors.white}}>
                        <Text style={styles.inputTitle}>Deadline</Text>
                        <View className="flex flex-row justify-between items-center mb-5">
                            <View style={styles.inputContainer} className="w-[80%] flex flex-row justify-between items-center">
                                <Text style={{color: colors.grey}} >{textDate}</Text>
                                <TouchableOpacity onPress={() => {setTextDate("No Date Provided"); setDate(null)}}>
                                    <Ionicons color={"#BE2528"} name="close-outline" size={20} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
                                <Ionicons className="bg-primary rounded-full p-2" color="white" name="calendar-outline" size={30} />
                            </TouchableOpacity>
                            {
                                showDateTimePicker && (<RNDateTimePicker onChange={onChangeDate} mode={"date"} value={date || new Date()} />)
                            }
                        </View>
                        <View className="flex flex-row justify-between items-center mb-5">
                            <View style={styles.inputContainer} className="w-[80%] flex flex-row justify-between items-center">
                                <Text style={{color: colors.grey}} >{textTime}</Text>
                                <TouchableOpacity onPress={() => {setTextTime("No Time Provided"); setTime(null)}}>
                                    <Ionicons color={"#BE2528"} name="close-outline" size={20} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                                <Ionicons className="bg-primary rounded-full p-2" color="white" name="alarm-outline" size={30} />
                            </TouchableOpacity>
                            {
                                showTimePicker && (<RNDateTimePicker onChange={onChangeTime} mode={"time"} value={time || new Date()} />)
                            }
                        </View>

                    </View>


                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    scrollView: {
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    inputContainer: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: colors.primary,

    },
    inputTitle: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
    },
    label: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
    },
    textInput: {
        height: 100,
        textAlignVertical: "top"
    }
})
