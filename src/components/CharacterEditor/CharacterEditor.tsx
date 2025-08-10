import { createSignal, createStore, For, Show } from 'solid-js'
import { CharacterData, TabType, defaultCharacterData } from '../../types'
import { generateRandomCharacter } from '../../utils/randomCharacter'
import CharacterTab from '../CharacterTab/CharacterTab'
import FaceTab from '../FaceTab/FaceTab'
import BodyTab from '../BodyTab/BodyTab'
import HairTab from '../HairTab/HairTab'
import EyebrowsTab from '../EyebrowsTab/EyebrowsTab'
import MakeupTab from '../MakeupTab/MakeupTab'
import ClothingTab from '../ClothingTab/ClothingTab'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import NicknameModal from '../NicknameModal/NicknameModal'
import './CharacterEditor.css'

interface Props {
  onCharacterCreated: (characterData: any) => void
  onCancel: () => void
}

function CharacterEditor(props: Props) {
  const [characterData, setCharacterData] = createStore<CharacterData>(defaultCharacterData)
  const [activeTab, setActiveTab] = createSignal<TabType>('character')
  const [showConfirmation, setShowConfirmation] = createSignal(false)
  const [showNicknameModal, setShowNicknameModal] = createSignal(false)

  const tabs = [
    { id: 'character' as TabType, label: 'Персонаж', icon: '👤' },
    { id: 'face' as TabType, label: 'Лицо', icon: '😊' },
    { id: 'body' as TabType, label: 'Тело', icon: '🏃' },
    { id: 'hair' as TabType, label: 'Волосы', icon: '💇' },
    { id: 'eyebrows' as TabType, label: 'Брови', icon: '👁️' },
    { id: 'makeup' as TabType, label: 'Макияж', icon: '💄' },
    { id: 'clothing' as TabType, label: 'Одежда', icon: '👕' }
  ]

  const updateCharacterData = (updates: Partial<CharacterData>) => {
    setCharacterData(updates)
  }

  const handleRandomize = () => {
    const randomData = generateRandomCharacter(characterData.gender)
    setCharacterData(randomData)
  }

  const handleCreateCharacter = () => {
    setShowConfirmation(true)
  }

  const handleConfirmCreation = () => {
    setShowConfirmation(false)
    setShowNicknameModal(true)
  }

  const handleNicknameSubmit = (nickname: string) => {
    const finalCharacterData = {
      ...characterData,
      nickname: nickname
    }
    
    setShowNicknameModal(false)
    props.onCharacterCreated(finalCharacterData)
  }

  const renderTabContent = () => {
    switch (activeTab()) {
      case 'character':
        return <CharacterTab data={characterData} updateData={updateCharacterData} />
      case 'face':
        return <FaceTab data={characterData} updateData={updateCharacterData} />
      case 'body':
        return <BodyTab data={characterData} updateData={updateCharacterData} />
      case 'hair':
        return <HairTab data={characterData} updateData={updateCharacterData} />
      case 'eyebrows':
        return <EyebrowsTab data={characterData} updateData={updateCharacterData} />
      case 'makeup':
        return <MakeupTab data={characterData} updateData={updateCharacterData} />
      case 'clothing':
        return <ClothingTab data={characterData} updateData={updateCharacterData} />
      default:
        return <CharacterTab data={characterData} updateData={updateCharacterData} />
    }
  }

  return (
    <div class="character-editor-container">
      {/* Header */}
      <div class="editor-header">
        <div class="editor-header-content">
          <h1>
            <span class="editor-title-icon">✨</span>
            Создание персонажа
          </h1>
          <p>Настройте внешность вашего персонажа</p>
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
            <h3 class="editor-left-title">Настройки</h3>
          </div>
          
          <div class="editor-menu-list">
            <For each={tabs}>
              {(tab) => (
                <div
                  class={`editor-menu-item ${activeTab() === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span class="editor-menu-icon">{tab.icon}</span>
                  <span class="editor-menu-label">{tab.label}</span>
                  <span class="editor-menu-arrow">▶</span>
                </div>
              )}
            </For>
          </div>

          <div class="editor-bottom-section">
            <button class="editor-random-button" onClick={handleRandomize}>
              🎲 Случайно
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

      {/* Create Button */}
      <div class="editor-create-section">
        <button class="editor-create-btn" onClick={handleCreateCharacter}>
          ✨ Создать персонажа
        </button>
      </div>

      {/* Modals */}
      <ConfirmationModal
        show={showConfirmation()}
        onConfirm={handleConfirmCreation}
        onCancel={() => setShowConfirmation(false)}
      />

      <NicknameModal
        show={showNicknameModal()}
        onSubmit={handleNicknameSubmit}
        onCancel={() => setShowNicknameModal(false)}
      />
    </div>
  )
}

export default CharacterEditor