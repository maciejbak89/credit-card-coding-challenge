import http from "../http-common";

class AppService {
  submitCreditCardData(data) {
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    return http.post("/posts", data, config);
  }
}

export default new AppService();
