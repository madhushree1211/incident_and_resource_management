export interface Resource {
  id: number
  name: string
  type: string
  capacity: number
  location: string
  amenities: string[]
  available: boolean
}

export interface BookingEntry {
  id: number
  resourceId: number
  resourceName: string
  date: string
  startTime: string
  endTime: string
  duration: number
  eventName: string
  purpose: string
  attendees: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export const resources: Resource[] = [
  {
    id: 1,
    name: "Conference Room A",
    type: "seminar",
    capacity: 20,
    location: "Building A, Floor 2",
    amenities: ["projector", "whiteboard", "video-conf", "wifi"],
    available: true,
  },
  {
    id: 2,
    name: "Auditorium Hall",
    type: "seminar",
    capacity: 200,
    location: "Main Building, Ground Floor",
    amenities: ["projector", "sound-system", "stage", "wifi"],
    available: true,
  },
  {
    id: 3,
    name: "Computer Lab 1",
    type: "lab",
    capacity: 40,
    location: "IT Building, Floor 1",
    amenities: ["computers", "projector", "wifi", "printer"],
    available: false,
  },
  {
    id: 4,
    name: "Seminar Room B",
    type: "seminar",
    capacity: 50,
    location: "Building B, Floor 3",
    amenities: ["projector", "whiteboard", "wifi", "refreshments"],
    available: true,
  },
  {
    id: 5,
    name: "Classroom 101",
    type: "classroom",
    capacity: 60,
    location: "Academic Block, Floor 1",
    amenities: ["projector", "whiteboard", "wifi"],
    available: true,
  },
  {
    id: 6,
    name: "Classroom 102",
    type: "classroom",
    capacity: 45,
    location: "Academic Block, Floor 1",
    amenities: ["projector", "whiteboard", "wifi"],
    available: true,
  },
  {
    id: 7,
    name: "Computer Lab 2",
    type: "lab",
    capacity: 35,
    location: "IT Building, Floor 2",
    amenities: ["computers", "projector", "wifi"],
    available: true,
  },
  {
    id: 8,
    name: "Portable Projector Set",
    type: "equipment",
    capacity: 1,
    location: "Equipment Room",
    amenities: ["projector", "screen"],
    available: true,
  },
  {
    id: 9,
    name: "Wireless Microphone Kit",
    type: "equipment",
    capacity: 1,
    location: "Equipment Room",
    amenities: ["microphone", "receiver"],
    available: true,
  },
]

export const bookings: BookingEntry[] = []
