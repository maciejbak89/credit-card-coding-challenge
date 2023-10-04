<template>
  <v-container class="d-flex flex-column justify-center align-center mt-8">
    <v-row class="mb-12">
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <v-icon
          color="kinGreen"
          class="mb-10"
          style="font-size: 96px"
          aria-label="Success checkmark for your payment confirmation"
          >mdi-check-circle-outline</v-icon
        >
        <div class="text-h4 text-center">
          Thank you for your payment<span
            >, {{ getSubmissionResponse.firstName }}</span
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
        <!-- The ID from the endpoint response is displayed here: -->
        <div class="mb-1">
          Your payment ID is:
          <span class="font-weight-bold">{{ getSubmissionResponse.id }}</span>
        </div>
        <div>
          Your transaction number is:
          <span class="font-weight-medium">{{ randomTransaction }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-btn
          dark
          :block="$vuetify.breakpoint.xsOnly"
          color="kinTeal"
          elevation="0"
          @click="returnHome"
          aria-label="Click to view transation details of your payment"
          >View Transaction Details</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    randomTransaction: Math.floor(Math.random() * 100000000),
  }),
  computed: {
    ...mapGetters(["getSubmissionResponse"]),
    lastFour() {
      return this.getSubmissionResponse.cardNumber
        ? this.getSubmissionResponse.cardNumber.substring(12, 16)
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
