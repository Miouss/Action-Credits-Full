import { API_ACTIONS, API_QUEUE, API_CONFIG } from "./config";
import { ActionName } from "../types/enums";

export function RequestFactory() {
  return {
    actions: {
      get: async () => await getActions(),
    },
    queue: {
      add: async (actionName: ActionName) => await addActionToQueue(actionName),
      get: async () => await getQueue(),
    },
    config: {
      get: async () => await getConfig(),
    },
  };
}

async function getQueue() {
  return await requestServer(API_QUEUE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getActions() {
  return await requestServer(API_ACTIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getConfig() {
  return await requestServer(API_CONFIG, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function addActionToQueue(actionName: ActionName) {
  return await requestServer(API_QUEUE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ actionName }),
  });
}

async function requestServer(url: RequestInfo | URL, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) throw await res.text();
  return res;
}
