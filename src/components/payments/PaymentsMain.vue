<template>
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
