import { defineStore } from 'pinia'
import { ref, readonly, computed } from 'vue'
import type { RitualService, ServicePackage } from '@/types'

export const useServiceStore = defineStore('services', () => {
  const services = ref<RitualService[]>([
    {
      id: 'full-burial',
      title: 'Полный комплекс услуг по захоронению',
      description: 'Организация полного цикла захоронения с учетом всех традиций и пожеланий семьи',
      price: 'от 25 000 ₽',
      category: 'burial',
      isPopular: true,
      features: [
        'Гроб от 7000₽',
        'Крест деревянный от 2000₽',
        'Табличка на крест от 500₽',
        'Подушка, покрывало от 700₽',
        'Молитва, крестик, платочек в руку от 300₽',
        'Копка могилы от 12000₽',
        'Транспортные услуги от 2500₽',
        'Услуги зала прощания от 2500₽',
      ],
    },
    {
      id: 'cremation-service',
      title: 'Кремационные услуги',
      description: 'Кремация с соблюдением всех требований и предоставлением урны',
      price: 'от 67 500 ₽',
      category: 'cremation',
      features: [
        'Кремация от 12000₽',
        'Урна под прах от 2500₽',
        'Гроб от 7000₽',
        'Подушка, покрывало от 700₽',
        'Молитва, крестик, платочек в руку от 300₽',
        'Транспортные услуги(г.Новокузнецк, г.Новосибирск) от 45000₽',
      ],
    },
    {
      id: 'transport-service',
      title: 'Транспортные услуги',
      description: 'Услуги катафалка по регионам',
      price: 'Цена Договорная',
      category: 'transport',
      features: [
        'Катафалк для перевозки',
        'Полное сопровождение',
        'Опытные водители',
      ],
    },
  ])

  // Computed getters
  const mainServices = computed(() =>
    services.value.filter((service) =>
      ['burial', 'cremation', 'memorial'].includes(service.category),
    ),
  )

  const additionalServices = computed(() =>
    services.value.filter((service) => ['transport', 'documents'].includes(service.category)),
  )

  // Methods
  const getServiceById = (id: string) => {
    return services.value.find((service) => service.id === id)
  }

  const getServicesByCategory = (category: string) => {
    return services.value.filter((service) => service.category === category)
  }

  return {
    services: readonly(services),
    mainServices,
    additionalServices,
    getServiceById,
    getServicesByCategory,
  }
})
