import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import JobCard from "../components/JobCard";
import { getBookmarks } from "../services/bookmarkService";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, MainTabParamList, Job } from "../navigation/types";

type BookmarksScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Bookmarks">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function BookmarksScreen({ navigation }: BookmarksScreenProps) {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await getBookmarks();
      setBookmarks(savedBookmarks);
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadBookmarks);
    return unsubscribe;
  }, [navigation]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={bookmarks}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          onPress={() => navigation.navigate("JobDetail", { job: item })}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<Text>No bookmarks yet</Text>}
    />
  );
}
