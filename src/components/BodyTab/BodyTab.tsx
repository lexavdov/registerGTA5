import { CharacterData } from '../../types'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

const opacityOverlayData = [
  { label: 'Морщины', min: 0, max: 23, id: 6 },
  { label: 'Веснушки', min: 0, max: 14, id: 7 },
  { label: 'Повреждения кожи', min: 0, max: 11, id: 9 },
  { label: 'Родинки', min: 0, max: 10, id: 11 }
]

function BodyTab(props: Props) {
  const updateOpacityOverlay = (id: number, field: string, value: number) => {
    const newOverlays = props.data.opacityOverlays.map(overlay => 
      overlay.id === id ? { ...overlay, [field]: value } : overlay
    )
    props.updateData({ opacityOverlays: newOverlays })
  }

  return (
    <div class="appearance-controls">
      {opacityOverlayData.map((overlayInfo) => {
        const overlay = props.data.opacityOverlays.find(o => o.id === overlayInfo.id)
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
                    onClick={() => updateOpacityOverlay(overlayInfo.id, 'value', overlay.value - 1)}
                    disabled={overlay.value <= overlayInfo.min}
                  >
                    ←
                  </button>
                  <div class="arrow-control-value">
                    Вариант #{overlay.value}
                  </div>
                  <button
                    class="arrow-button"
                    onClick={() => updateOpacityOverlay(overlayInfo.id, 'value', overlay.value + 1)}
                    disabled={overlay.value >= overlayInfo.max}
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
                  onInput={(e) => updateOpacityOverlay(overlayInfo.id, 'opacity', Math.round(parseFloat(e.currentTarget.value) * 10) / 10)}
                />
                <div class="slider-control-description">
                  Влево - менее заметно, Вправо - более выражено
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BodyTab