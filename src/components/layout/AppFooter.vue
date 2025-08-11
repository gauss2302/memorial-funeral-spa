<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-brand">
          <div class="brand-logo">
            <img src="/icons/sky.png" alt="Логотип Мемориал" width="32" height="32" />
            <h3>{{ companyInfo.name }} - Ритуальные услуги</h3>
          </div>
          <p class="company-description">
            {{ companyInfo.description }}
          </p>
        </div>

        <!-- Contact Information -->
        <div class="footer-contact">
          <div class="contact-item">
            <span class="contact-icon">📞</span>
            <div class="contact-details">
              <a :href="`tel:${contactInfo.phone}`" class="contact-link primary">
                {{ contactInfo.phone }}
              </a>
              <a :href="`tel:${contactInfo.phoneSecond}`" class="contact-link">
                {{ contactInfo.phoneSecond }}
              </a>
            </div>
          </div>

          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <a :href="`mailto:${contactInfo.email}`" class="contact-link">
              {{ contactInfo.email }}
            </a>
          </div>

          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <address class="address">
              {{ contactInfo.address }}
            </address>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="footer-emergency">
          <div class="emergency-content">
            <h4>Круглосуточная служба</h4>
            <a :href="`tel:${contactInfo.phone}`" class="emergency-button">
              <span class="button-icon">📞</span>
              {{ contactInfo.phone }}
            </a>
            <p class="emergency-note">{{ contactInfo.workingHours.emergency }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>
              &copy; {{ currentYear }} {{ companyInfo.name }} - Ритуальные услуги. Все права
              защищены.
            </p>
          </div>
          <div class="footer-meta">
            <span>{{ companyInfo.license }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useCompanyStore } from '@/stores/company'

const { companyInfo, contactInfo } = useCompanyStore()
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.app-footer {
  background: var(--color-primary);
  color: white;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  gap: 3rem;
  padding: 2.5rem 0 2rem;
  align-items: start;
}

/* Company Info Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.brand-logo img {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
}

.brand-logo h3 {
  font-size: 1.25rem;
  margin: 0;
  color: white;
  font-weight: 600;
}

.company-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Contact Information */
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.contact-icon {
  font-size: 1.1rem;
  width: 20px;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.contact-link.primary {
  font-weight: 700;
  color: var(--color-accent);
}

.contact-link:hover {
  color: white;
}

.address {
  color: rgba(255, 255, 255, 0.8);
  font-style: normal;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

/* Emergency Contact */
.footer-emergency {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.emergency-content h4 {
  font-size: 1rem;
  margin: 0 0 1rem 0;
  color: white;
}

.emergency-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-accent);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
}

.emergency-button:hover {
  background: #7a654a;
  transform: translateY(-1px);
}

.button-icon {
  font-size: 1rem;
}

.emergency-note {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-style: italic;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.25rem 0;
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.copyright p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer-meta {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive Design */
@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-emergency {
    grid-column: 1 / -1;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0 1.5rem;
  }

  .footer-emergency {
    grid-column: auto;
    margin-top: 0;
  }

  .emergency-button {
    width: 100%;
    justify-content: center;
    max-width: 250px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}

@media (max-width: 576px) {
  .brand-logo {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .brand-logo h3 {
    font-size: 1.1rem;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .contact-icon {
    align-self: center;
  }

  .footer-content {
    padding: 1.5rem 0 1rem;
  }
}
</style>
