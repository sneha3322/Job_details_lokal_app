import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../services/bookmarkService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Job } from "../navigation/types";

// Define the props type for this screen
type JobDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "JobDetail"
>;

export default function JobDetailScreen({
  route,
  navigation,
}: JobDetailScreenProps) {
  const { job } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const bookmarks = await getBookmarks();
        setIsBookmarked(bookmarks.some((b) => b.id === job.id));
      } catch (error) {
        console.error("Error checking bookmark:", error);
      }
    };
    checkBookmark();
  }, [job.id]);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(job.id);
      } else {
        await addBookmark(job);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Text>Description: {job.description}</Text>
      <Button
        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        onPress={toggleBookmark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
