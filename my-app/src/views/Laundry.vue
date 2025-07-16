<template>
  <div class="page-container">
    <h1 class="page-title">🧺 Dog Laundry Service</h1>

    <form @submit.prevent="submitLaundry" class="laundry-form">
      <label>
        Dog's Name:
        <input v-model="form.dogName" type="text" required />
      </label>

      <div v-for="(item, index) in form.items" :key="index" class="item-group">
        <label>
          Item:
          <select v-model="item.item" required>
            <option disabled value="">Select item</option>
            <option>Dog Clothes</option>
            <option>Dog Bed</option>
            <option>Towel</option>
            <option>Blanket</option>
            <option>Others</option>
          </select>
        </label>

        <label>
          Quantity:
          <input v-model.number="item.quantity" type="number" min="1" required />
        </label>

        <label>
          Cost per item (฿):
          <input v-model.number="item.cost" type="number" min="0" required />
        </label>

        <button type="button" class="remove-button" @click="removeItem(index)" v-if="form.items.length > 1">
          ❌ Remove Item
        </button>
      </div>

      <button type="button" class="cta-button" @click="addItem">➕ Add Another Item</button>

      <label>
        Special Instructions:
        <textarea v-model="form.notes" placeholder="E.g. delicate wash, hypoallergenic detergent"></textarea>
      </label>

      <p>Total Cost: <strong>฿{{ totalCost }}</strong></p>

      <button type="submit" class="cta-button">Book Laundry</button>

      <p v-if="error" class="error-msg">{{ error }}</p>
      <p v-if="success" class="success-msg">{{ success }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Laundry',
  data() {
    return {
      form: {
        dogName: '',
        items: [
          { item: '', quantity: 1, cost: 0 },
        ],
        notes: '',
      },
      error: '',
      success: '',
    }
  },
  computed: {
    totalCost() {
      return this.form.items.reduce((sum, i) => sum + i.quantity * i.cost, 0)
    }
  },
  methods: {
    addItem() {
      this.form.items.push({ item: '', quantity: 1, cost: 0 })
    },
    removeItem(index) {
      this.form.items.splice(index, 1)
    },
    async submitLaundry() {
      this.error = ''
      this.success = ''

      try {
        const res = await fetch('http://localhost:5000/api/laundry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...this.form }),
        })

        if (!res.ok) {
          const errData = await res.json()
          this.error = errData.error || 'Failed to book laundry'
          return
        }

        const data = await res.json()
        this.success = `Laundry booked successfully for ${data.dogName}!`
        this.form = {
          dogName: '',
          items: [{ item: '', quantity: 1, cost: 0 }],
          notes: '',
        }
      } catch (err) {
        this.error = 'Error submitting laundry booking.'
        console.error(err)
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
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
}

.page-title {
  text-align: center;
  margin-bottom: 1.5rem;
}

.laundry-form label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
}

.laundry-form input,
.laundry-form select,
.laundry-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.laundry-form textarea {
  resize: vertical;
  min-height: 80px;
}

.item-group {
  background: #f7f7f7;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.remove-button {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  margin-top: 0.5rem;
  cursor: pointer;
}

.cta-button {
  background-color: #4e71ff;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;
  margin-bottom: 1rem;
}

.cta-button:hover {
  background-color: #3a55d9;
}

.error-msg {
  color: #e63946;
  margin-top: 1rem;
  text-align: center;
}

.success-msg {
  color: #2a9d8f;
  margin-top: 1rem;
  text-align: center;
}
</style>
