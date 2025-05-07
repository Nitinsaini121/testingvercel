export type Team = {
  id: number
  status: string
  email: string
  siteList: {
    league: string
    description: string
  }
  createdAt: Date
  updatedAt: Date
}

export type CreateTeamInput = {
  league: string
  team: string
  apiEmail: string
  apiPassword: string
}

export type UpdateTeamPasswordInput = {
  password: string
}
