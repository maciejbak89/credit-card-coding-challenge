<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <PaymentsMain />
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "./components/navigation/NavigationBar";
import PaymentsMain from "./components/payments/PaymentsMain";

export default {
  name: "App",

  components: {
    NavigationBar,
    PaymentsMain,
  },

  data: () => ({}),
};
</script>
