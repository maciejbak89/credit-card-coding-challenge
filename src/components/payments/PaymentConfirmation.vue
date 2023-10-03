<template>
  <v-container class="d-flex flex-column justify-center align-center mt-8">
    <v-row class="mb-12">
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <v-icon color="kinGreen" class="mb-10" style="font-size: 96px"
          >mdi-check-circle-outline</v-icon
        >
        <div class="text-h4 text-center">
          Thank you for your payment<span
            >, {{ $store.getters.getSubmissionResponse.firstName }}</span
          >!
        </div>
      </v-col>
    </v-row>
    <v-divider class="mb-12" style="width: 640px"></v-divider>
    <v-row class="mb-12">
      <v-col cols="12" class="text-center">
        <div class="mb-8">
          A receipt for this transaction ending with credit card number
          <span class="font-weight-medium">{{ lastFour }}</span>
          has been sent to your email.
        </div>
        <div class="mb-1">
          Your payment ID is:
          <span class="font-weight-bold">{{
            $store.getters.getSubmissionResponse.id
          }}</span>
        </div>
        <div>
          Your transaction number is:
          <span class="font-weight-medium">{{ randomTransaction }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn dark color="kinTeal" elevation="0" @click="returnHome"
          >View Transaction Details</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    randomTransaction: Math.floor(Math.random() * 100000000),
  }),
  computed: {
    lastFour() {
      return this.$store.getters.getSubmissionResponse.cardNumber
        ? this.$store.getters.getSubmissionResponse.cardNumber.substring(12, 16)
        : "";
    },
  },
  methods: {
    returnHome() {
      location.reload();
    },
  },
};
</script>

<style scoped></style>
