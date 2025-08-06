export interface AuthData {
  login: string
  password: string
  rememberPassword: boolean
}

export interface Character {
  id: number
  name: string
  level: number
  money: number
  lastPlayed: string
  playtime: number
}

export interface RulesSection {
  title: string
  content: string[]
}

export interface CharacterData {
  gender: number
  faceMother: number
  faceFather: number
  skinMother: number
  skinFather: number
  faceMix: number
  skinMix: number
  structure: number[]
  hair: number
  hairColor1: number
  hairColor2: number
  hairOverlay: number
  facialHair: number
  facialHairColor1: number
  facialHairOpacity: number
  eyebrows: number
  eyebrowsColor1: number
  eyes: number
  colorOverlays: ColorOverlay[]
  opacityOverlays: OpacityOverlay[]
  clothing: ClothingData
}

export interface ColorOverlay {
  id: number
  value: number
  color1: number
  color2: number
  opacity: number
}

export interface OpacityOverlay {
  id: number
  value: number
  opacity: number
}

export interface ClothingData {
  top: number
  bottom: number
  shoes: number
  accessories: number
  undershirt: number
  armor: number
  decals: number
  torso: number
  legs: number
  bags: number
  watches: number
}

export type TabType = 'character' | 'face' | 'body' | 'hair' | 'eyebrows' | 'makeup' | 'clothing'

export const defaultCharacterData: CharacterData = {
  gender: 0,
  faceMother: 0,
  faceFather: 0,
  skinMother: 0,
  skinFather: 0,
  faceMix: 0.5,
  skinMix: 0.5,
  structure: new Array(20).fill(0),
  hair: 0,
  hairColor1: 0,
  hairColor2: 0,
  hairOverlay: 0,
  facialHair: 0,
  facialHairColor1: 0,
  facialHairOpacity: 1.0,
  eyebrows: 0,
  eyebrowsColor1: 0,
  eyes: 0,
  colorOverlays: [
    { id: 0, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Пятна
    { id: 1, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Старение
    { id: 2, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Комплекция
    { id: 3, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Загар
    { id: 4, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Помада
    { id: 5, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Румяна
    { id: 8, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Тени для век
    { id: 10, value: 0, color1: 0, color2: 0, opacity: 0.0 }, // Волосы на груди
  ],
  opacityOverlays: [
    { id: 6, value: 0, opacity: 0.0 }, // Морщины
    { id: 7, value: 0, opacity: 0.0 }, // Веснушки
    { id: 9, value: 0, opacity: 0.0 }, // Повреждения кожи
    { id: 11, value: 0, opacity: 0.0 }, // Родинки
  ],
  clothing: {
    top: 0,
    bottom: 0,
    shoes: 0,
    accessories: 0,
    undershirt: 0,
    armor: 0,
    decals: 0,
    torso: 0,
    legs: 0,
    bags: 0,
    watches: 0,
  }
}