<template>
  <div class="home-page">
    <AppHeader />
    <HeroSection />
    <ServicesSection />
    <ContactSection />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

onMounted(() => {
  // Set page SEO
  document.title = 'Мемориал - Ритуальные услуги в Шушенском'

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute(
      'content',
      'Полный комплекс ритуальных услуг с заботой и вниманием к каждой семье. Круглосуточная служба, опыт работы более 15 лет.',
    )
  }
})
</script>
