import { Profile } from "./Profile"

export interface Activity {
  id: string
  title: string
  date: Date | null
  description: string
  category: string
  city: string
  venue: string

  hostUserName?: string
  isCanceled?: boolean
  attendees?: Profile[]
}
