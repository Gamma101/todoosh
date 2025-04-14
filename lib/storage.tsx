import AsyncStorage from '@react-native-async-storage/async-storage';

export const addNote = async (newNote: object) => {
    try {

        const prevNotes = await AsyncStorage.getItem('notes');

        if(prevNotes){
            let notesData = JSON.parse(prevNotes);
            notesData.push(newNote);
            await AsyncStorage.setItem('notes', JSON.stringify(notesData));
        } else {
            await AsyncStorage.setItem('notes', JSON.stringify([newNote]));
        }
    } catch (error) {
        console.error("Error in addNote", error);
    }
}

export const deleteNote = async (id: string) => {
    try {
        const data = await AsyncStorage.getItem('notes');
        if(data) {
            const allNotes = JSON.parse(data);

            const filteredNots = allNotes.filter((note: { id: string; }) => note.id !== id);

            await AsyncStorage.setItem('notes', JSON.stringify(filteredNots));
        }
    } catch (error) {
        console.error("Error in deleteNote", id);
    }


}

export const getAllNotes = async () => {
    try {
        const value = await AsyncStorage.getItem('notes');
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.error("Error in getAllNotes", error);
    }
};

export const deleteAllNotes = async () => {
    try {
        const deletedNotes = await AsyncStorage.removeItem('notes');
    } catch (error) {
        console.error("Error in clearNotes", error);
    }
}