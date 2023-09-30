<template>
  <v-container ref="form">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          ref="cardNumber"
          v-model="cardNumber"
          label="Credit Card Number"
          placeholder="XXXX XXXX XXXX XXXX"
          persistent-placeholder
          color="kinTeal"
          :rules="[...rules.cardNumber]"
          maxlength="19"
          validate-on-blur
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="4">
        <v-text-field
          ref="expirationDate"
          v-model="expirationDate"
          label="Expiration Date"
          placeholder="XX / XX"
          persistent-placeholder
          color="kinTeal"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="2">
        <v-text-field
          ref="cvv"
          v-model="cvv"
          label="CVV"
          placeholder="XXX"
          persistent-placeholder
          color="kinTeal"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" sm="5">
        <v-text-field
          ref="firstName"
          v-model="firstName"
          label="Cardholder's First Name"
          placeholder="First name"
          persistent-placeholder
          color="kinTeal"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="5">
        <v-text-field
          ref="lastName"
          v-model="lastName"
          label="Cardholder's Last Name"
          placeholder="Last name"
          persistent-placeholder
          color="kinTeal"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="2">
        <v-text-field
          ref="zipCode"
          v-model="zipCode"
          label="Billing Zip Code"
          placeholder="XXXXX"
          persistent-placeholder
          color="kinTeal"
          type="number"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="mt-8">
      <v-btn
        color="kinTeal"
        @click="submitCardData"
        :disabled="
          formHasErrors ||
          !cardNumber ||
          !expirationDate ||
          !cvv ||
          !firstName ||
          !lastName ||
          !zipCode
        "
        >Submit</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    formHasErrors: false,
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
    zipCode: "",
    rules: {
      cardNumber: [
        (value) => !!value || "Credit card number is required",
        (value) =>
          (value.length <= 19 && value.length >= 18) ||
          "Credit card number must be either 15 or 16 digits",
      ],
      expirationDate: (value) => !!value || "Expiration date is required",
      cvv: (value) => !!value || "CVV is required",
      firstName: (value) => !!value || "First name is required",
      lastName: (value) => !!value || "Last name is required",
      zipCode: (value) => !!value || "Billing zip code is required",
      notes: (value) => value.length < 250 || "Max 250 characters",
    },
  }),

  computed: {
    form() {
      return {
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        cvv: this.cvv,
        firstName: this.firstName,
        lastName: this.lastName,
        zipCode: this.zipCode,
      };
    },
  },

  watch: {
    form() {
      this.formHasErrors = false;
      setTimeout(() => {
        let validate = {
          cardNumber: this.$refs.cardNumber.validate(),
          expirationDate: this.$refs.expirationDate.validate(),
          cvv: this.$refs.cvv.validate(),
          firstName: this.$refs.firstName.validate(),
          lastName: this.$refs.lastName.validate(),
          zipCode: this.$refs.zipCode.validate(),
        };
        Object.keys(validate).map((key) => {
          if (!validate[key]) {
            this.formHasErrors = true;
          }
        });
      }, 100);
    },

    cardNumber(cardNumber) {
      // const input = cardNumber.replace(/\D/g, "").substring(0, 16);
      // if (input.length <= 16) {
      //   this.cardNumber = this.cardNumber
      //     .replace(/\W/gi, "")
      //     .replace(/(.{4})/g, "$1 ");
      // }

      this.cardNumber = cardNumber
        .replace(/[^\d]/g, "")
        .substring(0, 16)
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ");

      // const first = input.substring(0, 4);
      // const second = input.substring(4, 8);
      // const third = input.substring(8, 12);
      // const fourth = input.substring(12, 16);

      // if (input.length > 4) {
      //   this.cardNumber = `${first} ${middle} - ${last}`;
      // } else if (input.length >= 3) {
      //   this.cardNumber = `(${zip}) ${middle}`;
      // } else if (input.length > 0) {
      //   this.cardNumber = `(${zip}`;
      // }
    },
  },

  methods: {
    submitCardData() {},
  },
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  display: none;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
