<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <ContactSection />
  </div>
</template>


<script>
import {defineComponent} from "vue";
import HeroSection from "~/components/HeroSection.vue";
import ContactSection from "~/components/ContactSection.vue";
import ServicesSection from "~/components/ServicesSection.vue";

export default defineComponent({
  components: {ServicesSection, HeroSection, ContactSection}
})
</script>


