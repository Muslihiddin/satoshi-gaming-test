import { getData, getDataById, postData, putData, updateFav } from "@/server";
import { QueryFunctionContext } from "@tanstack/react-query";
import type {
  FetchProjectParams,
  NewProjectPayload,
  UpdateProjectPayload,
} from "@/types";

export async function fetchProjects({ queryKey }: QueryFunctionContext) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, params] = queryKey as [string, FetchProjectParams];
  return await getData(params);
}

export async function updateFavorite(id: string) {
  return await updateFav(id);
}

export async function createProject(payload: NewProjectPayload) {
  return await postData(payload);
}

export async function getProject({ queryKey }: QueryFunctionContext) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id] = queryKey as [string, string];
  return await getDataById(id);
}

export async function updateProject(payload: UpdateProjectPayload) {
  console.log(payload);
  return await putData(payload.projectId, payload);
}
