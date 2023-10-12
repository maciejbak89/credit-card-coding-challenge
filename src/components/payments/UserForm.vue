<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" style="position: relative">
          <!-- Apply isNumber() method to all textfields where the input type should only be number. This is done by activating this method
          on keydown events in all number-only fields such as this one.
          Validations for textfields are defined partly in the rules data property, and partly in methods (due to problems accessing 
          other calculated properties from the rules object).
          Validations are done on blur. Luke Wroblewski wrote a great article explaining the After, Before, and Before-and-While forms 
          of validation (https://alistapart.com/article/inline-validation-in-web-forms/). Based on Luke's research, the After (onBlur) 
          method of validation proves to be the most successful with users and saves them the most time.
          I updated the design of the placeholder text to reflect type=number (instead of having X's which are letters). Having a 
          placeholder of numbers only requires less of a cognitive load from the user and signals to the user right away that the values
          entered can only be numbers. Another very interesting read on the pros & cons of placeholders in form fields in general is in 
          this Nielsen Norman Group article (https://www.nngroup.com/articles/form-design-placeholders/).
          This page was also tested for accessibility with WAVE Web Accessibility Evaluation Tools for any errors, contrast errors, missing
          elements, aria tags, etc. -->
          <v-text-field
            ref="cardNumber"
            aria-label="Enter your credit card number here"
            v-model="cardNumber"
            label="Credit Card Number"
            placeholder="1234 1234 1234 1234"
            persistent-placeholder
            color="kinTeal"
            :rules="[rules.cardNumber, validateCreditCardNumber, luhnAlgorithm]"
            :maxlength="getCreditCardFormat === 1 ? 19 : 17"
            validate-on-blur
            @keydown="isNumber($event)"
          >
            <!-- Append credit card type image to end of Credit Card Number text field based on method detectCardType() -->
            <template #append v-if="getCreditCardType !== 'other'">
              <v-fade-transition hide-on-leave mode="out-in">
                <div style="width: 32px">
                  <v-img
                    class="user-form-card-number-image"
                    alt="credit card logo of card type that is being used by cardholder"
                    max-height="24"
                    max-width="32"
                    :src="require(`../../assets/${getCreditCardType}.png`)"
                  />
                </div>
              </v-fade-transition>
            </template>
          </v-text-field>
          <!-- Display tooltip about credit card number based on method detectCardType() which determines creditCardFormat.
          If field is empty, display message for both creditCardFormat 1 & 2. If card type is detected, display message conditionally
          based on creditCardFormat 1 or 2. -->
          <v-tooltip top role="tooltip">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                aria-label="Information about credit card number"
                aria-describedby
                v-bind="attrs"
                v-on="on"
                small
                style="position: absolute; top: 15px; left: 124px"
                >mdi-information-outline</v-icon
              >
            </template>
            <div v-if="getCreditCardFormat === 1 && cardNumber.length === 0">
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
            <div v-if="getCreditCardFormat === 1 && cardNumber.length">
              <div>For Visa, MasterCard and Discover,</div>
              <div>
                the <span class="font-weight-bold">16 digits</span> on the front
                of your card.
              </div>
            </div>
            <div v-if="getCreditCardFormat === 2">
              <div>For American Express,</div>
              <div>
                the <span class="font-weight-bold">15 digits</span> on the front
                of your card.
              </div>
            </div>
          </v-tooltip>
        </v-col>
        <v-col cols="6" sm="4">
          <!-- I updated the design's placeholder text here as well to display “MM / YY” instead of "XX / XX". This signals to the user
          they must enter a month number (double digits) and a year number (double digits). It also tells the user in what order 
          to enter the required data. -->
          <v-text-field
            ref="expirationDate"
            aria-label="Enter the expiration date of your credit card here"
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
          <!-- The security code suffers from non-standardizing naming. Different companies call this code by different naming conventions 
          (CVV2, CVC2, CID, CSC, etc). Maybe simply labeling this field "Security code" could avoid confusion from users? -->
          <v-text-field
            ref="cvv"
            aria-label="Enter the CVV number of your credit card here"
            v-model="cvv"
            label="CVV"
            :placeholder="getCreditCardFormat === 1 ? '123' : '1234'"
            persistent-placeholder
            color="kinTeal"
            :rules="[rules.cvv, validateCVV]"
            :maxlength="getCreditCardFormat === 1 ? 3 : 4"
            validate-on-blur
            @keydown="isNumber($event)"
          ></v-text-field>
          <!-- Display tooltip about credit card CVV number based on method detectCardType() which determines creditCardFormat.
          If type is still undetermined (creditCardNumber is empty), display default 3 digit CVV placeholder "123".
          If card type is detected, display message conditionally based on creditCardFormat 1 (CVV is 3 digits & on back) 
          or 2 (CVV is 4 digits & on front). -->
          <v-tooltip top role="tooltip">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                aria-label="Information about the CVV number of your credit card"
                aria-describedby
                v-bind="attrs"
                v-on="on"
                small
                style="position: absolute; top: 15px; left: 42px"
                >mdi-information-outline</v-icon
              >
            </template>
            <div v-if="getCreditCardFormat === 1 && cardNumber.length === 0">
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
            <div v-if="getCreditCardFormat === 1 && cardNumber.length">
              The <span class="font-weight-bold">3 digits</span> on the
              <span class="font-italic">back</span> of your card.
            </div>
            <div v-if="getCreditCardFormat === 2">
              The <span class="font-weight-bold">4 digits</span> on the
              <span class="font-italic">front</span> of your card.
            </div>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" sm="5">
          <!-- Having a label say “Cardholder's First name” and then the placeholder repeat the phrase “First name” is very repetitive.
          I would bring this up with the designers - maybe a suggestion for a placeholder could be an actual common first name like “John”? 
          Another suggestion for a label could be "First name on card". This asks the user to simply type exactly what’s displayed on the card,
          instead of thinking about the cardholder's full or abbreviated name.-->
          <v-text-field
            ref="firstName"
            aria-label="Enter the first name on the card here"
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
          <!-- Same story with the last name as with the first name. Maybe use a common last name here as a placeholder and change label to 
          "Last name on card"? -->
          <v-text-field
            ref="lastName"
            aria-label="Enter the last name on the card here"
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
          <!-- I also had a few ideas around the label and placeholder text in this zip code text field. Perhaps to satisfy naming conventions for 
          both US and Canadian customers, the input label should read “ZIP/Postal code”? Depending on where the company's business is done, the 
          term "Zip" could be slightly confusing. I would also like to discuss with the design team some ideas around placeholder text. Maybe
          instead of providing the user with a placeholder of "XXXXX", we could give an example of an actual zip code that uses the full 9 digits
          to signal that a 9 digit zip could also be used. Since this is a very recognizible field and the suggestion is also listed "e.g.", the
          user will most likely know that a 5 digit zip is also alright. Also, since this field is last in the form, chances are the user will enter
          a 5 digit zip and the Submit button will become active, which will signal to the user that a 5 digit zip is also accepted. The tooltip 
          below also contains that information. -->
          <v-text-field
            ref="zipCode"
            aria-label="Enter the zip code for your card's billing address here"
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
          <!-- Display tooltip about the zip code here. Since the term "Billing Zip Code" may be a bit confusing to some users 
          (they may confuse it with their personal address zip code), this tooltip is meant to clarify that this zip code 
          textfield refers to the 5 or 9 digit code for their credit card's billing address. -->
          <v-tooltip top role="tooltip">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                aria-label="Information about the zip code of your card's billing address"
                aria-describedby
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
          <!-- Button which submits the credit card information is disabled until all fields on the form are active and validated
          accordingly. Also, when users skim the credit card payment form, they often question if the form is actually secure.
          Should they trust the website behind this form or are they just spoofing users' credit card details. One method to 
          reinforce security through design was to place a lock icon next to the submit text in the button. The position of the
          icon inside the button is key because it reinforces security at a critical point -- when the user submits the credit
          card info to pay. Once the submission is made, I also change the button's state to a disabled (to prevent any further
          clicks) pending/loading state with the text "Submitting..." to react to the user's submission and let them know that 
          one is taking place. Once the submission is made, a reactive success or error message is shown. A success message is 
          displayed in a new page, while an error state is shown (for the purposes of this app) with a snackbar on the bottom of 
          the page. -->
          <v-btn
            aria-label="Click to submit credit card data"
            class="user-form-text-white"
            color="kinTeal"
            @click="submitCardData"
            :disabled="
              formHasErrors ||
              !cardNumber ||
              !expirationDate ||
              !cvv ||
              !firstName ||
              !lastName ||
              !zipCode ||
              isSubmitCreditCardDataLoading
            "
            elevation="0"
          >
            <span v-if="!isSubmitCreditCardDataLoading">
              <v-icon left aria-label="Security lock">
                mdi-lock-outline
              </v-icon>
              Submit
            </span>
            <span v-if="isSubmitCreditCardDataLoading">
              <v-icon left aria-label="Security lock">
                mdi-lock-outline
              </v-icon>
              Submitting...
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    ...mapGetters([
      "getCreditCardType",
      "getCreditCardFormat",
      "isSubmitCreditCardDataLoading",
    ]),
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
      this.updateForm(this.form);
      this.updateFormattedForm(this.formattedForm);

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
    ...mapActions([
      "updateForm",
      "updateFormattedForm",
      "updateCreditCardType",
      "updateCreditCardFormat",
      "submitCreditCardData",
    ]),
    // Method that checks if entered keys are only numbers (don't include letters and other symbols).
    // The only keys allowed are numbers, backspace, delete (to delete any entered numbers), arrow left
    // and right keys (to arrow through previously entered values), and tab (to tab to next field).
    // Runs in textfields on keyDown events for creditCardNumber, expirationDate, cvv, and zipCode properties.
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

    // Detect the card type (from the 4 major types: Visa, MasterCard, American Express, Discover).
    // This method runs in the watcher for the property cardNumber so that on each change, the input is checked against below conditions.
    // According to credit card patterns (found in this Stripe Github repo: https://github.com/stripe-archive/jquery.payment)
    // use these patterns in the first 1 to 3 entered digits to alert / confirm with the user what card type they are
    // currently entering. This reassures the user that their credit card type is accepted, ensuring a better UX.
    // For the purposes of this exercise, I am labeling any other card types not found in the below patterns as "other".
    // Once the card type is detected, we can format also determine the card number format (1 or 2 - explained below).
    // Once card type & format are detected, update the Vuex store with the credit card type and format to use that information
    // in various places throughtout the app.
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
        this.updateCreditCardType("visa");
        this.updateCreditCardFormat(1);
      } else if (
        cardNumber.substring(0, 2) === "34" ||
        cardNumber.substring(0, 2) === "37"
      ) {
        this.updateCreditCardType("amex");
        this.updateCreditCardFormat(2);
      } else if (mastercard.includes(cardNumber.substring(0, 2))) {
        this.updateCreditCardType("mastercard");
        this.updateCreditCardFormat(1);
      } else if (
        discover.includes(cardNumber.substring(0, 2)) ||
        cardNumber.substring(0, 3) === "622"
      ) {
        this.updateCreditCardType("discover");
        this.updateCreditCardFormat(1);
      } else {
        this.updateCreditCardType("other");
        this.updateCreditCardFormat(1);
      }
    },

    // The above 4 card types (for the purposes of this exercies) accept either 16 digit or 15 digit card numbers.
    // Visa, MasterCard, Discover accept 16 digits (format 1) and are formatted like so: "XXXX XXXX XXXX XXXX".
    // American Express accepts 15 digits (format 2) and is formatted like so: "XXXX XXXXXX XXXXX".
    formatCreditCardNumber(cardNumber) {
      if (this.getCreditCardFormat === 1) {
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
      } else if (this.getCreditCardFormat === 2) {
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

    // Format expiration date using this pattern: "MM / YY"
    formatExpirationDate(date) {
      const month = date.substring(0, 2);
      const year = date.substring(2, 4);
      if (date.length > 2) {
        this.expirationDate = `${month} / ${year}`;
      } else if (date.length > 0) {
        this.expirationDate = `${month}`;
      }
    },

    // Format zip code using this pattern: "XXXXX-XXXX"
    formatZipCode(zip) {
      const first = zip.substring(0, 5);
      const second = zip.substring(5, 9);
      if (zip.length > 5) {
        this.zipCode = `${first}-${second}`;
      } else if (zip.length > 0) {
        this.zipCode = `${first}`;
      }
    },

    // Validate all credit card numbers using Luhn's Algorithm (modulus 10 algorithm). It's a method
    // of distinguishing valid numbers from mistyped or incorrect numbers, and was designed to protect
    // against accidental errors. Here is one implementation of the algorithm:
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

    // Validate if the entered credit card number of format 1 has 16 digits (accounting for 3 extra whitespaces
    // between digits in position 4 & 5, 8 & 9, 12 & 13 make up a length of 19). If the card format is 2 (AmEx), check
    // whether the length is 17 (accounting for 2 whitespaces between digits in position 4 & 5, 10 & 11).
    validateCreditCardNumber(value) {
      if (this.getCreditCardFormat === 1) {
        if (value.length === 19) {
          return true;
        } else {
          return "Credit card number must be 16 digits";
        }
      } else if (this.getCreditCardFormat === 2) {
        if (value.length === 17) {
          return true;
        } else {
          return "Credit card number must be 15 digits";
        }
      }
    },

    // Validate if expiration date on the card is in the future (using the current date to calculate year and month),
    // and if the month on the credit card is a number that is equal to or less than 12 (December), or greater than 0,
    // but not 0. Months cannot be negative since the "-" symbol is not allowed due to isNumber() being called on keydown
    // events.
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

    // If the card format is 1, the CVV num ber must be 3 digits. If the card format is 2 (AmEx), the CVV number must be 4 digits.
    validateCVV(value) {
      if (this.getCreditCardFormat === 1) {
        if (value.length === 3) {
          return true;
        } else {
          return "Enter a valid CVV";
        }
      } else if (this.getCreditCardFormat === 2) {
        if (value.length === 4) {
          return true;
        } else {
          return "Enter a valid CVV";
        }
      }
    },

    // Another implementation of Luhn's algorithm. Not used here.
    // luhnAlgorithm2(cardNumber) {
    //   let sum = 0;
    //   let isEven = false;

    //   for (let i = cardNumber.length - 1; i >= 0; i--) {
    //     let digit = parseInt(cardNumber.charAt(i), 10);

    //     if (isEven) {
    //       digit *= 2;
    //       if (digit > 9) {
    //         digit -= 9;
    //       }
    //     }
    //     sum += digit;
    //     isEven = !isEven;
    //   }
    //   return sum % 10 === 0;
    // },

    resetForm() {
      this.cardNumber = "";
      this.expirationDate = "";
      this.cvv = "";
      this.firstName = "";
      this.lastName = "";
      this.zipCode = "";
    },

    submitCardData() {
      this.submitCreditCardData(this.form);
    },
  },
};
</script>

<style scoped>
.user-form-card-number-image {
  margin: auto 0;
}

.user-form-text-white {
  color: #ffffff;
}
</style>
