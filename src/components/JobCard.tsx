import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Job } from "../navigation/types";

type JobCardProps = {
  job: Job;
  onPress: () => void;
};

const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>Location: {job.location}</Text>
      <Text style={styles.salary}>Salary: {job.salary}</Text>
      <Text style={styles.phone}>Phone: {job.phone}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
  salary: {
    fontSize: 14,
    color: "#333",
  },
  phone: {
    fontSize: 14,
    color: "#888",
  },
});

export default JobCard;
