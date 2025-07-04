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
        <h2 class="section-heading">🪑 Pet-Friendly Seating</h2>
        <p>
          Indoor and outdoor seating with pet-safe materials, water bowls, and leash hooks.
        </p>
      </div>
  
      <router-link to="/" class="service-link">← Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cafe',
  }
  </script>
  