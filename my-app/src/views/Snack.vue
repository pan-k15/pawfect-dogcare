<template>
  <div class="page-container">
    <h1 class="page-title">🍖 Dog Snacks</h1>
    <p class="page-description">
      Treat your furry friend to our selection of healthy, tasty snacks made with love.
    </p>

    <div class="info-section">
      <h2 class="section-heading">🐕 Popular Snacks</h2>
      <ul class="menu-list">
        <li>Dried Beef Strips</li>
        <li>Peanut Butter Biscuits</li>
        <li>Chicken Jerky</li>
        <li>Carrot & Pumpkin Treats</li>
      </ul>
    </div>

    <div class="info-section">
      <h2 class="section-heading">🛒 Ordering</h2>
      <p>
        Snacks are available for purchase onsite at our shop or via phone orders.
        We offer special packages for regular customers.
      </p>
    </div>

    <router-link to="/" class="service-link">← Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Snack',
}
</script>
