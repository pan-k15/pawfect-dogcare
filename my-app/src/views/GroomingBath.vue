<template>
  <div class="page-container">
    <h1 class="page-title">✂️ Grooming & Bath</h1>
    <p class="page-description">
      Pamper your pup with professional grooming and bathing services tailored to all breeds and coat types.
    </p>

    <!-- Info Sections -->
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

    <!-- Booking Form -->
    <form class="booking-form" @submit.prevent="submitBooking">
      <h2 class="section-heading">📅 Book Grooming & Bath</h2>

      <label>
        Select Dog:
        <select v-model="form.dogId" required>
          <option disabled value="">Choose your dog</option>
          <option v-for="dog in dogs" :key="dog._id" :value="dog._id">
            {{ dog.name }} ({{ dog.breed }})
          </option>
        </select>
      </label>

      <fieldset>
        <legend>Select Services:</legend>
        <div v-for="option in serviceOptions" :key="option" class="checkbox-group">
          <label>
            <input type="checkbox" :value="option" v-model="form.services" />
            {{ option }}
          </label>
        </div>
      </fieldset>

      <label>
        Preferred Date:
        <input v-model="form.date" type="date" required />
      </label>

      <label>
        Estimated Cost (THB):
        <input v-model.number="form.cost" type="number" required />
      </label>

      <label>
        Notes:
        <textarea v-model="form.notes" placeholder="E.g. gentle shampoo only, nervous around clippers"></textarea>
      </label>

      <button type="submit" class="cta-button">Book Now</button>

      <p v-if="confirmation" class="confirmation-msg">{{ confirmation }}</p>
    </form>

    <router-link to="/" class="service-link">← Back to Home</router-link>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'GroomingBath',
  data() {
    return {
      dogs: [],
      form: {
        dogId: '',
        services: [],
        date: '',
        cost: 0,
        notes: '',
        status: 'Pending',
        paid: false,
      },
      serviceOptions: [
        'Haircut & Trimming',
        'Nail Clipping & Filing',
        'Ear Cleaning',
        'De-shedding Treatment',
        'Basic Bath',
        'Medicated Bath',
        'Flea & Tick Treatment',
        'Conditioning & Fragrance',
      ],
      confirmation: '',
    }
  },
  mounted() {
    this.fetchDogs()
  },
  methods: {
    async fetchDogs() {
      try {
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        const userId = decoded.id
        const res = await fetch(`http://localhost:5000/api/dogs/member/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        this.dogs = data
      } catch (err) {
        console.error('Error fetching dogs:', err)
      }
    },
    async submitBooking() {
      try {
        const res = await fetch('http://localhost:5000/api/grooming-bath', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        })

        const data = await res.json()
        if (!res.ok) {
          this.confirmation = data.error || 'Booking failed.'
          return
        }

        this.confirmation = `✅ Booking confirmed for ${this.dogs.find(d => d._id === this.form.dogId)?.name || 'your dog'} on ${this.form.date}`
        this.form = {
          dogId: '',
          services: [],
          date: '',
          cost: 0,
          notes: '',
          status: 'Pending',
          paid: false,
        }
      } catch (err) {
        console.error('Booking error:', err)
        this.confirmation = '❌ Failed to book grooming appointment.'
      }
    },
  },
}
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  margin-bottom: 0.5rem;
}

.page-description {
  text-align: center;
  margin-bottom: 2rem;
}

.section-heading {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

.menu-list {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.booking-form label,
fieldset {
  display: block;
  margin-bottom: 1rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  margin-bottom: 0.5rem;
}

.cta-button {
  width: 100%;
  background: #4e71ff;
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
}

.cta-button:hover {
  background: #3a55d9;
}

.confirmation-msg {
  text-align: center;
  margin-top: 1rem;
  color: #2a9d8f;
}

.service-link {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
}
</style>
