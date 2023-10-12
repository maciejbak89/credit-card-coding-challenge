// import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import UserForm from "../../src/components/payments/UserForm.vue";
// import AppService from "../../src/services/AppService";
import axios from "axios";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuetify);

jest.mock("axios", () => {
  post: jest.fn(() => {
    Promise.resolve({ data: { id: 101 } });
  });
});

describe("UserForm.vue", () => {
  let vuetify;
  let store;
  // let state;
  let actions;
  let getters;

  //   beforeEach(() => {
  // vuetify = new Vuetify();

  //   Create a mock store:
  // state = {
  // formData: {},
  // formattedFormData: {},
  // creditCardType: "other",
  // creditCardFormat: 1,
  // isSubmitCreditCardDataLoading: false,
  // isSubmitCreditCardDataSuccess: false,
  // isSubmitCreditCardDataError: false,
  // submissionResponse: {},
  // };

  actions = {
    updateForm: jest.fn(),
    updateFormattedForm: jest.fn(),
    updateCreditCardType: jest.fn(),
    updateCreditCardFormat: jest.fn(),
    submitCreditCardData: jest.fn(),
  };

  getters = {
    getCreditCardType: () => "visa",
    getCreditCardFormat: () => 1,
    getSubmissionResponse: () => {
      return {
        cardNumber: "4242424242424242",
        expirationDate: "12/24",
        cvv: "321",
        firstName: "Maciej",
        lastName: "Bak",
        zipCode: "60714",
        id: 101,
      };
    },
    isSubmitCreditCardDataLoading: () => false,
    isSubmitCreditCardDataSuccess: () => true,
    isSubmitCreditCardDataError: () => false,
  };

  store = new Vuex.Store({
    actions,
    getters,
  });
  //   });

  it("validates the credit card number correctly", () => {
    let rules = UserForm.data().rules;
    let methods = UserForm.methods;

    expect(rules.cardNumber("")).toBe("Credit card number is required"); // Empty field
    expect(methods.luhnAlgorithm("4242424242424242")).toBe(true); // Luhn's ALgorithm validation
    expect(methods.luhnAlgorithm("4242424242424241")).toBe(
      "Credit card number is not valid"
    ); // Card number doesn't pass Luhn's Algorithm
  });

  it("validates the expiration date correctly", () => {
    let rules = UserForm.data().rules;
    let methods = UserForm.methods;

    expect(rules.expirationDate[0]("")).toBe("Expiration date is required"); // Empty field
    expect(rules.expirationDate[1]("1")).toBe("Enter a valid month and year"); // Invalid expiration date (less than length 7)
    expect(rules.expirationDate[1]("1/24")).toBe(
      "Enter a valid month and year"
    ); // Month has to be double digits
    expect(rules.expirationDate[1]("12 / 25")).toBe(true);
    expect(methods.validateExpirationDate("13/25")).toBe(
      "Enter a valid expiration date"
    ); // Invalid expiration date (month greater than 12)
    expect(methods.validateExpirationDate("09/21")).toBe(
      "Enter a valid expiration date"
    ); // Invalid expiration date (year is in the past)
  });

  // it("renders", () => {
  //   // const wrapper = shallowMount(UserForm, {
  //   //   store,
  //   // });
  //   const wrapper = mount(UserForm, {
  //     localVue,
  //     vuetify,
  //     store,
  //   });

  //   expect(wrapper.exists()).toBe(true);
  // });

  //   ---------- Incomplete tests for form submission: -----------

  it("mocks form submission", async () => {
    const wrapper = shallowMount(UserForm, {
      localVue,
      vuetify,
      store,
    });

    await wrapper.setData({
      cardNumber: "4111 1111 1111 1111", // Valid card number
      expirationDate: "12/25", // Valid expiration date
      cvv: "123", // Valid CVV
      firstName: "John", // Valid first name
      lastName: "Doe", // Valid last name
      zipCode: "12345", // Valid zip code
    });

    const submitButton = wrapper.find("button");
    await submitButton.trigger("click");

    // Ensure that the submitCreditCardData action is called with the correct form data
    expect(actions.submitCreditCardData).toHaveBeenCalledWith({
      cardNumber: "4111111111111111",
      expirationDate: "12/25",
      cvv: "123",
      firstName: "John",
      lastName: "Doe",
      zipCode: "12345",
    });
  });

  it("submits form data to an external API", async () => {
    const wrapper = shallowMount(UserForm);

    await wrapper.setData({
      cardNumber: "4242424242424242",
      expirationDate: "12/25",
      cvv: "123",
      firstName: "John",
      lastName: "Doe",
      zipCode: "12345",
    });

    await wrapper.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain(101);

    expect(axios.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        cardNumber: "4242424242424242",
        expirationDate: "12/25",
        cvv: "123",
        firstName: "John",
        lastName: "Doe",
        zipCode: "12345",
      }
    );
  });

  // it("submits card data when 'Submit' button is clicked", async () => {
  //   // Mount the component with the mock store
  //   const wrapper = mount(UserForm, {
  //     localVue,
  //     vuetify,
  //     store,
  //   });

  //   // Simulate user input by setting form data
  //   await wrapper.setData({
  //     cardNumber: "1234 5678 9012 3456",
  //     expirationDate: "12 / 25",
  //     cvv: "123",
  //     firstName: "John",
  //     lastName: "Doe",
  //     zipCode: "12345",
  //   });

  //   // Mock the submitCreditCardData action (replace with your own mock implementation)
  //   const mockSubmitCreditCardData = jest.fn();
  //   console.log("mockSubmitCreditCardData: ", mockSubmitCreditCardData);
  //   console.log(
  //     "mockSubmitCreditCardData.mock.results: ",
  //     mockSubmitCreditCardData.mock,
  //     mockSubmitCreditCardData.mock.results
  //   );
  //   wrapper.vm.submitCreditCardData = mockSubmitCreditCardData;

  //   // Simulate a button click on the "Submit" button
  //   const submitButton = wrapper.find("button");
  //   await submitButton.trigger("click");

  //   // Expect that the submitCreditCardData method was called with the correct data
  //   expect(mockSubmitCreditCardData).toHaveBeenCalledWith({
  //     cardNumber: "1234567890123456",
  //     expirationDate: "12/25",
  //     cvv: "123",
  //     firstName: "John",
  //     lastName: "Doe",
  //     zipCode: "12345",
  //   });
  // });

  // it("calls submitCreditCardData when Submit button is clicked", async () => {
  //   // Mock the submitCreditCardData method
  //   const mockResponse = { data: "mock response" };
  //   AppService.submitCreditCardData = jest.fn(() =>
  //     Promise.resolve(mockResponse)
  //   );

  //   // Fill in the form fields (you may need to adjust this part based on your form structure)
  //   await wrapper.setData({
  //     cardNumber: "1234 1234 1234 1234",
  //     expirationDate: "12 / 23",
  //     cvv: "123",
  //     firstName: "John",
  //     lastName: "Doe",
  //     zipCode: "60642-7546",
  //   });

  //   // Click the Submit button
  //   wrapper.find(".user-form-text-white").trigger("click");

  //   // Wait for Vue to update
  //   await wrapper.vm.$nextTick();

  //   // Expect the submitCreditCardData method to be called
  //   expect(AppService.submitCreditCardData).toHaveBeenCalledWith({
  //     cardNumber: "1234123412341234",
  //     expirationDate: "12/23",
  //     cvv: "123",
  //     firstName: "John",
  //     lastName: "Doe",
  //     zipCode: "60642-7546",
  //   });

  //   // Expect the submissionResponse to be updated based on the mock response
  //   expect(wrapper.vm.submissionResponse).toEqual(mockResponse);
  // });
});
