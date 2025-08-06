import { CharacterData, defaultCharacterData } from '../types'

// Утилита для генерации случайного числа в диапазоне с точностью до 0.1
const randomBetween = (min: number, max: number): number => {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

// Утилита для генерации случайного целого числа
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Улучшенные предустановки для красивых персонажей
const beautifulPresets = {
  structure: [
    // Женственные черты (более мягкие и привлекательные)
    [
      randomBetween(-0.20, 0.10), // 0 - Nose Width (узкий нос)
      randomBetween(-0.10, 0.20), // 1 - Nose Peak Height (средняя высота)
      randomBetween(-0.05, 0.25), // 2 - Nose Peak Length (изящный)
      randomBetween(-0.15, 0.20), // 3 - Nose Bone Height (гармоничный)
      randomBetween(-0.05, 0.15), // 4 - Nose Peak Lowering (слегка приподнятый)
      randomBetween(-0.05, 0.05), // 5 - Nose Bone Twist (прямой)
      randomBetween(-0.10, 0.20), // 6 - Eyebrows Height (выразительные)
      randomBetween(-0.15, 0.20), // 7 - Eyebrows Forward (не слишком выступающие)
      randomBetween(0.15, 0.45),  // 8 - Cheeks Height (высокие скулы)
      randomBetween(-0.15, 0.20), // 9 - Cheeks Width (умеренная ширина)
      randomBetween(0.05, 0.30),  // 10 - Cheeks Depth (выразительные)
      randomBetween(0.05, 0.35),  // 11 - Eyes Opening (открытые глаза)
      randomBetween(0.15, 0.45),  // 12 - Lips Thickness (полные губы)
      randomBetween(-0.25, 0.05), // 13 - Jaw Bone Width (изящная челюсть)
      randomBetween(-0.15, 0.15), // 14 - Jaw Bone Back Length (гармоничная)
      randomBetween(-0.05, 0.20), // 15 - Chin Bone Lowering (изящный подбородок)
      randomBetween(-0.05, 0.15), // 16 - Chin Bone Length (средний)
      randomBetween(-0.15, 0.15), // 17 - Chin Bone Width (не широкий)
      randomBetween(-0.05, 0.20), // 18 - Chin Hole (легкая ямочка)
      randomBetween(-0.15, 0.15), // 19 - Neck Thickness (изящная шея)
    ],
    // Мужественные черты (более выразительные, но привлекательные)
    [
      randomBetween(-0.05, 0.25), // 0 - Nose Width (средний нос)
      randomBetween(0.05, 0.35),  // 1 - Nose Peak Height (выразительный)
      randomBetween(0.05, 0.35),  // 2 - Nose Peak Length (мужественный)
      randomBetween(0.05, 0.30),  // 3 - Nose Bone Height (сильный)
      randomBetween(-0.05, 0.20), // 4 - Nose Peak Lowering (прямой)
      randomBetween(-0.05, 0.05), // 5 - Nose Bone Twist (симметричный)
      randomBetween(-0.15, 0.20), // 6 - Eyebrows Height (выразительные)
      randomBetween(-0.10, 0.25), // 7 - Eyebrows Forward (мужественные)
      randomBetween(0.05, 0.30),  // 8 - Cheeks Height (высокие скулы)
      randomBetween(0.05, 0.35),  // 9 - Cheeks Width (широкие скулы)
      randomBetween(0.15, 0.40),  // 10 - Cheeks Depth (выразительные)
      randomBetween(-0.05, 0.20), // 11 - Eyes Opening (мужественные глаза)
      randomBetween(-0.15, 0.10), // 12 - Lips Thickness (средние губы)
      randomBetween(0.15, 0.45),  // 13 - Jaw Bone Width (сильная челюсть)
      randomBetween(0.05, 0.30),  // 14 - Jaw Bone Back Length (выразительная)
      randomBetween(0.05, 0.30),  // 15 - Chin Bone Lowering (сильный подбородок)
      randomBetween(0.05, 0.25),  // 16 - Chin Bone Length (выступающий)
      randomBetween(0.05, 0.30),  // 17 - Chin Bone Width (широкий)
      randomBetween(0.05, 0.30),  // 18 - Chin Hole (выразительный)
      randomBetween(-0.15, 0.15), // 19 - Neck Thickness (пропорциональная шея)
    ]
  ]
}

// Привлекательные комбинации цветов волос
const attractiveHairColors = [
  1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, // Натуральные оттенки
  16, 17, 18, 19, 20, // Рыжие оттенки
  46, 47, 48 // Блонд оттенки
]

// Популярные прически для женщин
const popularFemaleHairs = [1, 2, 4, 5, 7, 10, 11, 12, 15, 16, 18, 20, 22, 25, 26, 27]

// Популярные прически для мужчин  
const popularMaleHairs = [1, 2, 3, 4, 7, 10, 11, 12, 18, 19, 20, 21, 31, 32, 33]

// Стильные варианты бороды
const stylishFacialHair = [0, 1, 2, 3, 10, 11, 12, 15, 16, 19, 20]

export const generateRandomCharacter = (currentGender: number): CharacterData => {
  const selectedGender = currentGender
  const structurePreset = beautifulPresets.structure[selectedGender]
  
  // Генерируем привлекательную прическу
  const popularHairs = selectedGender === 0 ? popularFemaleHairs : popularMaleHairs
  const randomHair = popularHairs[randomInt(0, popularHairs.length - 1)]
  
  // Привлекательные цвета волос
  const hairColor1 = attractiveHairColors[randomInt(0, attractiveHairColors.length - 1)]
  const hairColor2 = attractiveHairColors[randomInt(0, attractiveHairColors.length - 1)]
  
  // Стильная борода для мужчин
  const facialHairStyle = selectedGender === 1 ? 
    (Math.random() > 0.3 ? stylishFacialHair[randomInt(0, stylishFacialHair.length - 1)] : 0) : 0
  
  return {
    ...defaultCharacterData,
    gender: selectedGender,
    
    // Привлекательная генетика
    faceFather: randomInt(5, 40), // Избегаем крайних значений
    faceMother: randomInt(5, 40),
    skinFather: randomInt(5, 40),
    skinMother: randomInt(5, 40),
    faceMix: randomBetween(0.35, 0.65), // Сбалансированное смешение
    skinMix: randomBetween(0.35, 0.65),
    
    // Красивая структура лица
    structure: structurePreset,
    
    // Стильные волосы
    hair: randomHair,
    hairColor1: hairColor1,
    hairColor2: hairColor2,
    hairOverlay: randomInt(0, 10), // Простое число вместо объекта

    // Стильная борода
    facialHair: facialHairStyle,
    facialHairOpacity: selectedGender === 1 && facialHairStyle > 0 ? randomBetween(0.60, 0.90) : 0,
    facialHairColor1: hairColor1, // Совпадает с цветом волос
    
    // Красивые брови
    eyebrows: randomInt(0, 20), // Избегаем экстремальных форм
    eyebrowsColor1: hairColor1, // Совпадает с волосами
    
    // Привлекательные глаза
    eyes: randomInt(0, 31),
    
    // Стильная одежда
    clothing: {
      top: randomInt(0, 50),
      bottom: randomInt(0, 50),
      shoes: randomInt(0, 50),
      accessories: randomInt(0, 15),
      undershirt: randomInt(0, 25),
      armor: 0, // Без брони для повседневного вида
      decals: randomInt(0, 10),
      torso: randomInt(0, 50),
      legs: randomInt(0, 50),
      bags: randomInt(0, 20),
      watches: randomInt(0, 15),
    },
    
    // Умеренные дефекты кожи
    opacityOverlays: [
      { id: 6, value: randomInt(0, 10), opacity: randomBetween(0, 0.15) }, // Легкие дефекты
      { id: 7, value: randomInt(0, 5), opacity: randomBetween(0, 0.10) }, // Минимальные признаки возраста
      { id: 9, value: randomInt(0, 8), opacity: randomBetween(0, 0.25) }, // Легкий тон кожи
      { id: 11, value: randomInt(0, 3), opacity: randomBetween(0, 0.10) }, // Минимальные повреждения
    ],
    
    // Стильный макияж
    colorOverlays: [
      { 
        id: 0, 
        value: randomInt(0, 10), 
        opacity: randomBetween(0, 0.15), 
        color1: randomInt(0, 30), 
        color2: randomInt(0, 30)
      },
      { 
        id: 1, 
        value: randomInt(0, 5), 
        opacity: randomBetween(0, 0.10), 
        color1: randomInt(0, 20), 
        color2: randomInt(0, 20)
      },
      { 
        id: 2, 
        value: randomInt(0, 8), 
        opacity: randomBetween(0, 0.25), 
        color1: randomInt(0, 25), 
        color2: randomInt(0, 25)
      },
      { 
        id: 3, 
        value: randomInt(0, 3), 
        opacity: randomBetween(0, 0.10), 
        color1: randomInt(0, 20), 
        color2: randomInt(0, 20)
      },
      { 
        id: 4, 
        value: selectedGender === 0 ? randomInt(0, 30) : 0, 
        opacity: selectedGender === 0 ? randomBetween(0.20, 0.50) : 0, 
        color1: randomInt(0, 30), 
        color2: randomInt(0, 30)
      },
      { 
        id: 5, 
        value: selectedGender === 0 ? randomInt(0, 4) : 0, 
        opacity: selectedGender === 0 ? randomBetween(0.15, 0.35) : 0, 
        color1: randomInt(0, 20), 
        color2: randomInt(0, 20)
      },
      { 
        id: 8, 
        value: selectedGender === 0 ? randomInt(0, 6) : 0, 
        opacity: selectedGender === 0 ? randomBetween(0.30, 0.60) : 0, 
        color1: randomInt(0, 25), 
        color2: randomInt(0, 25)
      },
      { 
        id: 10, 
        value: selectedGender === 1 && facialHairStyle > 0 ? randomInt(0, 8) : 0, 
        opacity: selectedGender === 1 && facialHairStyle > 0 ? randomBetween(0.30, 0.60) : 0, 
        color1: hairColor1, 
        color2: hairColor1
      },
    ],
  }
}