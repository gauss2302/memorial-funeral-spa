import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import type { CompanyInfo, ContactInfo } from '@/types'

export const useCompanyStore = defineStore('company', () => {
  const companyInfo = ref<CompanyInfo>({
    name: 'Мемориал',
    description: 'Ритуальное агентство полного цикла с опытом работы более 15 лет',
    experience: '15 лет',
    license: 'Лицензия № РО-77-01-002345',
    advantages: [
      'Работаем круглосуточно без выходных',
      'Опыт работы более 15 лет',
      'Собственный автопарк',
      'Фиксированные цены без доплат',
      'Гарантия качества услуг',
      'Персональный менеджер',
      'Рассрочка платежа',
      'Выезд агента в течение часа',
    ],
  })

  const contactInfo = ref<ContactInfo>({
    phone: import.meta.env.VITE_COMPANY_PHONE || '+7 (913) 182-26-28',
    phoneSecond: import.meta.env.VITE_COMPANY_PHONE_SECOND || '+7 (916) 987-65-43',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'info@ritual-memory.ru',
    address: import.meta.env.VITE_COMPANY_ADDRESS || 'Шушенское, Первомайская ул., 46',
    workingHours: {
      description: 'Круглосуточно, без выходных',
      emergency: 'Экстренный выезд в течение часа',
    },
  })

  return {
    companyInfo: readonly(companyInfo),
    contactInfo: readonly(contactInfo),
  }
})
