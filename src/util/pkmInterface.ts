// This file was generated by make generate
import * as types from './types'

export interface AllPKMFields {
  format: string
  level?: number
  isFatefulEncounter?: boolean
  performance?: number
  encryptionConstant?: number
  secretSuperTrainingUnlocked?: boolean
  exp: number
  movePPUps: number[]
  geolocations?: types.Geolocation[]
  canGigantamax?: boolean
  dexNum: number
  movePP: number[]
  trainerName: string
  height?: number
  gvs?: types.Stats
  personalityValue?: number
  dvs?: types.StatsPreSplit
  fieldEventFatigue1?: number
  unknownA0?: number
  masterFlagsLA?: ArrayBuffer
  gameOfOrigin: number
  shadowID?: number
  superTrainingDistFlags?: number
  relearnMoves?: number[]
  fullness?: number
  palma?: number
  languageIndex: number
  metDate?: types.PKMDate | undefined
  gender?: number
  flag2LA?: boolean
  superTrainingFlags?: number
  nickname: string
  metLocationIndexPtHGSS?: number
  favorite?: boolean
  weight?: number
  isAlpha?: boolean
  metLevel?: number
  metLocationIndex?: number
  ivs?: types.Stats
  consoleRegion?: number
  trainerFriendship?: number
  tmFlagsSV?: ArrayBuffer
  formArgument?: number
  secretSuperTrainingComplete?: boolean
  trainerAffection?: number
  handlerLanguage?: number
  trFlagsSwSh?: ArrayBuffer
  alphaMove?: number
  statusCondition?: number
  moves: number[]
  trainerID: number
  shinyLeaves?: number
  resortEventStatus?: number
  dynamaxLevel?: number
  affixedRibbon?: number
  evsG12?: types.StatsPreSplit
  secretID: number
  isEgg?: boolean
  ribbonBytes?: ArrayBuffer
  sanity?: number
  trainerMemory?: types.Memory
  statNature?: number
  tutorFlagsLA?: ArrayBuffer
  tmFlagsBDSP?: ArrayBuffer
  heldItemIndex: number
  evs?: types.Stats
  sociability?: number
  type1?: number
  isNsPokemon?: boolean
  handlerMemory?: types.Memory
  trainerGender: boolean
  contestMemoryCount?: number
  handlerGender?: boolean
  currentHP: number
  markings?:
    | types.MarkingsFourShapes
    | types.MarkingsSixShapesNoColor
    | types.MarkingsSixShapesWithColor
  statLevel?: number
  eggDate?: types.PKMDate | undefined
  trainingBag?: number
  handlerAffection?: number
  hyperTraining?: types.HyperTrainStats
  trainingBagHits?: number
  isCurrentHandler?: boolean
  unknownF3?: number
  moveFlagsLA?: ArrayBuffer
  avs?: types.Stats
  tmFlagsSVDLC?: ArrayBuffer
  type2?: number
  formeNum: number
  obedienceLevel?: number
  ball?: number
  ribbons?: string[]
  handlerFriendship?: number
  scale?: number
  contest?: types.ContestStats
  isNicknamed?: boolean
  abilityIndex?: number
  enjoyment?: number
  teraTypeOverride?: number
  metTimeOfDay?: number
  pokeStarFame?: number
  region?: number
  fieldEventFatigue2?: number
  handlerID?: number
  gameOfOriginBattle?: number
  encounterType?: number
  battleMemoryCount?: number
  homeTracker?: ArrayBuffer
  isNoble?: boolean
  checksum?: number
  shadowGauge?: number
  abilityNum?: number
  handlerName?: string
  country?: number
  nature?: number
  pokerusByte?: number
  eggLocationIndex?: number
  teraTypeOriginal?: number
  heldItemName: string
  language: string
  isLocked?: boolean
  getLevel: () => number
  isShiny: () => boolean
  isSquareShiny: () => boolean
  toBytes: () => ArrayBuffer
}
