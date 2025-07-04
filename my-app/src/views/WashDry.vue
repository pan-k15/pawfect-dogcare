<template>
    <div class="page-container">
      <h1 class="page-title">🧼 Wash & Dry</h1>
      <p class="page-description">
        Whether you prefer self-service or need our assistance, we’ve got clean stations for washing and drying your dogs with care.
      </p>
  
      <div class="info-section">
        <h2 class="section-heading">💧 Self-Service</h2>
        <ul class="menu-list">
          <li>Professional-grade wash tubs</li>
          <li>Pet-safe shampoo included</li>
          <li>High-powered dryers available</li>
          <li>Fresh towels provided</li>
        </ul>
      </div>
  
      <div class="info-section">
        <h2 class="section-heading">🧍 Assisted Service</h2>
        <ul class="menu-list">
          <li>We wash and dry for you</li>
          <li>Ideal for senior dogs or heavy coats</li>
          <li>Appointments recommended</li>
        </ul>
      </div>
  
      <form class="booking-form" @submit.prevent="submitBooking">
        <h2 class="section-heading">📅 Book a Session</h2>
        <label>
          Your Name:
          <input v-model="form.name" type="text" required />
        </label>
  
        <label>
          Dog's Breed/Name:
          <input v-model="form.dog" type="text" required />
        </label>
  
        <label>
          Preferred Date:
          <input v-model="form.date" type="date" required />
        </label>
  
        <label>
          Service Type:
          <select v-model="form.type" required>
            <option disabled value="">Select one</option>
            <option>Self-Service</option>
            <option>Assisted Service</option>
          </select>
        </label>
  
        <button type="submit" class="cta-button">Confirm Booking</button>
      </form>
  
      <p v-if="confirmation" class="confirmation">{{ confirmation }}</p>
  
      <router-link to="/" class="service-link">← Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WashDry',
    data() {
      return {
        form: {
          name: '',
          dog: '',
          date: '',
          type: '',
        },
        confirmation: '',
      }
    },
    methods: {
      submitBooking() {
        const { name, dog, date, type } = this.form;
        this.confirmation = `✅ ${dog}'s ${type} Wash is booked on ${date}. Thank you, ${name}!`;
        this.form = { name: '', dog: '', date: '', type: '' };
      },
    },
  }
  </script>
  