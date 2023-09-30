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
      </div>
      <v-img
        alt="credit card back image"
        class="credit-card credit-card-back"
        :src="require('../../assets/credit-card-back.png')"
        height="186"
        width="328"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style scoped>
.credit-cards-heading {
  color: var(--v-kinBlack-base);
}
.credit-cards-container {
  position: relative;
  margin-left: 48px;
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

.credit-card-back {
  position: absolute;
  top: 0;
  left: 72px;
}
</style>
