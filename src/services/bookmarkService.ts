import AsyncStorage from "@react-native-async-storage/async-storage";
import { Job } from "../navigation/types";

const BOOKMARKS_KEY = "bookmarked_jobs";

export const getBookmarks = async (): Promise<Job[]> => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    return [];
  }
};

export const addBookmark = async (job: Job): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    if (!bookmarks.some((b) => b.id === job.id)) {
      await AsyncStorage.setItem(
        BOOKMARKS_KEY,
        JSON.stringify([...bookmarks, job])
      );
    }
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

export const removeBookmark = async (jobId: number): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    const newBookmarks = bookmarks.filter((job) => job.id !== jobId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};
