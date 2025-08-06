import { CharacterData } from '../../types'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

function FaceTab(props: Props) {
  const updateStructure = (index: number, value: number) => {
    const newStructure = [...props.data.structure]
    newStructure[index] = value
    props.updateData({ structure: newStructure })
  }

  const faceFeatures = [
    { index: 0, label: 'Ширина носа' },
    { index: 1, label: 'Высота носа' },
    { index: 2, label: 'Длина носа' },
    { index: 3, label: 'Переносица' },
    { index: 4, label: 'Кончик носа' },
    { index: 5, label: 'Смещение носа' },
    { index: 6, label: 'Высота бровей' },
    { index: 7, label: 'Выступ бровей' },
    { index: 8, label: 'Высота скул' },
    { index: 9, label: 'Ширина скул' },
    { index: 10, label: 'Глубина скул' },
    { index: 11, label: 'Разрез глаз' },
    { index: 12, label: 'Толщина губ' },
    { index: 13, label: 'Ширина челюсти' },
    { index: 14, label: 'Длина челюсти' },
    { index: 15, label: 'Высота подбородка' },
    { index: 16, label: 'Длина подбородка' },
    { index: 17, label: 'Ширина подбородка' },
    { index: 18, label: 'Форма подбородка' },
    { index: 19, label: 'Толщина шеи' },
  ]

  return (
    <div class="section-container">
      <h3 class="section-title">Черты лица</h3>
      <div class="face-features-grid">
        {faceFeatures.map((feature) => (
          <div class="face-feature-control">
            <label class="face-feature-label">
              {feature.label}: {props.data.structure[feature.index].toFixed(1)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={props.data.structure[feature.index]}
              class="character-slider"
              onInput={(e) => updateStructure(feature.index, Math.round(parseFloat(e.currentTarget.value) * 10) / 10)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaceTab