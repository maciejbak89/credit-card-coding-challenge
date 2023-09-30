import http from "../http-common";
import { store } from "../store/store";

class AppService {
  addRecord(data) {
    const config = {
      headers: { Authorization: `Bearer ${store.state.token}` },
    };
    return http.post("/api/records", data, config);
  }
}

export default new AppService();
