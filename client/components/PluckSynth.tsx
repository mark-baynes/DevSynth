import { useEffect, useState } from 'react'
import * as Tone from 'tone'
import AudioKeys from 'audiokeys'

const PluckSynthApp = () => {
  const [pluckSynth, setPluckSynth] = useState(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const newPluckSynth = new Tone.PluckSynth().toDestination()
    const keyboard = new AudioKeys()

    keyboard.down((key) => {
      console.log(key)
      if (isActive) {
        newPluckSynth.triggerAttackRelease(key.frequency, '16n')
      }
    })

    setPluckSynth(newPluckSynth)

    return () => {
      newPluckSynth.dispose()
    }
  }, [isActive])

  const handleToggle = () => {
    setIsActive((prev) => !prev)
  }

  return (
    <div>
      <h2>Pluck Synth</h2>
      <input type="checkbox" checked={isActive} onChange={handleToggle} />
      <label>Activate</label>
    </div>
  )
}

export default PluckSynthApp
