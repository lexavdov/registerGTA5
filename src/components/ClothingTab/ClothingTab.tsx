import { CharacterData } from '../../types'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

function ClothingTab(props: Props) {
  const updateClothing = (field: string, value: number, min: number, max: number) => {
    const clampedValue = Math.max(min, Math.min(max, value))
    props.updateData({
      clothing: {
        ...props.data.clothing,
        [field]: clampedValue
      }
    })
  }

  const clothingItems = [
    { key: 'top', label: 'Верхняя одежда', max: 100, description: 'Рубашки, куртки, топы' },
    { key: 'bottom', label: 'Нижняя одежда', max: 100, description: 'Брюки, юбки, шорты' },
    { key: 'shoes', label: 'Обувь', max: 100, description: 'Ботинки, кроссовки, туфли' },
    { key: 'accessories', label: 'Аксессуары', max: 50, description: 'Цепочки, украшения' },
    { key: 'undershirt', label: 'Нижняя рубашка', max: 50, description: 'Майки, футболки под одежду' },
    { key: 'armor', label: 'Броня/Жилет', max: 20, description: 'Бронежилеты, защита' },
    { key: 'decals', label: 'Наклейки/Патчи', max: 30, description: 'Эмблемы, значки на одежде' },
    { key: 'torso', label: 'Торс', max: 100, description: 'Основа торса персонажа' },
    { key: 'legs', label: 'Ноги', max: 100, description: 'Основа ног персонажа' },
    { key: 'bags', label: 'Сумки/Рюкзаки', max: 50, description: 'Рюкзаки, сумки через плечо' },
    { key: 'watches', label: 'Часы', max: 30, description: 'Наручные часы, браслеты' },
  ]

  return (
    <div class="clothing-controls">
      {clothingItems.map((item) => (
        <div class="section-container">
          <h3 class="section-title">{item.label}</h3>
          <div class="arrow-control">
            <div class="arrow-control-label">
              Вариант:
              <div class="slider-control-description">{item.description}</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateClothing(item.key, props.data.clothing[item.key as keyof typeof props.data.clothing] - 1, 0, item.max)}
                disabled={props.data.clothing[item.key as keyof typeof props.data.clothing] <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                Вариант #{props.data.clothing[item.key as keyof typeof props.data.clothing]}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateClothing(item.key, props.data.clothing[item.key as keyof typeof props.data.clothing] + 1, 0, item.max)}
                disabled={props.data.clothing[item.key as keyof typeof props.data.clothing] >= item.max}
              >
                →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClothingTab