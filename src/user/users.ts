export interface User {
  readonly id: string
  readonly email: string
  readonly password: string
  readonly firstName: string
  readonly lastName: string
  readonly avatar: string
  readonly role: 'patient' | 'therapist'
}

export interface Patient extends User {
  therapistId: string
  role: 'patient'
}

export interface Therapist extends User {
  role: 'therapist'
}

export const therapist: Therapist = {
  id: 'therapist@mentally.at',
  email: 'therapist@mentally.at',
  password: 'password',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  firstName: 'Sarah',
  lastName: 'Smith',
  role: 'therapist'
}

export const patient: Patient = {
  id: 'patient@mentally.at',
  email: 'patient@mentally.at',
  password: 'password',
  avatar: 'https://cdn.midjourney.com/049cee20-c4f3-44c5-ac61-f5f35671a95f/0_0.png',
  firstName: 'John',
  lastName: 'Doe',
  therapistId: therapist.id,
  role: 'patient'
}

export const users: User[] = [
  patient,
  therapist
]
