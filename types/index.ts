export type FetchProjectParams = {
  page: number;
  size: number;
};

export type Project = {
  projectId: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  isFavorite: boolean;
};

export type NewProjectPayload = {
  projectId: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
};

export type UpdateProjectPayload = {
  projectId: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  isFavorite: boolean;
};
