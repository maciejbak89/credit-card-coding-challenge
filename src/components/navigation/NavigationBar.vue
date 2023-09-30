<template>
  <v-app-bar app color="kinTeal" dark>
    <div class="text-h6">Kin Front-End Coding Challenge</div>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2"
          icon
          @click="toggleLightDarkTheme"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </template>
      <span v-if="!$vuetify.theme.isDark">Switch to Dark Mode</span>
      <span v-if="$vuetify.theme.isDark">Switch to Light Mode</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  components: {},

  data: () => ({}),

  methods: {
    toggleLightDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.dispatch("setThemeDark", !!this.$vuetify.theme.dark);
    },
  },
};
</script>

<style scoped></style>
