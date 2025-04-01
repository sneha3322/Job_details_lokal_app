export type RootStackParamList = {
  MainTabs: undefined;
  JobDetail: { job: Job };
};

export type MainTabParamList = {
  Jobs: undefined;
  Bookmarks: undefined;
};

export interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  phone: string;
  description?: string;
}
