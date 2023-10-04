<template>
  <v-snackbar
    v-model="isSubmissionError"
    color="error"
    timeout="10000"
    aria-label="Submission error snackbar notification"
  >
    <div class="d-flex align-center">
      <v-icon class="mr-2" aria-label="Alert circle icon"
        >mdi-alert-circle</v-icon
      >
      <div>
        There was an error while processing your payment. Please try again
        later.
      </div>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        icon
        v-bind="attrs"
        @click="isSubmissionError = false"
        ><v-icon aria-label="Click to close the error snackbar"
          >mdi-close</v-icon
        ></v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    isSubmissionError: true,
  }),
};
</script>
