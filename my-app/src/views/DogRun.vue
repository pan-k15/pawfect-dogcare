<template>
  <div class="page-container">
    <h1 class="page-title">🏃‍♂️ Dog Run</h1>
    <p class="page-description">
      Let your dogs enjoy freedom and fun in our secure, spacious dog run area. Book a session below!
    </p>

    <form class="booking-form" @submit.prevent="submitBooking">
      <label>
        Your Name:
        <input v-model="form.name" type="text" required />
      </label>

      <label>
        Dog's Name:
        <input v-model="form.dogName" type="text" required />
      </label>

      <label>
        Preferred Date:
        <input v-model="form.date" type="date" required />
      </label>

      <button type="submit" class="cta-button">Book Dog Run</button>
    </form>

    <p v-if="confirmation" class="confirmation">{{ confirmation }}</p>
  </div>
</template>

<script>
export default {
  name: 'DogRun',
  data() {
    return {
      form: {
        name: '',
        dogName: '',
        date: '',
      },
      confirmation: '',
    }
  },
  methods: {
    submitBooking() {
      const { name, dogName, date } = this.form;
      this.confirmation = `✅ ${dogName} is booked for a Dog Run on ${date}. Thank you, ${name}!`;
      this.form.name = '';
      this.form.dogName = '';
      this.form.date = '';
    },
  },
}
</script>
