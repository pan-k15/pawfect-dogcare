<template>
  <div class="home-container">
    <section class="hero">
      <h1 class="hero-title">🐾 Welcome to DogCare Center</h1>
      <p class="hero-subtitle">
        We’re your dog’s favorite place! Book services like Dog Run, Grooming, Bathing, and enjoy a coffee while your pup plays.
      </p>
      <router-link to="/dog-run">
        <button class="cta-button">Book Now</button>
      </router-link>
    </section>

    <section class="grid-section">
      <div v-for="service in services" :key="service.name" class="service-card">
        <h2 class="service-title">{{ service.icon }} {{ service.name }}</h2>
        <p class="service-desc">{{ service.description }}</p>
        <router-link :to="service.link" class="service-link">Learn more →</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      services: [
        {
          name: 'Dog Run',
          icon: '🏃‍♂️',
          description: 'Spacious and safe area for dogs to run and play freely.',
          link: '/dog-run',
        },
        {
          name: 'Cafe',
          icon: '☕',
          description: 'Enjoy coffee and snacks while your dog plays.',
          link: '/cafe',
        },
        {
          name: 'Wash & Dry',
          icon: '🧼',
          description: 'Self-service or assisted washing and drying stations.',
          link: '/wash-dry',
        },
        {
          name: 'Grooming & Bath',
          icon: '✂️',
          description: 'Professional grooming and bathing for all dog breeds.',
          link: '/grooming-bath',
        },
        {
          name: 'Snack',
          icon: '🍖',
          description: 'Healthy and tasty treats your dog will love!',
          link: '/snack',
        },
      ],
    }
  },
}
</script>
