<template>
  <span>{{ formattedNum }}</span>
</template>

<script>
import gsap from "gsap";
import { mapGetters } from "vuex";

export default {
  // The code below was written to provide a tween effect on the entered credit card number.
  // This effect was created using the GSAP animation library (https://greensock.com/docs/v3/GSAP/gsap.to()).
  props: {
    start: Number,
    end: Number,
    displayInit: Number,
  },

  data: () => ({
    number: { num: 0, tweenedNum: 0 },
    substringStart: 0,
    substringEnd: 0,
  }),

  created() {
    // Initiate the number object that will be used to create the tween animation with values passed
    // as props from the parent. Use a default initiation display value from the parent and define
    // the substring start and end points for the watcher on the changing form credit card number:
    this.number = {
      num: this.displayInit,
      tweenedNum: this.displayInit,
    };
    this.substringStart = this.start;
    this.substringEnd = this.end;
  },

  methods: {
    // Method that defines the tween using the to() method that defines the destination value of
    // the tween and the duration of the animation:
    tweenNum(newNumber) {
      gsap.to(this.number, { duration: 0.2, tweenedNum: newNumber });
    },
  },

  computed: {
    ...mapGetters(["getFormData"]),
    formattedNum() {
      return Math.round(this.number.tweenedNum)
        ? Math.round(this.number.tweenedNum)
        : this.getFormData.cardNumber.substring(
            this.substringStart,
            this.substringEnd
          )
        ? 0
        : "";
      // Double ternary operator is used for credit card numbers that are equal to 0 so
      // that 0's are also displayed, otherwise display an empty space is the value is empty.
    },
  },

  watch: {
    // Watch the changing credit card number from the Vuex state of formData to update the
    // number object accordingly:
    "$store.getters.getFormData"() {
      this.number.num = Number(
        this.getFormData.cardNumber.substring(
          this.substringStart,
          this.substringEnd
        )
      );
    },

    // Using the above watcher for the Vuex formData cardNumber, watch for changes on each credit
    // card number and run the tweenNum method on each value change to achieve an individual tween
    // animation for each credit card number:
    number: {
      handler(newValue) {
        this.tweenNum(newValue.num);
      },
      deep: true,
    },
  },
};
</script>
