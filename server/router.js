import Request from "./controllers/request";

export function adentifyRouter(app) {
  app.post("/api/request", Request.fetchRequests);
}
