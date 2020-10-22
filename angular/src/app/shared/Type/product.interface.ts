export interface ProductInterface {
  type: string
  id: number
  isFavorite?: boolean
  attributes: {
    rooms: string
    address: {
      city: string
      street: string
      house: string
      room: string
    },
    area: number,
    unit: string
  },
  relationships: {
    type: string
    id: number
    attributes: {
      first_name: string
      last_name: string
      middle_name: string
    }
  }
}
