import { API_ENDPOINTS, ActionStatus } from "./enums";

const API = "http://localhost:3001/api";

const MAX_EXECUTED_ACTION_DISPLAYED = 3;

const API_QUEUE_QUERIES = `?statuses=${ActionStatus.PENDING},${ActionStatus.EXECUTED}&count=${MAX_EXECUTED_ACTION_DISPLAYED}`;

export const API_ACTIONS = API + API_ENDPOINTS.ACTIONS;
export const API_CONFIG = API + API_ENDPOINTS.CONFIG;
export const API_QUEUE = API + API_ENDPOINTS.QUEUE + API_QUEUE_QUERIES;
