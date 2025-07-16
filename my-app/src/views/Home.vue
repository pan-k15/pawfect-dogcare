<template>
  <div class="home-container">
    <section class="hero">
      <h1 class="hero-title">🐾 Welcome to DogCare Center</h1>
      <p class="hero-subtitle">
        We’re your dog’s favorite place! Book services like Dog Run, Grooming, Bathing, and enjoy a coffee while your pup plays.
      </p>

      <!-- ✅ Member Info -->
      <div v-if="member" class="member-info">
        <p><strong>Name:</strong> {{ member.fname }} {{ member.lname }}</p>
        <p><strong>Gender:</strong> {{ member.gender }}</p>
        <p><strong>Membership:</strong> {{ member.membershipLevel }}</p>
      </div>
    </section>

    <!-- ✅ Add Dog Button -->
    <div class="dog-action">
      <router-link to="/add-dog">
        <button class="cta-button">➕ Add Dog</button>
      </router-link>
    </div>

    <!-- Dogs Section -->
    <section class="grid-section">
      <h2>🐕 Your Dogs</h2>
      <div v-if="dogsLoading">Loading your dogs...</div>
      <div v-else-if="dogs.length === 0">You haven’t added any dogs yet.</div>
      <div v-else class="card-grid">
        <div v-for="dog in dogs" :key="dog._id" class="service-card">
          <h2 class="service-title">🐾 {{ dog.name }}</h2>
          <p class="service-desc">Breed: {{ dog.breed }}</p>
          <p class="service-desc">Age: {{ dog.age }} years</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'Home',
  data() {
    return {
      member: null,
      dogs: [],
      dogsLoading: true,
    }
  },
  methods: {
    async fetchMemberInfo() {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found')

        const decoded = jwtDecode(token)
        const userId = decoded.id

        const res = await fetch(`http://localhost:5000/api/members/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to fetch member info')

        const data = await res.json()
        this.member = data

        // ✅ Use member._id to fetch dogs
        await this.fetchDogs(data._id)
      } catch (err) {
        console.error('Error fetching member info:', err)
      }
    },

    async fetchDogs(memberId) {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:5000/api/dogs/member/${memberId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch dogs')
        const data = await res.json()
        this.dogs = data
      } catch (err) {
        console.error('Error fetching dogs:', err)
      } finally {
        this.dogsLoading = false
      }
    },
  },
  mounted() {
    this.fetchMemberInfo()
  },
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
}

.hero {
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-top: 0.5rem;
}

.member-info {
  margin-top: 1rem;
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 10px;
}

.dog-action {
  margin: 2rem 0;
}

.grid-section {
  margin-top: 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: #fefefe;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.service-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.service-desc {
  font-size: 0.95rem;
  color: #444;
}
</style>

