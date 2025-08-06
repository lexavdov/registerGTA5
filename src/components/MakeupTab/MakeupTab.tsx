import { CharacterData } from '../../types'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

const hairColors = [
  'Чёрный', 'Тёмно-серый', 'Серый', 'Самый тёмный коричневый', 'Тёмно-коричневый',
  'Коричневый', 'Светло-коричневый', 'Светлее коричневый', 'Самый светлый коричневый',
  'Выцветший коричневый', 'Выцветший блонд', 'Самый светлый блонд', 'Светлее блонд',
  'Светлый блонд', 'Белый блонд', 'Сероватый коричневый', 'Красноватый коричневый',
  'Красно-коричневый', 'Тёмно-красный', 'Красный', 'Очень красный', 'Яркий красный',
  'Оранжево-красный', 'Выцветший красный', 'Выцветший оранжевый', 'Серый',
  'Светло-серый', 'Светлее серый', 'Самый светлый серый', 'Тёмно-фиолетовый',
  'Фиолетовый', 'Светло-фиолетовый', 'Фиалковый', 'Яркий фиалковый', 'Конфетно-розовый',
  'Светло-розовый', 'Голубой', 'Синий', 'Тёмно-синий', 'Зелёный', 'Изумрудный',
  'Нефтяной', 'Блестящий зелёный', 'Яркий зелёный', 'Зелёный', 'Отбеленный блонд',
  'Золотой блонд', 'Оранжевый блонд', 'Оранжевый', 'Яркий оранжевый', 'Блестящий оранжевый',
  'Тёмно-оранжевый', 'Красный', 'Тёмно-красный', 'Очень тёмно-красный', 'Чёрный'
]

const colorOverlayData = [
  { label: 'Тени для век', min: 0, max: 74, id: 4 },
  { label: 'Румяна', min: 0, max: 6, id: 5 },
  { label: 'Помада', min: 0, max: 9, id: 8 }
]

function MakeupTab(props: Props) {
  const updateColorOverlay = (id: number, field: string, value: number) => {
    const newOverlays = props.data.colorOverlays.map(overlay => 
      overlay.id === id ? { ...overlay, [field]: value } : overlay
    )
    props.updateData({ colorOverlays: newOverlays })
  }

  const makeupOverlays = colorOverlayData.filter(info => [4, 5, 8].includes(info.id))

  return (
    <div class="makeup-controls">
      {makeupOverlays.map((overlayInfo) => {
        const overlay = props.data.colorOverlays.find(o => o.id === overlayInfo.id)
        if (!overlay) return null

        return (
          <div class="section-container">
            <h3 class="section-title">{overlayInfo.label}</h3>
            <div class="section-content">
              <div class="arrow-control">
                <div class="arrow-control-label">
                  Вариант: {overlay.value}
                </div>
                <div class="arrow-control-buttons">
                  <button
                    class="arrow-button"
                    onClick={() => updateColorOverlay(overlayInfo.id, 'value', overlay.value - 1)}
                    disabled={overlay.value <= overlayInfo.min}
                  >
                    ←
                  </button>
                  <div class="arrow-control-value">
                    Вариант #{overlay.value}
                  </div>
                  <button
                    class="arrow-button"
                    onClick={() => updateColorOverlay(overlayInfo.id, 'value', overlay.value + 1)}
                    disabled={overlay.value >= overlayInfo.max}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div class="arrow-control">
                <div class="arrow-control-label">
                  Цвет: {hairColors[overlay.color1] || overlay.color1}
                </div>
                <div class="arrow-control-buttons">
                  <button
                    class="arrow-button"
                    onClick={() => updateColorOverlay(overlayInfo.id, 'color1', overlay.color1 - 1)}
                    disabled={overlay.color1 <= 0}
                  >
                    ←
                  </button>
                  <div class="arrow-control-value">
                    {hairColors[overlay.color1] || `Цвет #${overlay.color1}`}
                  </div>
                  <button
                    class="arrow-button"
                    onClick={() => updateColorOverlay(overlayInfo.id, 'color1', overlay.color1 + 1)}
                    disabled={overlay.color1 >= 63}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div class="slider-control">
                <div class="slider-control-header">
                  <div class="slider-control-label">Интенсивность:</div>
                  <div class="slider-control-value">{Math.round(overlay.opacity * 100)}%</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={overlay.opacity}
                  class="character-slider"
                  onInput={(e) => updateColorOverlay(overlayInfo.id, 'opacity', Math.round(parseFloat(e.currentTarget.value) * 10) / 10)}
                />
                <div class="slider-control-description">
                  Влево - естественно, Вправо - ярко
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MakeupTab