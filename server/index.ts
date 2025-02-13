import mockData from "./mock-data.json";

type Project = {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  projectManager: string;
  isFavorite: boolean;
};

type GetParams = {
  page?: number;
  size?: number;
  favourites?: boolean;
};

type PostPayload = {
  projectId: string;
  projectName: string;
  startDate: string;
  description: string;
  endDate: string;
  projectManager: string;
};

type PutPayload = {
  projectId: string;
  projectName: string;
  startDate: string;
  description: string;
  endDate: string;
  projectManager: string;
  isFavorite: boolean;
};

const projects: Project[] = [...mockData];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getData = async (params: GetParams = { page: 1, size: 10 }) => {
  await delay(80);

  const { page = 1, size = 10, favourites = false } = params;

  const filteredProjects = favourites
    ? projects.filter((project) => project.isFavorite)
    : projects;

  const start = (page - 1) * size;
  const end = start + size;

  const paginatedData = filteredProjects.slice(start, end);

  return {
    data: paginatedData,
    totalItems: filteredProjects.length,
    currentPage: page,
    totalPages: Math.ceil(filteredProjects.length / size),
  };
};

export const postData = async (payload: PostPayload) => {
  await delay(70);

  if (projects.some((p) => p.projectId === payload.projectId)) {
    throw new Error("Project with this ID already exists");
  }

  const newProject = { ...payload, isFavorite: false };
  projects.push(newProject);

  return newProject;
};

export const putData = async (id: string, payload: PutPayload) => {
  await delay(30);

  console.log(id);

  const index = projects.findIndex((p) => p.projectId === id);
  if (index === -1) {
    throw new Error("Project not found");
  }

  const updatedProject = {
    ...payload,
    projectId: id,
  };
  projects[index] = updatedProject;

  return updatedProject;
};

export const getDataById = async (id: string) => {
  await delay(100);

  const project = projects.find((p) => p.projectId === id);
  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const updateFav = async (id: string) => {
  await delay(50);

  const index = projects.findIndex((p) => p.projectId === id);
  if (index === -1) {
    throw new Error("Project not found");
  }

  const updatedProject = {
    ...projects[index],
    isFavorite: !projects[index].isFavorite,
  };

  projects[index] = updatedProject;

  return updatedProject;
};
