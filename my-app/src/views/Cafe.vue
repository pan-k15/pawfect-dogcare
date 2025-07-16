<template>
  <div class="page-container">
    <h1 class="page-title">☕ Dog Cafe</h1>
    <p class="page-description">
      Relax with your favorite drinks while your furry friend plays nearby. Our cafe welcomes both pets and people!
    </p>

    <div class="info-section">
      <h2 class="section-heading">🍩 Menu Highlights</h2>
      <ul class="menu-list">
        <li><strong>Dogccino</strong> – frothy milk for dogs 🐶</li>
        <li><strong>Espresso</strong> – classic coffee for humans ☕</li>
        <li><strong>Chew Cookies</strong> – tasty biscuits for dogs 🍪</li>
        <li><strong>Blueberry Cake</strong> – sweet treat for you 🎂</li>
      </ul>
    </div>

    <div class="info-section">
      <h2 class="section-heading">🛒 Order Now</h2>
      <form @submit.prevent="submitOrder" class="order-form">
        <label>
          Select Dog:
          <select v-model="form.dogId" required>
            <option disabled value="">-- Select Dog --</option>
            <option v-for="dog in dogs" :key="dog._id" :value="dog._id">
              {{ dog.name }} ({{ dog.breed }})
            </option>
          </select>
        </label>

        <label>
          Select Items:
          <select v-model="form.selectedItems" multiple required>
            <option v-for="item in menuItems" :key="item.name" :value="item">
              {{ item.name }} (฿{{ item.price }})
            </option>
          </select>
        </label>

        <label>
          Notes:
          <textarea v-model="form.notes" placeholder="Any special requests"></textarea>
        </label>

        <button type="submit" class="cta-button">Place Order</button>
      </form>

      <p v-if="success" class="success-msg">{{ success }}</p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>

    <router-link to="/" class="service-link">← Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Cafe',
  data() {
    return {
      dogs: [], // to be fetched from your API
      menuItems: [
        { name: 'Dogccino', price: 50 },
        { name: 'Espresso', price: 80 },
        { name: 'Chew Cookies', price: 40 },
        { name: 'Blueberry Cake', price: 100 }
      ],
      form: {
        dogId: '',
        selectedItems: [],
        notes: '',
      },
      success: '',
      error: '',
    }
  },
  async mounted() {
    await this.fetchDogs()
  },
  methods: {
    async fetchDogs() {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await fetch('http://localhost:5000/api/dogs/member/me', { // Adjust endpoint accordingly
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed to fetch dogs')
        this.dogs = await res.json()
      } catch (err) {
        console.error(err)
      }
    },
    async submitOrder() {
      this.success = ''
      this.error = ''

      if (this.form.selectedItems.length === 0) {
        this.error = 'Please select at least one item.'
        return
      }

      const items = this.form.selectedItems.map(item => ({
        name: item.name,
        quantity: 1,
        unitPrice: item.price
      }))

      const totalCost = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          this.error = 'Please login first.'
          return
        }

        const res = await fetch('http://localhost:5000/api/cafe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            dogId: this.form.dogId,
            items,
            notes: this.form.notes,
            totalCost
          }),
        })

        if (!res.ok) {
          const errData = await res.json()
          this.error = errData.error || 'Failed to place order'
          return
        }

        this.success = 'Order placed successfully! Thank you!'
        this.form = { dogId: '', selectedItems: [], notes: '' }
      } catch (err) {
        this.error = 'Error placing order.'
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
/* Add your CSS styling here similar to your other pages */
</style>
