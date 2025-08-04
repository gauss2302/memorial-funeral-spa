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
        'Гроб 7000₽',
        'Крест деревянный 2000₽',
        'Табличка на крест 500₽',
        'Подушка, покрывало 700₽',
        'Молитва, крестик, платочек в руку 300₽',
        'Копка могилы 12000₽',
        'Транспортные услуги 2500₽',
        'Услуги зала прощания 2500₽',
      ],
    },
    {
      id: 'cremation-service',
      title: 'Кремационные услуги',
      description: 'Кремация с соблюдением всех требований и предоставлением урны',
      price: 'от 67 500 ₽',
      category: 'cremation',
      features: [
        'Кремация 12000₽',
        'Урна под прах 2500₽',
        'Гроб 7000₽',
        'Подушка, покрывало 700₽',
        'Молитва, крестик, платочек в руку 300₽',
        'Транспортные услуги(г.Новокузнецк, г.Новосибирск) 45000₽',
      ],
    },
    {
      id: 'transport-service',
      title: 'Транспортные услуги',
      description: 'Катафалк и транспорт для родственников',
      price: 'от 8 000 ₽',
      category: 'transport',
      features: [
        'Катафалк для перевозки',
        'Автобус для родственников',
        'Опытные водители',
        'Украшение транспорта',
        'Сопровождение процессии',
      ],
    },
    {
      id: 'documents-service',
      title: 'Документальное сопровождение',
      description: 'Оформление всех необходимых документов',
      price: 'от 5 000 ₽',
      category: 'documents',
      features: [
        'Свидетельство о смерти',
        'Справка о смерти',
        'Разрешение на захоронение',
        'Медицинские справки',
        'Справки для пенсионного фонда',
        'Другие необходимые документы',
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
