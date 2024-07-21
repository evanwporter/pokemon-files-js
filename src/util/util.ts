import { GameOfOrigin, isGameBoy, Nature } from 'pokemon-resources'
import { getGenderRatio, NationalDex } from 'pokemon-species-data'
import Prando from 'prando'
import { PKM } from '../pkm'
import { AllPKMFields } from './pkmInterface'

export function getGen3MiscFlags(pokemon: PKM): number {
  if ('isEgg' in pokemon && pokemon.isEgg) {
    return 0b0110
  }
  return 0b0010
}

export function getDisplayID(pokemon: PKM): string {
  if (
    !('gameOfOrigin' in pokemon) ||
    isGameBoy(pokemon.gameOfOrigin) ||
    pokemon.gameOfOrigin < GameOfOrigin.Sun
  ) {
    return pokemon.trainerID.toString().padStart(5, '0')
  }

  const fullTrainerID = (pokemon.trainerID << 32) | pokemon.secretID
  return (fullTrainerID % 1000000).toString().padStart(6, '0')
}

const gen3To5MaleThreshold: { [key: number]: number } = {
  0: 254,
  0.125: 225,
  0.25: 191,
  0.5: 127,
  0.75: 63,
  0.875: 31,
  1: 0,
}

export const getGen3To5Gender = (PID: number, dexNum: number) => {
  if (dexNum === 0) {
    return 2
  }
  const genderRatio = getGenderRatio(dexNum, 0)
  const maleRatio = genderRatio.male > 0 || genderRatio.female > 0 ? genderRatio.male : -1
  if (maleRatio === -1) {
    return 2
  }
  if (maleRatio === 0) {
    return 1
  }
  return (PID & 0xff) >= gen3To5MaleThreshold[maleRatio] ? 0 : 1
}

const getIsShinyPreGen6 = (trainerID: number, secretID: number, personalityValue: number) =>
  (trainerID ^ secretID ^ ((personalityValue >> 16) & 0xffff) ^ (personalityValue & 0xffff)) < 8

export const getUnownLetterGen3 = (personalityValue: number) => {
  let letterValue = (personalityValue >> 24) & 0x3
  letterValue = ((personalityValue >> 16) & 0x3) | (letterValue << 2)
  letterValue = ((personalityValue >> 8) & 0x3) | (letterValue << 2)
  letterValue = (personalityValue & 0x3) | (letterValue << 2)
  return letterValue % 28
}

export const generatePersonalityValuePreservingAttributes = (
  mon: AllPKMFields,
  prng: Prando = new Prando()
) => {
  let personalityValue = 0
  let otherNature: Nature | undefined
  let otherAbilityNum = 4
  if (mon.personalityValue !== undefined && mon.abilityNum !== undefined) {
    personalityValue = mon.personalityValue
    otherNature = mon.nature
    otherAbilityNum = mon.abilityNum
  } else {
    personalityValue = prng.nextInt(0, 0xffffffff)
  }

  if ('statNature' in mon) {
    otherNature = mon.statNature
  }
  // xoring the other three values with this to calculate upper half of personality value
  // will ensure shininess or non-shininess depending on original mon
  const otherGender = mon.gender
  let i = 0
  let newPersonalityValue = BigInt(personalityValue)
  const shouldCheckUnown = mon.dexNum === NationalDex.Unown
  while (i < 0x10000) {
    const newGender = getGen3To5Gender(Number(newPersonalityValue), mon.dexNum)
    const newNature = Number(newPersonalityValue % BigInt(25))
    if (
      (!shouldCheckUnown || getUnownLetterGen3(Number(newPersonalityValue)) === mon.formeNum) &&
      newGender === otherGender &&
      (otherAbilityNum === 4 ||
        shouldCheckUnown ||
        Number(newPersonalityValue & BigInt(1)) + 1 === otherAbilityNum) &&
      (otherNature === undefined || newNature === otherNature) &&
      getIsShinyPreGen6(mon.trainerID, mon.secretID ?? 0, Number(newPersonalityValue)) ===
        mon.isShiny()
    ) {
      return Number(newPersonalityValue)
    }
    i++
    const pvBytes = new DataView(new Uint8Array(4).buffer)
    pvBytes.setInt32(0, personalityValue, true)
    let pvLower16, pvUpper16: number
    if (mon.dexNum === NationalDex.Unown) {
      pvLower16 = prng.nextInt(0, 0xffff)
      pvUpper16 = prng.nextInt(0, 0xffff)
      if (mon.isShiny()) {
        pvUpper16 =
          ((mon.trainerID ^ (mon.secretID ?? 0) ^ pvLower16) & 0xfcfc) | (pvUpper16 & 0x0303)
      }
    } else {
      pvLower16 = pvBytes.getUint16(0, true)
      pvUpper16 = pvBytes.getUint16(2, true)
      pvLower16 ^= i
      if (mon.isShiny()) {
        pvUpper16 = mon.trainerID ^ (mon.secretID ?? 0) ^ pvLower16
      }
    }
    pvBytes.setUint16(2, pvUpper16, true)
    pvBytes.setUint16(0, pvLower16, true)
    newPersonalityValue = BigInt(pvBytes.getUint32(0, true))
  }
  return personalityValue
}
