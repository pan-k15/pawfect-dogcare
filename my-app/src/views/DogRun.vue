<template>
  <div class="page-container">
    <h1 class="page-title">🏃‍♂️ Dog Run</h1>
    <p class="page-description">
      Let your dogs enjoy freedom and fun in our secure, spacious dog run area. Book a session below!
    </p>

    <form class="booking-form" @submit.prevent="submitBooking">
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
        Preferred Date:
        <input v-model="form.date" type="date" required />
      </label>

      <label>
        Time Slot:
        <select v-model="form.timeSlot" required>
          <option disabled value="">Select time</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </label>

      <label>
        Duration (minutes):
        <input v-model.number="form.durationMinutes" type="number" min="15" required />
      </label>

      <label>
        Special Notes:
        <textarea v-model="form.notes" placeholder="e.g. energetic, needs leash supervision"></textarea>
      </label>

      <button type="submit" class="cta-button">Book Dog Run</button>
    </form>

    <p v-if="confirmation" class="confirmation">{{ confirmation }}</p>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'DogRun',
  data() {
    return {
      dogs: [],
      form: {
        dogId: '',
        date: '',
        timeSlot: '',
        durationMinutes: 30,
        notes: '',
      },
      confirmation: '',
      error: ''
    }
  },
  methods: {
    async fetchDogs() {
      try {
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        const userId = decoded.id

        const res = await fetch(`http://localhost:5000/api/dogs/member/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const data = await res.json()
        this.dogs = data
      } catch (err) {
        this.error = 'Failed to fetch dogs.'
        console.error(err)
      }
    },
    async submitBooking() {
      this.error = ''
      this.confirmation = ''
      const token = localStorage.getItem('token')

      try {
        const res = await fetch('http://localhost:5000/api/dog-run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(this.form),
        })

        if (!res.ok) {
          const err = await res.json()
          this.error = err.error || 'Booking failed.'
          return
        }

        const result = await res.json()
        this.confirmation = `✅ Dog run booked for ${result.date.split('T')[0]} (${result.timeSlot})!`
        this.form = {
          dogId: '',
          date: '',
          timeSlot: '',
          durationMinutes: 30,
          notes: ''
        }
      } catch (err) {
        this.error = 'Error submitting booking.'
        console.error(err)
      }
    }
  },
  mounted() {
    this.fetchDogs()
  }
}
</script>

<style scoped>
.page-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.page-title {
  text-align: center;
  margin-bottom: 1rem;
}
.page-description {
  text-align: center;
  margin-bottom: 2rem;
}
.booking-form label {
  display: block;
  margin-bottom: 1rem;
}
.booking-form input,
.booking-form select,
.booking-form textarea {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.cta-button {
  background-color: #4e71ff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}
.cta-button:hover {
  background-color: #3858d1;
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
</style>
