import { heroes } from "../data/heroe"

export const findHeroById = (id: number) => {
  return heroes.find(hero => hero.id === id)
}