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

  // GET:
  // fetchBrokers(offset) {
  //   const config = { headers: { Authorization: `Bearer ${store.state.token}` } };
  //   return http.get(`/api/brokers?offset=${offset}`, config);
  // }

  // GET 1:
  // fetchDriver(id) {
  //   const config = { headers: { Authorization: `Bearer ${store.state.token}` } };
  //   return http.get(`/api/drivers/${id}`, config);
  // }

  // PUT:
  // editDriver(id, data) {
  //   const config = {
  //     headers: { Authorization: `Bearer ${store.state.token}` },
  //   };
  //   return http.put(`/api/drivers/${id}`, data, config);
  // }

  // DELETE:
  // deleteDriver(id) {
  //   const config = { headers: { Authorization: `Bearer ${store.state.token}` } };
  //   return http.delete(`/api/drivers/${id}`, config);
  // }
}

export default new AppService();

// const checkPatientsInTimeInterval = () => {
//   logger.info("Request to check-patients-in-time-interval");

//   const day = moment().utc().isoWeekday();
//   const hour = moment().utc().hour();

//   return new Promise(async (resolve, reject) => {
//     if (typeof day === "number" && typeof hour === "number") {
//       try {
//         await database
//           .fetchPatientsByTimeInterval({ day: day, hour: hour })
//           .then((res) => {
//             resolve(res);
//           })
//           .catch((err) => {
//             logger.log(err);
//           });
//       } catch (error) {
//         logger.error(error);
//       }
//     } else {
//       error =
//         "Request to check-patients-in-time-interal failed, startTime or endTime missing.";
//       logger.error(error);
//       reject(error);
//     }
//   });
// };
