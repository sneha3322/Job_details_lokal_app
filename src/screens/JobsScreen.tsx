import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  RefreshControl,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import JobCard from "../components/JobCard";
import { RootStackParamList, MainTabParamList, Job } from "../navigation/types";

const API_URL = "https://testapi.getlokalapp.com/common/jobs";

type JobsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Jobs">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function JobsScreen({ navigation }: JobsScreenProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(
    async (reset = false) => {
      if (loading || (!reset && !hasMore)) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}?page=${reset ? 1 : page}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const jsonData = await response.json();
        const newJobs = jsonData.results.map((job: any, index: number) => ({
          id: job.id || `temp-${index}`,
          title: job.title,
          location: job.primary_details?.Place || "Unknown",
          salary: job.salary_min
            ? `₹${job.salary_min} - ₹${job.salary_max}`
            : "Not specified",
          phone: job.whatsapp_no || "No contact",
          description: job.other_details || "No details available",
        }));

        setJobs((prev) => (reset ? newJobs : [...prev, ...newJobs]));
        setPage(reset ? 2 : page + 1);
        if (newJobs.length === 0) setHasMore(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading, hasMore, page]
  );

  useEffect(() => {
    fetchJobs(true);
  }, [fetchJobs]);

  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    fetchJobs(true);
  };

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={() => fetchJobs(true)} />
        </View>
      ) : (
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => navigation.navigate("JobDetail", { job: item })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={
            loading ? <ActivityIndicator style={{ padding: 10 }} /> : null
          }
          onEndReached={() => fetchJobs()}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", marginBottom: 10 },
});
