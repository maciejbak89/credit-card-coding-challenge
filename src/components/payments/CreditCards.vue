<template>
  <v-container>
    <div class="text-h5 mb-10 credit-cards-heading">Pay with credit card</div>
    <div class="credit-cards-container">
      <div class="credit-card-front-container">
        <v-img
          alt="credit card front image"
          class="credit-card"
          :src="require('../../assets/credit-card-front.jpg')"
          height="186"
          width="328"
        />
        <v-img
          v-if="$store.getters.getCreditCardType !== 'other'"
          alt="credit card logo image"
          class="credit-card-logo"
          :src="require(`../../assets/${$store.getters.getCreditCardType}.png`)"
          height="24"
          width="32"
        />
        <div
          class="credit-card-text font-weight-medium"
          style="position: absolute; font-size: 18px; top: 79px; left: 20px"
        >
          <div v-if="$store.getters.getCreditCardFormat === 1">
            <span>{{ formattedOne }}</span>
            <span>{{ formattedTwo }}</span>
            <span>{{ formattedThree }}</span>
            <span class="mr-1">{{ formattedFour }}</span>
            <span>{{ formattedFive }}</span>
            <span>{{ formattedSix }}</span>
            <span>{{ formattedSeven }}</span>
            <span class="mr-1">{{ formattedEight }}</span>
            <span>{{ formattedNine }}</span>
            <span>{{ formattedTen }}</span>
            <span>{{ formattedEleven }}</span>
            <span class="mr-1">{{ formattedTwelve }}</span>
            <span>{{ formattedThirteen }}</span>
            <span>{{ formattedFourteen }}</span>
            <span>{{ formattedFifteen }}</span>
            <span>{{ formattedSixteen }}</span>
          </div>
          <div v-if="$store.getters.getCreditCardFormat === 2">
            <span>{{ formattedOne }}</span>
            <span>{{ formattedTwo }}</span>
            <span>{{ formattedThree }}</span>
            <span class="mr-1">{{ formattedFour }}</span>
            <span>{{ formattedFive }}</span>
            <span>{{ formattedSix }}</span>
            <span>{{ formattedSeven }}</span>
            <span>{{ formattedEight }}</span>
            <span>{{ formattedNine }}</span>
            <span class="mr-1">{{ formattedTen }}</span>
            <span>{{ formattedEleven }}</span>
            <span>{{ formattedTwelve }}</span>
            <span>{{ formattedThirteen }}</span>
            <span>{{ formattedFourteen }}</span>
            <span>{{ formattedFifteen }}</span>
          </div>
        </div>
        <v-fade-transition mode="out-in">
          <div
            class="text-uppercase text-body-2 font-weight-medium credit-card-text"
            style="position: absolute; bottom: 20px; left: 20px"
            :key="fullName"
          >
            {{ fullName }}
          </div>
        </v-fade-transition>
        <div
          class="d-flex flex-column justify-center align-center credit-card-text"
          style="position: absolute; bottom: 20px; left: 250px"
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
          alt="credit card back image"
          class="credit-card credit-card-back"
          :src="require('../../assets/credit-card-back.png')"
          height="186"
          width="328"
        />
        <div
          class="credit-card-text"
          style="position: absolute; top: 126px; left: 352px"
        >
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
import gsap from "gsap";

export default {
  data: () => ({
    expirationDate: "MM / YY",
    cvv: "123",
    fullName: "YOUR NAME",

    one: { num: 1, tweenedNum: 1 },
    two: { num: 2, tweenedNum: 2 },
    three: { num: 3, tweenedNum: 3 },
    four: { num: 4, tweenedNum: 4 },
    five: { num: 1, tweenedNum: 1 },
    six: { num: 2, tweenedNum: 2 },
    seven: { num: 3, tweenedNum: 3 },
    eight: { num: 4, tweenedNum: 4 },
    nine: { num: 1, tweenedNum: 1 },
    ten: { num: 2, tweenedNum: 2 },
    eleven: { num: 3, tweenedNum: 3 },
    twelve: { num: 4, tweenedNum: 4 },
    thirteen: { num: 1, tweenedNum: 1 },
    fourteen: { num: 2, tweenedNum: 2 },
    fifteen: { num: 3, tweenedNum: 3 },
    sixteen: { num: 4, tweenedNum: 4 },
  }),

  methods: {
    tweenOne(newNumber) {
      gsap.to(this.one, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenTwo(newNumber) {
      gsap.to(this.two, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenThree(newNumber) {
      gsap.to(this.three, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenFour(newNumber) {
      gsap.to(this.four, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenFive(newNumber) {
      gsap.to(this.five, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenSix(newNumber) {
      gsap.to(this.six, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenSeven(newNumber) {
      gsap.to(this.seven, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenEight(newNumber) {
      gsap.to(this.eight, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenNine(newNumber) {
      gsap.to(this.nine, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenTen(newNumber) {
      gsap.to(this.ten, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenEleven(newNumber) {
      gsap.to(this.eleven, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenTwelve(newNumber) {
      gsap.to(this.twelve, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenThirteen(newNumber) {
      gsap.to(this.thirteen, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenFourteen(newNumber) {
      gsap.to(this.fourteen, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenFifteen(newNumber) {
      gsap.to(this.fifteen, { duration: 0.2, tweenedNum: newNumber });
    },
    tweenSixteen(newNumber) {
      gsap.to(this.sixteen, { duration: 0.2, tweenedNum: newNumber });
    },
  },

  computed: {
    formattedOne() {
      return Math.round(this.one.tweenedNum)
        ? Math.round(this.one.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(0, 1)
        ? 0
        : "";
    },
    formattedTwo() {
      return Math.round(this.two.tweenedNum)
        ? Math.round(this.two.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(1, 2)
        ? 0
        : "";
    },
    formattedThree() {
      return Math.round(this.three.tweenedNum)
        ? Math.round(this.three.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(2, 3)
        ? 0
        : "";
    },
    formattedFour() {
      return Math.round(this.four.tweenedNum)
        ? Math.round(this.four.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(3, 4)
        ? 0
        : "";
    },
    formattedFive() {
      return Math.round(this.five.tweenedNum)
        ? Math.round(this.five.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(4, 5)
        ? 0
        : "";
    },
    formattedSix() {
      return Math.round(this.six.tweenedNum)
        ? Math.round(this.six.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(5, 6)
        ? 0
        : "";
    },
    formattedSeven() {
      return Math.round(this.seven.tweenedNum)
        ? Math.round(this.seven.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(6, 7)
        ? 0
        : "";
    },
    formattedEight() {
      return Math.round(this.eight.tweenedNum)
        ? Math.round(this.eight.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(7, 8)
        ? 0
        : "";
    },
    formattedNine() {
      return Math.round(this.nine.tweenedNum)
        ? Math.round(this.nine.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(8, 9)
        ? 0
        : "";
    },
    formattedTen() {
      return Math.round(this.ten.tweenedNum)
        ? Math.round(this.ten.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(9, 10)
        ? 0
        : "";
    },
    formattedEleven() {
      return Math.round(this.eleven.tweenedNum)
        ? Math.round(this.eleven.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(10, 11)
        ? 0
        : "";
    },
    formattedTwelve() {
      return Math.round(this.twelve.tweenedNum)
        ? Math.round(this.twelve.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(11, 12)
        ? 0
        : "";
    },
    formattedThirteen() {
      return Math.round(this.thirteen.tweenedNum)
        ? Math.round(this.thirteen.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(12, 13)
        ? 0
        : "";
    },
    formattedFourteen() {
      return Math.round(this.fourteen.tweenedNum)
        ? Math.round(this.fourteen.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(13, 14)
        ? 0
        : "";
    },
    formattedFifteen() {
      return Math.round(this.fifteen.tweenedNum)
        ? Math.round(this.fifteen.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(14, 15)
        ? 0
        : "";
    },
    formattedSixteen() {
      return Math.round(this.sixteen.tweenedNum)
        ? Math.round(this.sixteen.tweenedNum)
        : this.$store.getters.getFormData.cardNumber.substring(15, 16)
        ? 0
        : "";
    },
  },

  watch: {
    "$store.getters.getFormData"() {
      this.one.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(0, 1)
      );
      this.two.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(1, 2)
      );
      this.three.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(2, 3)
      );
      this.four.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(3, 4)
      );
      this.five.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(4, 5)
      );
      this.six.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(5, 6)
      );
      this.seven.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(6, 7)
      );
      this.eight.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(7, 8)
      );
      this.nine.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(8, 9)
      );
      this.ten.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(9, 10)
      );
      this.eleven.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(10, 11)
      );
      this.twelve.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(11, 12)
      );
      this.thirteen.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(12, 13)
      );
      this.fourteen.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(13, 14)
      );
      this.fifteen.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(14, 15)
      );
      this.sixteen.num = Number(
        this.$store.getters.getFormData.cardNumber.substring(15, 16)
      );
    },
    "$store.getters.getFormattedFormData"(newValue) {
      this.expirationDate = newValue.expirationDate.length
        ? newValue.expirationDate
        : "MM / YY";
      this.cvv = newValue.cvv.length ? newValue.cvv : "123";
      const fullName = newValue.firstName + " " + newValue.lastName;
      this.fullName = fullName.length > 1 ? fullName : "YOUR NAME";
    },

    one: {
      handler(newValue) {
        this.tweenOne(newValue.num);
      },
      deep: true,
    },
    two: {
      handler(newValue) {
        this.tweenTwo(newValue.num);
      },
      deep: true,
    },
    three: {
      handler(newValue) {
        this.tweenThree(newValue.num);
      },
      deep: true,
    },
    four: {
      handler(newValue) {
        this.tweenFour(newValue.num);
      },
      deep: true,
    },
    five: {
      handler(newValue) {
        this.tweenFive(newValue.num);
      },
      deep: true,
    },
    six: {
      handler(newValue) {
        this.tweenSix(newValue.num);
      },
      deep: true,
    },
    seven: {
      handler(newValue) {
        this.tweenSeven(newValue.num);
      },
      deep: true,
    },
    eight: {
      handler(newValue) {
        this.tweenEight(newValue.num);
      },
      deep: true,
    },
    nine: {
      handler(newValue) {
        this.tweenNine(newValue.num);
      },
      deep: true,
    },
    ten: {
      handler(newValue) {
        this.tweenTen(newValue.num);
      },
      deep: true,
    },
    eleven: {
      handler(newValue) {
        this.tweenEleven(newValue.num);
      },
      deep: true,
    },
    twelve: {
      handler(newValue) {
        this.tweenTwelve(newValue.num);
      },
      deep: true,
    },
    thirteen: {
      handler(newValue) {
        this.tweenThirteen(newValue.num);
      },
      deep: true,
    },
    fourteen: {
      handler(newValue) {
        this.tweenFourteen(newValue.num);
      },
      deep: true,
    },
    fifteen: {
      handler(newValue) {
        this.tweenFifteen(newValue.num);
      },
      deep: true,
    },
    sixteen: {
      handler(newValue) {
        this.tweenSixteen(newValue.num);
      },
      deep: true,
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

.credit-card-number-space {
  margin-right: 4px;
}
</style>
