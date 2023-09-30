import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    // dark: true,
    themes: {
      light: {
        // primary: "#607d8b",
        // secondary: "#009688",
        // accent: "#ffc107",
        // error: "#f44336",
        // warning: "#ff9800",
        // info: "#03a9f4",
        // success: "#8bc34a",
        kinTeal: "#167C80",
        kinGreen: "#007055",
        kinGray: "#545C52",
        kinBlack: "#212121",
      },
    },
  },
});
