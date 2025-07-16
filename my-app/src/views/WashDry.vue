<template>
  <div class="page-container">
    <h1 class="page-title">🧼 Wash & Dry</h1>
    <p class="page-description">
      Whether you prefer self-service or need our assistance, we’ve got clean stations for washing and drying your dogs with care.
    </p>

    <!-- Info Sections -->
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

    <!-- Booking Form -->
    <form class="booking-form" @submit.prevent="submitBooking">
      <h2 class="section-heading">📅 Book a Wash & Dry Session</h2>

      <label>
        Select Dog:
        <select v-model="form.dogId" required>
          <option disabled value="">Choose your dog</option>
          <option v-for="dog in dogs" :key="dog._id" :value="dog._id">
            {{ dog.name }} ({{ dog.breed }})
          </option>
        </select>
      </label>

      <label>
        Services:
        <select v-model="form.items" required>
          <option>Self</option>
          <option>Assistance</option>
        </select>
      </label>

      <label>
        Preferred Date:
        <input v-model="form.date" type="date" required />
      </label>

      <label>
        Notes (optional):
        <textarea v-model="form.notes" placeholder="E.g. sensitive skin, hates dryers"></textarea>
      </label>

      <label>
        Estimated Cost (THB):
        <input v-model.number="form.cost" type="number" min="0" required />
      </label>

      <button type="submit" class="cta-button">Confirm Booking</button>
    </form>

    <p v-if="confirmation" class="confirmation">{{ confirmation }}</p>
    <p v-if="error" class="error-msg">{{ error }}</p>

    <router-link to="/" class="service-link">← Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'WashDry',
  data() {
    return {
      form: {
        dogId: '',
        items: [],
        date: '',
        notes: '',
        cost: 0,
      },
      dogs: [],
      confirmation: '',
      error: '',
    }
  },
  async mounted() {
    await this.fetchDogs()
  },
  methods: {
    async fetchDogs() {
      const token = localStorage.getItem('token')
      const user = JSON.parse(atob(token.split('.')[1]))
      const userId = user.id

      try {
        const res = await fetch(`http://localhost:5000/api/dogs/member/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        this.dogs = data
      } catch (err) {
        this.error = 'Failed to load your dogs.'
      }
    },

    async submitBooking() {
      this.error = ''
      this.confirmation = ''
      const token = localStorage.getItem('token')

      try {
        const res = await fetch('http://localhost:5000/api/wash-dry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(this.form),
        })

        if (!res.ok) {
          const errorData = await res.json()
          this.error = errorData.error || 'Failed to book wash & dry.'
          return
        }

        const result = await res.json()
        this.confirmation = `✅ Wash & Dry session booked for "${result.dogId.name}" on ${result.date}.`
        this.form = { dogId: '', items: [], date: '', notes: '', cost: 0 }
      } catch (err) {
        this.error = 'Server error while booking.'
      }
    },
  },
}
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-description {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.info-section {
  margin-bottom: 1.5rem;
}

.section-heading {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.menu-list {
  padding-left: 1.2rem;
}

.booking-form label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
}

.booking-form input,
.booking-form select,
.booking-form textarea {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.booking-form textarea {
  resize: vertical;
}

.cta-button {
  background-color: #4e71ff;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #355dd8;
}

.confirmation {
  color: #2a9d8f;
  text-align: center;
  margin-top: 1rem;
}

.error-msg {
  color: #e63946;
  text-align: center;
  margin-top: 1rem;
}

.service-link {
  display: block;
  margin-top: 2rem;
  text-align: center;
  color: #4e71ff;
  text-decoration: none;
}
</style>
