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
    { id: 'character', label: 'Персонаж', icon: '👤' },
    { id: 'face', label: 'Лицо и Шея', icon: '😊' },
    { id: 'body', label: 'Тело и кожа', icon: '🎨' },
    { id: 'hair', label: 'Растительность', icon: '💇' },
    { id: 'eyebrows', label: 'Брови', icon: '👁️' },
    { id: 'makeup', label: 'Макияж', icon: '💄' },
    { id: 'clothing', label: 'Одежда', icon: '👕' },
  ] as const

  const renderTabContent = () => {
    switch (activeTab()) {
      case 'character':
        return <CharacterTab data={characterData()} updateData={updateCharacterData} />
      case 'face':
        return <FaceTab data={characterData()} updateData={updateCharacterData} />
      case 'body':
        return <BodyTab data={characterData()} updateData={updateCharacterData} />
      case 'hair':
        return <HairTab data={characterData()} updateData={updateCharacterData} />
      case 'eyebrows':
        return <EyebrowsTab data={characterData()} updateData={updateCharacterData} />
      case 'makeup':
        return <MakeupTab data={characterData()} updateData={updateCharacterData} />
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
            {/* Right Menu Panel */}
            <div class="editor-menu-panel">
              {/* Tab Navigation */}
              <div class="editor-tab-navigation">
                <div class="editor-tab-grid">
                  {tabs.map((tab) => (
                    <button
                      onClick={() => setActiveTab(tab.id as TabType)}
                      class={`editor-tab-button ${activeTab() === tab.id ? 'active' : 'inactive'}`}
                    >
                      <span class="editor-tab-icon">{tab.icon}</span>
                      <span class="editor-tab-label">{tab.label}</span>
                    </button>
                  ))}
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