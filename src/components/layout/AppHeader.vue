<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo and Company Name -->
        <div class="header-brand">
          <a href="#" class="brand-link" @click.prevent="scrollToTop">
            <div class="logo">
              <img src="/icons/sky.png" alt="Логотип Мемориал" width="40" height="40" />
            </div>
            <div class="brand-text">
              <h1 class="company-name">{{ companyInfo.name }}</h1>
              <p class="company-tagline">Ритуальные услуги</p>
            </div>
          </a>
        </div>

        <!-- Navigation -->
        <nav class="main-navigation" :class="{ 'nav-open': isMenuOpen }">
          <ul class="nav-list">
            <li class="nav-item">
              <a
                href="#"
                class="nav-link"
                :class="{ active: activeSection === 'home' }"
                @click.prevent="(scrollToTop(), closeMenu())"
              >
                Главная
              </a>
            </li>

            <li class="nav-item">
              <a
                href="#services"
                class="nav-link"
                :class="{ active: activeSection === 'services' }"
                @click.prevent="(scrollToServices(), closeMenu())"
              >
                Услуги
              </a>
            </li>

<!--            <li class="nav-item">-->
<!--              <a-->
<!--                href="#about"-->
<!--                class="nav-link"-->
<!--                :class="{ active: activeSection === 'about' }"-->
<!--                @click.prevent="(scrollToAbout(), closeMenu())"-->
<!--              >-->
<!--                О нас-->
<!--              </a>-->
<!--            </li>-->

            <li class="nav-item">
              <a
                href="#contact"
                class="nav-link"
                :class="{ active: activeSection === 'contact' }"
                @click.prevent="(scrollToContacts(), closeMenu())"
              >
                Контакты
              </a>
            </li>
          </ul>
        </nav>

        <!-- Contact Info -->
        <div class="header-contact">
          <div class="contact-phones">
            <a :href="`tel:${contactInfo.phone}`" class="phone-primary">
              {{ contactInfo.phone }}
            </a>
            <span class="availability">Круглосуточно</span>
          </div>
          <a :href="`tel:${contactInfo.phone}`" class="call-button" @click="closeMenu">
            Позвонить
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-menu-toggle"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Открыть меню"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useCompanyStore } from '../../stores/company'
import { onUpdated } from '@vue/runtime-core'

const { companyInfo, contactInfo } = useCompanyStore()

// Mobile menu state
const isMenuOpen = ref(false)
const activeSection = ref('home')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Scroll functions
const scrollToElement = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  activeSection.value = 'home'
}

const scrollToServices = () => {
  scrollToElement('services')
}

const scrollToAbout = () => {
  scrollToElement('services')
}

const scrollToContacts = () => {
  scrollToElement('contact')
}

const updateActiveSection = () => {
  const sections = [
    { id: 'services', name: 'services' },
    { id: 'contact', name: 'contact' },
  ]

  const scrollPosition = window.scrollY + 100

  if (scrollPosition < 200) {
    activeSection.value = 'home'
    return
  }

  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.name
        return
      }
    }
  }
}

onKeyStroke('Escape', () => {
  closeMenu()
})

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
.app-header {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  min-height: 80px;
}

/* Brand Section */
.header-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.logo img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
  line-height: 1.2;
}

.company-tagline {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1;
}

/* Navigation */
.main-navigation {
  display: flex;
  flex: 1;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.nav-link:hover {
  color: var(--color-accent);
  background-color: var(--color-background-alt);
}

/* Active state for navigation */
.nav-link.active {
  color: var(--color-accent);
  background-color: var(--color-background-alt);
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: var(--color-accent);
  border-radius: 1px;
}

/* Contact Section */
.header-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.contact-phones {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.phone-primary {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.phone-primary:hover {
  color: var(--color-accent);
}

.availability {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.call-button {
  background: var(--color-accent);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.call-button:hover {
  background: #7a654a;
  transform: translateY(-1px);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
  margin: 2px 0;
}

.mobile-overlay {
  display: none;
}

/* Mobile Styles */
@media (max-width: 968px) {
  .header-contact {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .main-navigation {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: var(--color-background);
    border-left: 1px solid var(--color-border);
    transition: right 0.3s ease;
    z-index: 1000;
    padding: 6rem 2rem 2rem;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .nav-open {
    right: 0;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    align-items: stretch;
  }

  .nav-link {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
  }

  .nav-link.active::after {
    display: none;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  /* Hamburger Animation */
  .nav-open ~ .mobile-menu-toggle .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-open ~ .mobile-menu-toggle .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .nav-open ~ .mobile-menu-toggle .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 0;
    min-height: 70px;
  }

  .company-name {
    font-size: 1.25rem;
  }

  .company-tagline {
    font-size: 0.8rem;
  }

  .logo img {
    width: 35px;
    height: 35px;
  }

  .main-navigation {
    width: 280px;
  }
}
</style>
<style lang="scss" scoped>
.app-header {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  min-height: 80px;
}

/* Brand Section */
.header-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.logo img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
  line-height: 1.2;
}

.company-tagline {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1;
}

/* Navigation */
.main-navigation {
  display: flex;
  flex: 1;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-accent);
  background-color: var(--color-background-alt);
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: block;
  padding: 0.75rem 1.25rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border-radius: 0;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}

.dropdown-link:hover {
  background-color: var(--color-background-alt);
  color: var(--color-accent);
}

/* Contact Section */
.header-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.contact-phones {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.phone-primary {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.phone-primary:hover {
  color: var(--color-accent);
}

.availability {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

.call-button {
  background: var(--color-accent);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.call-button:hover {
  background: #7a654a;
  transform: translateY(-1px);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
  margin: 2px 0;
}

.mobile-overlay {
  display: none;
}

/* Mobile Styles */
@media (max-width: 968px) {
  .header-contact {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .main-navigation {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: var(--color-background);
    border-left: 1px solid var(--color-border);
    transition: right 0.3s ease;
    z-index: 1000;
    padding: 6rem 2rem 2rem;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .nav-open {
    right: 0;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    align-items: stretch;
  }

  .nav-link {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
    justify-content: space-between;
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border: none;
    background: var(--color-background-alt);
    margin-left: 1rem;
    margin-top: 0.5rem;
  }

  .dropdown-menu:not(.show) {
    display: none;
  }

  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  /* Hamburger Animation */
  .nav-open ~ .mobile-menu-toggle .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-open ~ .mobile-menu-toggle .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .nav-open ~ .mobile-menu-toggle .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 0;
    min-height: 70px;
  }

  .company-name {
    font-size: 1.25rem;
  }

  .company-tagline {
    font-size: 0.8rem;
  }

  .logo img {
    width: 35px;
    height: 35px;
  }

  .main-navigation {
    width: 280px;
  }
}
</style>
