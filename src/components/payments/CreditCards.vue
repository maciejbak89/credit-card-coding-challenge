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
          alt="credit card logo image"
          class="credit-card-logo"
          :src="require('../../assets/credit-card-logo.png')"
          height="24"
          width="32"
        />
        <div
          class="credit-card-text font-weight-medium"
          style="position: absolute; font-size: 18px; top: 79px; left: 20px"
        >
          <!-- {{ creditCardNumber }} -->
          {{ cardNumber }}
        </div>
        <!-- <v-fade-transition hide-on-leave mode="out-in"> -->
        <transition name="fade" mode="out-in">
          <div
            class="text-uppercase text-body-2 font-weight-medium credit-card-text"
            style="position: absolute; bottom: 20px; left: 20px"
            :key="fullName"
          >
            {{ fullName }}
          </div>
        </transition>
        <!-- </v-fade-transition> -->
        <div
          class="d-flex flex-column justify-center align-center credit-card-text"
          style="position: absolute; bottom: 20px; left: 250px"
        >
          <div class="text-caption">EXPIRY</div>
          <div class="text-body-2 font-weight-medium">
            {{ expirationDate }}
          </div>
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
          <div class="text-body-2 font-weight-medium">{{ cvv }}</div>
        </div>
      </div>
    </div>
    <!-- <v-btn @click="animateTween"></v-btn> -->
    <!-- <div class="mt-8">displayValue: {{ displayValue }}</div> -->
    <!-- <div class="mt-8">myData.num: {{ myData.num }}</div>
    <div class="mt-2">formattedNum: {{ formattedNum }}</div>
    <v-btn @click="increaseNum"></v-btn> -->
  </v-container>
</template>

<script>
import { eventBus } from "@/main";
import gsap from "gsap";
// import { TweenLite } from "gsap/gsap-core";

export default {
  data: () => ({
    cardNumber: "1234 1234 1234 1234",
    expirationDate: "MM / YY",
    cvv: "123",
    fullName: "YOUR NAME",

    // ccNumber: 0,
    // ccNumberTweened: 0,

    arr: [1, 2, 3],
    testVal: 0,

    // displayValue: this.value,
    // tweenValue: this.value,
    // displayValue: 0,
    // tweenValue: 0,

    myData: {
      num: 0,
      tweenedNum: 0,
    },
  }),

  methods: {
    increaseNum() {
      this.myData.num = this.myData.num + 10;
    },
    tween(newNumber) {
      // console.log("tween: ", newNumber);
      gsap.to(this.myData, {
        duration: 0.2,
        tweenedNum: newNumber,
        // ease: "none",
        // overwrite: "auto",
      });
    },
  },

  computed: {
    formattedNum() {
      return Math.round(this.myData.tweenedNum);
    },
  },

  watch: {
    myData: {
      handler(newValue) {
        // console.log(newValue, oldValue);
        this.tween(newValue.num);
      },
      deep: true,
    },
    // value() {
    //   gsap.to(this, {
    //     tweenValue: this.value,
    //     onUpdate: () => {
    //       this.displayValue = Math.ceil(this.tweenValue);
    //     },
    //   });
    // },
  },

  created() {
    eventBus.$on("userForm", (data) => {
      this.cardNumber = data.cardNumber.length
        ? data.cardNumber
        : "1234 1234 1234 1234";
      this.expirationDate = data.expirationDate.length
        ? data.expirationDate
        : "MM / YY";
      this.cvv = data.cvv.length ? data.cvv : "123";
      const fullName = data.firstName + " " + data.lastName;
      this.fullName = fullName.length > 1 ? fullName : "YOUR NAME";
    });

    // eventBus.$on("test", (data) => {
    //   this.value = data;
    // });
  },

  beforeDestroy() {
    eventBus.$off("userForm");
  },
};
</script>

<style scoped>
.credit-cards-heading {
  color: var(--v-kinBlack-base);
}
.credit-cards-container {
  position: relative;
  /* margin-left: 48px; */
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter,
.fade-lave-to {
  opacity: 0;
}
</style>
