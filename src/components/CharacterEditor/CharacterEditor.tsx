import { createSignal, createEffect } from 'solid-js'
import { CharacterData, defaultCharacterData, TabType } from '../../types'
import { generateRandomCharacter } from '../../utils/randomCharacter'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import NicknameModal from '../NicknameModal/NicknameModal'
import CharacterTab from '../CharacterTab/CharacterTab'
import FaceTab from '../FaceTab/FaceTab'
import BodyTab from '../BodyTab/BodyTab'
import HairTab from '../HairTab/HairTab'
import EyebrowsTab from '../EyebrowsTab/EyebrowsTab'
import MakeupTab from '../MakeupTab/MakeupTab'
import ClothingTab from '../ClothingTab/ClothingTab'
import './CharacterEditor.css'

interface Props {
  onCharacterCreated: (characterData: CharacterData & { nickname: string }) => void
  onCancel: () => void
}

function CharacterEditor(props: Props) {
  const [characterData, setCharacterData] = createSignal<CharacterData>(defaultCharacterData)
  const [activeTab, setActiveTab] = createSignal<TabType>('character')
  const [showConfirmation, setShowConfirmation] = createSignal(false)
  const [showNicknameInput, setShowNicknameInput] = createSignal(false)

  // Отправка данных в Alt:V при каждом изменении
  createEffect(() => {
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      alt.emit('character:update', characterData())
    }
  })

  const updateCharacterData = (updates: Partial<CharacterData>) => {
    setCharacterData(prev => ({ ...prev, ...updates }))
  }

  const resetCharacter = () => {
    setCharacterData(defaultCharacterData)
  }

  const randomizeCharacter = () => {
    setCharacterData(generateRandomCharacter(characterData().gender))
  }

  const createCharacter = () => {
    setShowConfirmation(true)
  }

  const handleConfirmCreate = () => {
    setShowConfirmation(false)
    setShowNicknameInput(true)
  }

  const handleCancelCreate = () => {
    setShowConfirmation(false)
  }

  const handleNicknameSubmit = (nickname: string) => {
    setShowNicknameInput(false)
    props.onCharacterCreated({
      ...characterData(),
      nickname: nickname
    })
  }

  const handleNicknameCancel = () => {
    setShowNicknameInput(false)
  }

  const tabs = [
    { id: 'character', label: 'Наследственность', icon: '🧬' },
    { id: 'face', label: 'Форма лица', icon: '👤' },
    { id: 'hair', label: 'Волосы', icon: '💇' },
    { id: 'body', label: 'Особенности кожи', icon: '🎨' },
    { id: 'clothing', label: 'Одежда', icon: '👕' },
  ] as const

  const renderTabContent = () => {
    switch (activeTab()) {
      case 'character':
        return <CharacterTab data={characterData()} updateData={updateCharacterData} />
      case 'face':
        return <FaceTab data={characterData()} updateData={updateCharacterData} />
      case 'hair':
        return <HairTab data={characterData()} updateData={updateCharacterData} />
      case 'body':
        return <BodyTab data={characterData()} updateData={updateCharacterData} />
      case 'clothing':
        return <ClothingTab data={characterData()} updateData={updateCharacterData} />
      default:
        return null
    }
  }

  return (
    <div class="character-editor-container">
      {/* Show editor interface only when nickname modal is not shown */}
      {!showNicknameInput() && (
        <>
          {/* Header */}
          <div class="editor-header">
            <div class="editor-header-content">
              <h1 class="editor-title">
                <span class="editor-title-icon">🎭</span>
                Создание персонажа
              </h1>
              <p class="editor-subtitle">Настройте внешность вашего персонажа</p>
            </div>
            <button class="editor-cancel-button" onClick={props.onCancel}>
              Назад
            </button>
          </div>

          {/* Main Content */}
          <div class="editor-main">
            {/* Left Menu Panel */}
            <div class="editor-left-panel">
              <div class="editor-left-header">
                <h3 class="editor-left-title">СОЗДАНИЕ ПЕРСОНАЖА</h3>
              </div>
              
              <div class="editor-menu-list">
                {tabs.map((tab) => (
                  <div
                    onClick={() => setActiveTab(tab.id as TabType)}
                    class={`editor-menu-item ${activeTab() === tab.id ? 'active' : ''}`}
                  >
                    <span class="editor-menu-icon">{tab.icon}</span>
                    <span class="editor-menu-label">{tab.label}</span>
                    <span class="editor-menu-arrow">▶</span>
                  </div>
                ))}
              </div>
              
              <div class="editor-bottom-section">
                <button
                  onClick={randomizeCharacter}
                  class="editor-random-button"
                >
                  🎲 Случайный персонаж
                </button>
              </div>
            </div>

            {/* Right Content Panel */}
            <div class="editor-menu-panel">
              <div class="editor-panel-header">
                <h3 class="editor-panel-title">
                  <span class="editor-panel-icon">
                    {tabs.find(tab => tab.id === activeTab())?.icon}
                  </span>
                  {tabs.find(tab => tab.id === activeTab())?.label}
                </h3>
              </div>

              <div class="editor-tab-content">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Create Character Button - Fixed at bottom center */}
          <div class="editor-create-section">
            <button
              onClick={createCharacter}
              class="editor-create-btn"
            >
              Создать
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <ConfirmationModal
        show={showConfirmation()}
        onConfirm={handleConfirmCreate}
        onCancel={handleCancelCreate}
      />
      
      <NicknameModal
        show={showNicknameInput()}
        onSubmit={handleNicknameSubmit}
        onCancel={handleNicknameCancel}
      />
    </div>
  )
}

export default CharacterEditor

                </div>
              </div>

              {/* Tab Content Area */}
              <div class="editor-tab-content">
                <div class="editor-tab-content-wrapper">
                  {renderTabContent()}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div class="editor-bottom-actions">
                <button
                  onClick={randomizeCharacter}
                  class="editor-action-button random"
                >
                  🎲 Случайно
                </button>
                <button
                  onClick={resetCharacter}
                  class="editor-action-button reset"
                >
                  🔄 Сбросить
                </button>
              </div>
            </div>
          </div>

          {/* Create Character Button - Fixed at bottom center */}
          <div class="editor-create-section">
            <button
              onClick={createCharacter}
              class="editor-create-btn"
            >
              ✨ Создать персонажа
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <ConfirmationModal
        show={showConfirmation()}
        onConfirm={handleConfirmCreate}
        onCancel={handleCancelCreate}
      />
      
      <NicknameModal
        show={showNicknameInput()}
        onSubmit={handleNicknameSubmit}
        onCancel={handleNicknameCancel}
      />
    </div>
  )
}

export default CharacterEditor