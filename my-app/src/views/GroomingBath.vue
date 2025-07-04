<template>
    <div class="page-container">
      <h1 class="page-title">✂️ Grooming & Bath</h1>
      <p class="page-description">
        Pamper your pup with professional grooming and bathing services tailored to all breeds and coat types.
      </p>
  
      <div class="info-section">
        <h2 class="section-heading">✂️ Grooming Services</h2>
        <ul class="menu-list">
          <li>Haircut & Trimming</li>
          <li>Nail Clipping & Filing</li>
          <li>Ear Cleaning</li>
          <li>De-shedding Treatment</li>
        </ul>
      </div>
  
      <div class="info-section">
        <h2 class="section-heading">🛁 Bath Options</h2>
        <ul class="menu-list">
          <li>Basic Bath with Pet-Friendly Shampoo</li>
          <li>Medicated Bath (Vet Approved)</li>
          <li>Flea & Tick Treatment</li>
          <li>Conditioning & Fragrance</li>
        </ul>
      </div>
  
      <form class="booking-form" @submit.prevent="submitBooking">
        <h2 class="section-heading">📅 Book Grooming & Bath</h2>
        <label>
          Your Name:
          <input v-model="form.name" type="text" required />
        </label>
  
        <label>
          Dog's Name / Breed:
          <input v-model="form.dog" type="text" required />
        </label>
  
        <label>
          Preferred Date:
          <input v-model="form.date" type="date" required />
        </label>
  
        <label>
          Service Type:
          <select v-model="form.type" required>
            <option disabled value="">Select a service</option>
            <option>Grooming</option>
            <option>Bath</option>
            <option>Grooming & Bath Combo</option>
          </select>
        </label>
  
        <button type="submit" class="cta-button">Book Now</button>
      </form>
  
      <p v-if="confirmation" class="confirmation">{{ confirmation }}</p>
  
      <router-link to="/" class="service-link">← Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GroomingBath',
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
        const { name, dog, date, type } = this.form
        this.confirmation = `✅ ${dog} is booked for ${type} on ${date}. Thank you, ${name}!`
        this.form = { name: '', dog: '', date: '', type: '' }
      },
    },
  }
  </script>
  