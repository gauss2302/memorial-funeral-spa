import {defineStore} from 'pinia'
import type {RitualService, ServicePackage} from "~/types";

export const useServiceStore = defineStore('services', () => {
	const services = ref<RitualService[]>([
		{
			id: 'full-burial',
			title: 'Полный комплекс услуг по захоронению',
			description: 'Организация полного цикла захоронения с учетом всех традиций и пожеланий семьи',
			price: 'от 45 000 ₽',
			category: 'burial',
			isPopular: true,
			features: [
				'Оформление всех документов',
				'Подготовка усопшего',
				'Предоставление гроба',
				'Организация отпевания',
				'Транспортные услуги',
				'Место на кладбище',
				'Проведение церемонии',
				'Поминальный обед'
			]
		},
		{
			id: 'cremation-service',
			title: 'Кремационные услуги',
			description: 'Кремация с соблюдением всех требований и предоставлением урны',
			price: 'от 25 000 ₽',
			category: 'cremation',
			features: [
				'Оформление документов для кремации',
				'Подготовка к кремации',
				'Процедура кремации',
				'Урна для праха',
				'Свидетельство о кремации',
				'Транспортировка праха'
			]
		},
		{
			id: 'memorial-service',
			title: 'Мемориальные услуги',
			description: 'Изготовление и установка памятников, оформление мест захоронения',
			price: 'от 15 000 ₽',
			category: 'memorial',
			features: [
				'Изготовление памятника',
				'Гравировка портрета и текста',
				'Установка памятника',
				'Благоустройство места',
				'Уход за местом захоронения',
				'Цветочные композиции'
			]
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
				'Сопровождение процессии'
			]
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
				'Другие необходимые документы'
			]
		}
	])

	const packages = ref<ServicePackage[]>([
		{
			id: 'economy',
			name: 'Эконом',
			description: 'Базовый комплект услуг для достойного прощания',
			price: '35 000 ₽',
			services: [
				'Оформление документов',
				'Подготовка усопшего',
				'Простой гроб',
				'Транспортировка',
				'Место на кладбище'
			]
		},
		{
			id: 'standard',
			name: 'Стандарт',
			description: 'Полный комплект услуг с дополнительными опциями',
			price: '55 000 ₽',
			savings: 'Экономия 10 000 ₽',
			services: [
				'Все услуги пакета "Эконом"',
				'Качественный гроб',
				'Отпевание в храме',
				'Поминальный обед',
				'Венки и цветы'
			]
		},
		{
			id: 'premium',
			name: 'Премиум',
			description: 'VIP обслуживание с персональным сопровождением',
			price: '85 000 ₽',
			savings: 'Экономия 15 000 ₽',
			services: [
				'Все услуги пакета "Стандарт"',
				'Элитный гроб',
				'Персональный координатор',
				'Профессиональная фотосъемка',
				'Памятник (базовый)',
				'Годовой уход за могилой'
			]
		}
	])

	const getServiceById = (id: string) => {
		return services.value.find(service => service.id === id)
	}

	const getServicesByCategory = (category: string) => {
		return services.value.filter(service => service.category === category)
	}

	const getPackageById = (id: string) => {
		return packages.value.find(pkg => pkg.id === id)
	}
	return {
		services: readonly(services),
		packages: readonly(packages),
		getPackageById,
		getServiceById,
		getServicesByCategory,
	}

})
