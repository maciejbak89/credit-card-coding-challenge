<template>
  <!-- Display credit card payment UI components (CreditCards & UserForm) as well
  as the PaymentConfirmation success or PaymentError error component based on
  the success of the card details submission which is managed by the Vuex state. 
  If the form has not been yet submitted (success & error are both still false), 
  display the CreditCards & UserForm. If the form has been submitted successfully 
  (success is true, error is false), display the PaymentConfirmation component. If 
  the form submission returned errors (success is false, error is true), display
  the PaymentError component at the bottom of this view. -->
  <v-container class="d-flex flex-column justify-center align-center mt-8">
    <v-fade-transition hide-on-leave mode="out-in">
      <CreditCards
        v-show="!$store.getters.isSubmitCreditCardDataSuccess"
        class="mb-12"
      />
    </v-fade-transition>
    <v-fade-transition hide-on-leave mode="out-in">
      <UserForm v-show="!$store.getters.isSubmitCreditCardDataSuccess" />
    </v-fade-transition>
    <v-fade-transition hide-on-leave mode="out-in">
      <PaymentConfirmation
        v-if="$store.getters.isSubmitCreditCardDataSuccess"
      />
    </v-fade-transition>
    <PaymentError v-if="$store.getters.isSubmitCreditCardDataError" />
  </v-container>
</template>

<script>
import CreditCards from "./CreditCards";
import UserForm from "./UserForm";
import PaymentConfirmation from "./PaymentConfirmation";
import PaymentError from "./PaymentError";

export default {
  components: {
    CreditCards,
    UserForm,
    PaymentConfirmation,
    PaymentError,
  },
};
</script>
