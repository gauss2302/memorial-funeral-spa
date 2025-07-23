export interface RitualService {
  id: string
  title: string
  description: string
  price: string
  features: string[]
  category: 'burial' | 'cremation' | 'memorial' | 'transport' | 'documents'
  isPopular?: boolean
}

export interface ServicePackage {
  id: string
  name: string
  description: string
  services: string[]
  price: string
  savings?: string
}

export interface ContactInfo {
  phone: string
  phoneSecond: string
  email: string
  address: string
  workingHours: {
    description: string
    emergency: string
  }
}

export interface CompanyInfo {
  name: string
  description: string
  experience: string
  license: string
  advantages: string[]
}

export interface CarouselImage {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: {
    title: string
    description: string
  }
}
