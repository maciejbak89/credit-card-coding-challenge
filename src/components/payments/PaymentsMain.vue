<template>
  <v-container class="d-flex flex-column justify-center align-center mt-8">
    <CreditCards class="mb-12" />
    <UserForm />
  </v-container>
</template>

<script>
import CreditCards from "./CreditCards";
import UserForm from "./UserForm";

export default {
  components: {
    CreditCards,
    UserForm,
  },

  data: () => ({}),
};
</script>

<style scoped></style>
