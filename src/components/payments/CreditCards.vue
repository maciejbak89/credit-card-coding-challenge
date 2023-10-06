<template>
  <v-container>
    <div class="text-h5 mb-10 credit-cards-heading">Pay with credit card</div>
    <div class="credit-cards-container">
      <div class="credit-card-front-container">
        <v-img
          alt="Front of the credit card"
          class="credit-card"
          :src="require('../../assets/credit-card-front.jpg')"
          height="186"
          width="328"
        />
        <!-- Append credit card type image to the front of the card image based on the Vuex creditCardType property.
        I would go back to the design team and bring up that the current design has a logo very similar to the logo of
        MasterCard on the front of the card, and that might mislead some users into thinking that the only accepted card
        is MasterCard. I would suggest to dynamically update the logo on the card like I do in the textfield for creditCardNumber
        in the UserForm component to signal to the user that various credit card types are accepted and to reassure them that
        their credit card type is accepted here as well. -->
        <v-img
          v-if="getCreditCardType !== 'other'"
          alt="Logo of the credit card type being used by cardholder"
          class="credit-card-logo"
          :src="require(`../../assets/${getCreditCardType}.png`)"
          height="24"
          width="32"
        />
        <div class="credit-card-text credit-card-numbers font-weight-medium">
          <TweenNumber
            v-for="(num, i) in ccIndex"
            :start="num"
            :end="num + 1"
            :displayInit="ccDisplay[i]"
            :key="i"
            :class="{ 'mr-1': isMarginRight(num) }"
          />
        </div>
        <v-fade-transition mode="out-in">
          <div
            class="text-uppercase text-body-2 credit-card-full-name font-weight-medium credit-card-text"
            :key="fullName"
          >
            {{ fullName }}
          </div>
        </v-fade-transition>
        <div
          class="d-flex flex-column justify-center align-center credit-card-text credit-card-expiration-date"
        >
          <div class="text-caption">EXPIRY</div>
          <v-fade-transition mode="out-in">
            <div class="text-body-2 font-weight-medium" :key="expirationDate">
              {{ expirationDate }}
            </div>
          </v-fade-transition>
        </div>
      </div>
      <div class="credit-card-back-container">
        <v-img
          alt="Back of the credit card"
          class="credit-card credit-card-back"
          :src="require('../../assets/credit-card-back.png')"
          height="186"
          width="328"
        />
        <div class="credit-card-text credit-card-cvv">
          <div class="text-caption">CVV</div>
          <v-fade-transition mode="out-in">
            <div class="text-body-2 font-weight-medium" :key="cvv">
              {{ cvv }}
            </div>
          </v-fade-transition>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import TweenNumber from "@/animations/TweenNumber";

export default {
  components: { TweenNumber },
  data: () => ({
    expirationDate: "MM / YY",
    cvv: "123",
    fullName: "YOUR NAME",
    ccIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    ccDisplay: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  }),

  methods: {
    isMarginRight(num) {
      if (this.getCreditCardFormat === 1) {
        if (num === 3 || num === 7 || num === 11) {
          return true;
        }
      } else if (this.getCreditCardFormat === 2) {
        if (num === 3 || num === 9) {
          return true;
        }
      }
      return false;
    },
  },

  computed: {
    ...mapGetters(["getFormData", "getCreditCardType", "getCreditCardFormat"]),
  },

  watch: {
    // Listen to changes in the Vuex state for the formattedFormData property and update the values on the
    // card images accordingly:
    "$store.getters.getFormattedFormData"(newValue) {
      this.expirationDate = newValue.expirationDate.length
        ? newValue.expirationDate
        : "MM / YY";
      this.cvv = newValue.cvv.length ? newValue.cvv : "123";
      const fullName = newValue.firstName + " " + newValue.lastName;
      this.fullName = fullName.length > 1 ? fullName : "YOUR NAME";
    },
  },
};
</script>

<style scoped>
.credit-cards-heading {
  color: var(--v-kinBlack-base);
}
.credit-cards-container {
  position: relative;
}

.credit-card {
  border-radius: 16px;
}

.credit-card-front-container {
  position: relative;
  top: 12px;
  z-index: 3;
}

.credit-card-logo {
  position: absolute;
  top: 16px;
  left: 20px;
  z-index: 2;
}

.credit-card-back-container {
  position: relative;
  top: -198px;
}

.credit-card-back {
  position: absolute;
  top: 0;
  left: 72px;
}

.credit-card-text {
  color: #ffffff;
}

.credit-card-numbers {
  position: absolute;
  font-size: 18px;
  top: 79px;
  left: 20px;
}

.credit-card-full-name {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.credit-card-expiration-date {
  position: absolute;
  bottom: 20px;
  left: 250px;
}

.credit-card-cvv {
  position: absolute;
  top: 126px;
  left: 352px;
}
</style>
