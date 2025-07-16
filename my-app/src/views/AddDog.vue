<template>
  <div class="page-container">
    <h1 class="page-title">🐶 Add Dog</h1>
    <form @submit.prevent="submitDog" class="booking-form">
      <label>
        Dog Name:
        <input v-model="form.name" type="text" required />
      </label>

      <label>
        Breed:
        <select v-model="form.breed" required>
          <option disabled value="">Select breed</option>
          <option>Golden Retriever</option>
          <option>Labrador</option>
          <option>Poodle</option>
          <option>Beagle</option>
          <option>Shih Tzu</option>
          <option>Mixed</option>
        </select>
      </label>

      <label>
        Age (years):
        <input v-model.number="form.age" type="number" min="0" required />
      </label>

      <label>
        Weight (kg):
        <input v-model.number="form.weight" type="number" min="0" required />
      </label>

      <label>
        Notes:
        <input v-model="form.notes" type="text" />
      </label>

      <button type="submit" class="cta-button">Add Dog</button>

      <p v-if="error" class="error-msg">{{ error }}</p>
      <p v-if="success" class="success-msg">{{ success }}</p>
    </form>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'
export default {
  name: 'AddDog',
  data() {
    return {
      form: {
        name: '',
        breed: '',
        age: '',
        weight: '',
        notes: '',
      },
      memberId: '',
      error: '',
      success: '',
    }
  },
  async mounted() {
    await this.fetchMemberId()
  },
  methods: {
    async fetchMemberId() {
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        const decoded = jwtDecode(token) // 👈 decode the token
        const userId = decoded.id
        console.log(userId)
        const username = localStorage.getItem('username') // Save it during login
        console.log(username)
        const res = await fetch(`http://localhost:5000/api/members/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        console.log(data)
        this.memberId = data._id
      } catch (err) {
        this.error = 'Failed to fetch member info.'
        console.error(err)
      }
    },
    async submitDog() {
      this.error = ''
      this.success = ''
      const token = localStorage.getItem('token')

      try {
        const res = await fetch('http://localhost:5000/api/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...this.form, memberId: this.memberId }),
        })

        if (!res.ok) {
          const errorData = await res.json()
          this.error = errorData.error || 'Failed to add dog'
          return
        }

        const data = await res.json()
        this.success = `Dog "${data.name}" added successfully!`
        this.form = { name: '', breed: '', age: '', weight: '', notes: '' }
      } catch (err) {
        this.error = 'Error while adding dog.'
        console.error(err)
      }
    },
  },
}
</script>
