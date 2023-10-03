<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" style="position: relative">
          <v-text-field
            ref="cardNumber"
            v-model="cardNumber"
            label="Credit Card Number"
            placeholder="1234 1234 1234 1234"
            persistent-placeholder
            color="kinTeal"
            :rules="[rules.cardNumber, validateCreditCardNumber, luhnAlgorithm]"
            :maxlength="$store.getters.getCreditCardFormat === 1 ? 19 : 17"
            validate-on-blur
            @keydown="isNumber($event)"
          >
            <template
              #append
              v-if="$store.getters.getCreditCardType !== 'other'"
            >
              <v-fade-transition hide-on-leave mode="out-in">
                <div style="width: 32px">
                  <v-img
                    style="margin: auto 0"
                    max-height="24"
                    max-width="32"
                    :src="
                      require(`../../assets/${$store.getters.getCreditCardType}.png`)
                    "
                  />
                </div>
              </v-fade-transition>
            </template>
          </v-text-field>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                style="position: absolute; top: 15px; left: 124px"
                >mdi-information-outline</v-icon
              >
            </template>
            <div
              v-if="
                $store.getters.getCreditCardFormat === 1 &&
                cardNumber.length === 0
              "
            >
              <div>
                <div>For Visa, MasterCard and Discover,</div>
                <div>
                  the <span class="font-weight-bold">16 digits</span> on the
                  front of your card.
                </div>
              </div>
              <div>
                <div>For American Express,</div>
                <div>
                  the <span class="font-weight-bold">15 digits</span> on the
                  front of your card.
                </div>
              </div>
            </div>
            <div
              v-if="
                $store.getters.getCreditCardFormat === 1 && cardNumber.length
              "
            >
              <div>For Visa, MasterCard and Discover,</div>
              <div>
                the <span class="font-weight-bold">16 digits</span> on the front
                of your card.
              </div>
            </div>
            <div v-if="$store.getters.getCreditCardFormat === 2">
              <div>For American Express,</div>
              <div>
                the <span class="font-weight-bold">15 digits</span> on the front
                of your card.
              </div>
            </div>
          </v-tooltip>
        </v-col>
        <v-col cols="6" sm="4">
          <v-text-field
            ref="expirationDate"
            v-model="expirationDate"
            label="Expiration Date"
            placeholder="MM / YY"
            persistent-placeholder
            color="kinTeal"
            :rules="[...rules.expirationDate, validateExpirationDate]"
            maxlength="7"
            validate-on-blur
            @keydown="isNumber($event)"
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="2" style="position: relative">
          <v-text-field
            ref="cvv"
            v-model="cvv"
            label="CVV"
            :placeholder="
              $store.getters.getCreditCardFormat === 1 ? '123' : '1234'
            "
            persistent-placeholder
            color="kinTeal"
            :rules="[rules.cvv, validateCVV]"
            :maxlength="$store.getters.getCreditCardFormat === 1 ? 3 : 4"
            validate-on-blur
            @keydown="isNumber($event)"
          ></v-text-field>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                style="position: absolute; top: 15px; left: 42px"
                >mdi-information-outline</v-icon
              >
            </template>
            <div
              v-if="
                $store.getters.getCreditCardFormat === 1 &&
                cardNumber.length === 0
              "
            >
              <div>
                <div>For Visa, MasterCard and Discover,</div>
                <div>
                  the <span class="font-weight-bold">3 digits</span> on the
                  <span class="font-italic">back</span> of your card.
                </div>
              </div>

              <div>
                <div>For American Express,</div>
                <div>
                  the <span class="font-weight-bold">4 digits</span> on the
                  <span class="font-italic">front</span> of your card.
                </div>
              </div>
            </div>
            <div
              v-if="
                $store.getters.getCreditCardFormat === 1 && cardNumber.length
              "
            >
              The <span class="font-weight-bold">3 digits</span> on the
              <span class="font-italic">back</span> of your card.
            </div>
            <div v-if="$store.getters.getCreditCardFormat === 2">
              The <span class="font-weight-bold">4 digits</span> on the
              <span class="font-italic">front</span> of your card.
            </div>
          </v-tooltip>
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
            :rules="[rules.firstName]"
            validate-on-blur
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
            :rules="[rules.lastName]"
            validate-on-blur
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" style="position: relative">
          <v-text-field
            ref="zipCode"
            v-model="zipCode"
            label="Billing Zip Code"
            placeholder="e.g. 60642-7546"
            persistent-placeholder
            color="kinTeal"
            :rules="[...rules.zipCode]"
            maxlength="10"
            validate-on-blur
            @keydown="isNumber($event)"
          ></v-text-field>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                style="position: absolute; top: 15px; left: 100px"
                >mdi-information-outline</v-icon
              >
            </template>
            <div>
              <div>
                Enter the <span class="font-weight-bold">5 or 9 digit</span> zip
                code for
              </div>
              <div>your credit card's billing address.</div>
            </div>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12" sm="12">
          <v-btn
            :block="$vuetify.breakpoint.xsOnly"
            color="kinTeal"
            @click="submitCreditCardData"
            :disabled="
              formHasErrors ||
              !cardNumber ||
              !expirationDate ||
              !cvv ||
              !firstName ||
              !lastName ||
              !zipCode ||
              $store.getters.isSubmitCreditCardDataLoading
            "
            elevation="0"
            style="color: #ffffff"
          >
            <span v-if="!$store.getters.isSubmitCreditCardDataLoading">
              <v-icon left> mdi-lock-outline </v-icon> Submit
            </span>
            <span v-if="$store.getters.isSubmitCreditCardDataLoading">
              <v-icon left> mdi-lock-outline </v-icon> Submitting...
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    formHasErrors: false,
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
    zipCode: "",
    creditCardType: "other",
    creditCardFormat: 1,
    rules: {
      cardNumber: (value) => !!value || "Credit card number is required",
      expirationDate: [
        (value) => !!value || "Expiration date is required",
        (value) => value.length === 7 || "Enter a valid month and year",
      ],
      cvv: (value) => !!value || "CVV is required",
      firstName: (value) => !!value || "First name is required",
      lastName: (value) => !!value || "Last name is required",
      zipCode: [
        (value) => !!value || "Billing zip code is required",
        (value) =>
          value.length === 5 || value.length === 10 || "Enter a valid zip code",
      ],
    },
  }),

  computed: {
    form() {
      return {
        cardNumber: this.cardNumber.replace(/\s/g, ""),
        expirationDate: this.expirationDate.replace(/\s/g, ""),
        cvv: this.cvv,
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        zipCode: this.zipCode,
      };
    },

    formattedForm() {
      return {
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        cvv: this.cvv,
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        zipCode: this.zipCode,
      };
    },
  },

  watch: {
    form() {
      this.$store.dispatch("updateForm", this.form);
      this.$store.dispatch("updateFormattedForm", this.formattedForm);

      this.formHasErrors = false;
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
    },

    cardNumber(cardNumber) {
      const input = cardNumber.replace(/\D/g, "").substring(0, 16);
      this.detectCardType(cardNumber);
      this.formatCreditCardNumber(input);
    },

    expirationDate(date) {
      const input = date.replace(/\D/g, "").substring(0, 4);
      this.formatExpirationDate(input);
    },

    zipCode(zip) {
      const input = zip.replace(/\D/g, "").substring(0, 9);
      this.formatZipCode(input);
    },

    firstName() {
      if (this.firstName.length > 0) {
        this.firstName =
          this.firstName.charAt(0).toUpperCase() +
          this.firstName.slice(1).trim();
      }
    },

    lastName() {
      if (this.lastName.length > 0) {
        this.lastName =
          this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).trim();
      }
    },
  },

  methods: {
    isNumber(e) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      let keyPressed = e.key;
      if (!keysAllowed.includes(keyPressed)) {
        e.preventDefault();
      }
    },

    detectCardType(cardNumber) {
      const mastercard = [
        "51",
        "52",
        "53",
        "54",
        "55",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
      ];
      const discover = ["60", "64", "65", "622"];

      if (cardNumber.substring(0, 1) === "4") {
        // this.creditCardType = "visa";
        // this.creditCardFormat = 1;
        this.$store.dispatch("updateCreditCardType", "visa");
        this.$store.dispatch("updateCreditCardFormat", 1);
      } else if (
        cardNumber.substring(0, 2) === "34" ||
        cardNumber.substring(0, 2) === "37"
      ) {
        // this.creditCardType = "amex";
        // this.creditCardFormat = 2;
        this.$store.dispatch("updateCreditCardType", "amex");
        this.$store.dispatch("updateCreditCardFormat", 2);
      } else if (mastercard.includes(cardNumber.substring(0, 2))) {
        // this.creditCardType = "mastercard";
        // this.creditCardFormat = 1;
        this.$store.dispatch("updateCreditCardType", "mastercard");
        this.$store.dispatch("updateCreditCardFormat", 1);
      } else if (
        discover.includes(cardNumber.substring(0, 2)) ||
        cardNumber.substring(0, 3) === "622"
      ) {
        // this.creditCardType = "discover";
        // this.creditCardFormat = 1;
        this.$store.dispatch("updateCreditCardType", "discover");
        this.$store.dispatch("updateCreditCardFormat", 1);
      } else {
        // this.creditCardType = "other";
        // this.creditCardFormat = 1;
        this.$store.dispatch("updateCreditCardType", "other");
        this.$store.dispatch("updateCreditCardFormat", 1);
      }
    },

    formatCreditCardNumber(cardNumber) {
      if (this.$store.getters.getCreditCardFormat === 1) {
        const first = cardNumber.substring(0, 4);
        const second = cardNumber.substring(4, 8);
        const third = cardNumber.substring(8, 12);
        const fourth = cardNumber.substring(12, 16);
        if (cardNumber.length > 12) {
          this.cardNumber = `${first} ${second} ${third} ${fourth}`;
        } else if (cardNumber.length >= 8) {
          this.cardNumber = `${first} ${second} ${third}`;
        } else if (cardNumber.length >= 4) {
          this.cardNumber = `${first} ${second}`;
        } else if (cardNumber.length > 0) {
          this.cardNumber = `${first}`;
        }
      } else if (this.$store.getters.getCreditCardFormat === 2) {
        const first = cardNumber.substring(0, 4);
        const second = cardNumber.substring(4, 10);
        const third = cardNumber.substring(10, 15);
        if (cardNumber.length > 10) {
          this.cardNumber = `${first} ${second} ${third}`;
        } else if (cardNumber.length >= 4) {
          this.cardNumber = `${first} ${second}`;
        } else if (cardNumber.length > 0) {
          this.cardNumber = `${first}`;
        }
      }
    },

    formatExpirationDate(date) {
      const month = date.substring(0, 2);
      const year = date.substring(2, 4);
      if (date.length > 2) {
        this.expirationDate = `${month} / ${year}`;
      } else if (date.length > 0) {
        this.expirationDate = `${month}`;
      }
    },

    formatZipCode(zip) {
      const first = zip.substring(0, 5);
      const second = zip.substring(5, 9);
      if (zip.length > 5) {
        this.zipCode = `${first}-${second}`;
      } else if (zip.length > 0) {
        this.zipCode = `${first}`;
      }
    },

    luhnAlgorithm(value) {
      if (/[^0-9-\s]+/.test(value)) return false;

      let nCheck = 0;
      let bEven = false;
      value = value.replace(/\D/g, "");

      for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n);
        let nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
      }

      return nCheck % 10 == 0 || "Credit card number is not valid";
    },

    validateCreditCardNumber(value) {
      if (this.$store.getters.getCreditCardFormat === 1) {
        if (value.length === 19) {
          return true;
        } else {
          return "Credit card number must be 16 digits";
        }
      } else if (this.$store.getters.getCreditCardFormat === 2) {
        if (value.length === 17) {
          return true;
        } else {
          return "Credit card number must be 15 digits";
        }
      }
    },

    validateExpirationDate(value) {
      const currentDate = new Date();
      let currentYear = Number(
        currentDate.getFullYear().toString().substring(2, 4)
      );
      const currentMonth = currentDate.getMonth() + 1;

      const expirationDate = value.replace(/\D/g, "").substring(0, 4);
      const expirationMonth = Number(expirationDate.substring(0, 2));
      const expirationYear = Number(expirationDate.substring(2, 4));

      if (expirationMonth > 12 || expirationMonth === 0) {
        return "Enter a valid expiration date";
      } else if (expirationYear > currentYear) {
        return true;
      } else if (
        expirationYear === currentYear &&
        expirationMonth >= currentMonth
      ) {
        return true;
      }
      return "Enter a valid expiration date";
    },

    validateCVV(value) {
      if (this.$store.getters.getCreditCardFormat === 1) {
        if (value.length === 3) {
          return true;
        } else {
          return "Enter a valid CVV";
        }
      } else if (this.$store.getters.getCreditCardFormat === 2) {
        if (value.length === 4) {
          return true;
        } else {
          return "Enter a valid CVV";
        }
      }
    },

    luhnAlgorithm2(cardNumber) {
      let sum = 0;
      let isEven = false;

      for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
        isEven = !isEven;
      }
      this.detectCardType(cardNumber);
      return sum % 10 === 0;
    },

    // detectCardType(cardNumber) {
    //   const patterns = {
    //     visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    //     mastercard: /^5[1-5][0-9]{14}$/,
    //     amex: /^3[47][0-9]{13}$/,
    //     discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    //   };

    //   for (const cardType in patterns) {
    //     if (patterns[cardType].test(cardNumber)) {
    //       console.log("cardType: ", cardType);
    //       return cardType;
    //     }
    //   }

    //   console.log("cardType: UNKNOWN");
    //   return "Unknown";
    // },

    // detectCardType3(value) {
    //   if (/^3[47]\d{0,13}$/.test(value)) {
    //     console.log("detectCardType2: amex");
    //     // mask = "9999 999999 99999";
    //   } else if (/^\d{0,16}$/.test(value)) {
    //     // console.log("detectCardType2: not amex");
    //     // mask = "9999 9999 9999 9999";
    //     if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(value)) {
    //       console.log("detectCardType2: VISA");
    //     } else if (
    //       /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(
    //         value
    //       )
    //     ) {
    //       console.log("detectCardType2: MasterCard");
    //     } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(value)) {
    //       console.log("detectCardType2: Discover");
    //     } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(value)) {
    //       console.log("detectCardType2: JCB");
    //     } else {
    //       console.log("detectCardType2: UNKNOWN");
    //     }
    //   }
    // },

    // Visa: ^4[0-9]{12}(?:[0-9]{3})?$ All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.
    // MasterCard: ^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$ MasterCard numbers either start with the numbers 51 through 55 or with the numbers 2221 through 2720. All have 16 digits.
    // American Express: ^3[47][0-9]{13}$ American Express card numbers start with 34 or 37 and have 15 digits.
    // Diners Club: ^3(?:0[0-5]|[68][0-9])[0-9]{11}$ Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits. There are Diners Club cards that begin with 5 and have 16 digits. These are a joint venture between Diners Club and MasterCard, and should be processed like a MasterCard.
    // Discover: ^6(?:011|5[0-9]{2})[0-9]{12}$ Discover card numbers begin with 6011 or 65. All have 16 digits.
    // JCB: ^(?:2131|1800|35\d{3})\d{11}$ JCB cards beginning with 2131 or 1800 have 15 digits. JCB cards beginning with 35 have 16 digits.

    //     var luhnChk = (function (arr) {
    //     return function (ccNum) {
    //         var
    //             len = ccNum.length,
    //             bit = 1,
    //             sum = 0,
    //             val;

    //         while (len) {
    //             val = parseInt(ccNum.charAt(--len), 10);
    //             sum += (bit ^= 1) ? arr[val] : val;
    //         }

    //         return sum && sum % 10 === 0;
    //     };
    // }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9])),

    resetForm() {
      this.cardNumber = "";
      this.expirationDate = "";
      this.cvv = "";
      this.firstName = "";
      this.lastName = "";
      this.zipCode = "";
    },

    submitCreditCardData() {
      this.$store.dispatch("submitCreditCardData", this.form);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter,
.fade-lave-to {
  opacity: 0;
}
</style>
