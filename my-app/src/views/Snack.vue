<template>
  <div class="page-container">
    <h1 class="page-title">🍖 Dog Snacks</h1>
    <p class="page-description">
      Treat your furry friend to our selection of healthy, tasty snacks made with love.
    </p>

    <!-- Popular Snacks Info -->
    <div class="info-section">
      <h2 class="section-heading">🐕 Popular Snacks</h2>
      <ul class="menu-list">
        <li>Dried Beef Strips</li>
        <li>Peanut Butter Biscuits</li>
        <li>Chicken Jerky</li>
        <li>Carrot & Pumpkin Treats</li>
      </ul>
    </div>

    <!-- Order Form -->
    <form @submit.prevent="submitOrder" class="booking-form">
      <h2 class="section-heading">🛒 Order Snacks</h2>

      <!-- Dog Selector -->
      <label>
        Select Dog:
        <select v-model="form.dogId" required>
          <option disabled value="">Select a dog</option>
          <option v-for="dog in dogs" :key="dog._id" :value="dog._id">
            {{ dog.name }} ({{ dog.breed }})
          </option>
        </select>
      </label>

      <!-- Snack Items -->
      <div v-for="(item, index) in form.items" :key="index" class="item-row">
        <label>
          Snack:
          <input v-model="item.name" placeholder="e.g. Chicken Jerky" required />
        </label>
        <label>
          Quantity:
          <input v-model.number="item.quantity" type="number" min="1" required />
        </label>
        <label>
          Unit Price:
          <input v-model.number="item.unitPrice" type="number" min="0" required />
        </label>
        <button @click.prevent="removeItem(index)" class="remove-button">❌</button>
      </div>

      <button @click.prevent="addItem" class="cta-button">➕ Add Snack</button>

      <div class="total-cost">
        <strong>Total Cost:</strong> {{ totalCost }} THB
      </div>

      <button type="submit" class="cta-button">Place Order</button>

      <p v-if="success" class="success-msg">{{ success }}</p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>

    <router-link to="/" class="service-link">← Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Snack',
  data() {
    return {
      dogs: [],
      form: {
        dogId: '',
        items: [
          { name: '', quantity: 1, unitPrice: 0 }
        ]
      },
      success: '',
      error: ''
    }
  },
  computed: {
    totalCost() {
      return this.form.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    }
  },
  methods: {
    async fetchDogs() {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(atob(token.split('.')[1]))
        const res = await fetch(`http://localhost:5000/api/dogs/member/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.dogs = await res.json()
      } catch (err) {
        this.error = 'Failed to load dogs'
        console.error(err)
      }
    },
    addItem() {
      this.form.items.push({ name: '', quantity: 1, unitPrice: 0 })
    },
    removeItem(index) {
      this.form.items.splice(index, 1)
    },
    async submitOrder() {
      this.error = ''
      this.success = ''
      const token = localStorage.getItem('token')

      try {
        const res = await fetch('http://localhost:5000/api/snacks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ...this.form, totalCost: this.totalCost })
        })

        if (!res.ok) {
          const errData = await res.json()
          this.error = errData.error || 'Failed to place order'
          return
        }

        this.success = '✅ Snack order placed!'
        this.form = { dogId: '', items: [{ name: '', quantity: 1, unitPrice: 0 }] }
      } catch (err) {
        this.error = 'Error submitting order.'
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
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-description {
  text-align: center;
  margin-bottom: 1.5rem;
}

.section-heading {
  margin-top: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.menu-list {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.booking-form label {
  display: block;
  margin-bottom: 1rem;
}

.booking-form input,
.booking-form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.item-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.remove-button {
  background: #ff5e5e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  height: fit-content;
}

.cta-button {
  display: block;
  margin-top: 1rem;
  background: #4e71ff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
}

.total-cost {
  margin-top: 1rem;
  font-weight: bold;
}

.success-msg {
  color: #2a9d8f;
  margin-top: 1rem;
}

.error-msg {
  color: #e63946;
  margin-top: 1rem;
}

.service-link {
  display: inline-block;
  margin-top: 1.5rem;
  text-decoration: none;
  color: #4e71ff;
}
</style>
