import { useEffect, useState } from 'react'
import * as Tone from 'tone'
import AudioKeys from 'audiokeys'

const PluckSynthApp = () => {

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const newPluckSynth = new Tone.PluckSynth().toDestination()
    const keyboard = new AudioKeys()

    keyboard.down((key: { frequency: Tone.Unit.Frequency }) => {
      console.log(key)
      if (isActive) {
        newPluckSynth.triggerAttackRelease(key.frequency, '16n')
      }
    })

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
      <span><input type="checkbox" checked={isActive} onChange={handleToggle} />
      <p>
        Activate
        {/* <input type="null" /> */}
      </p>
    </span></div>
  )
}

export default PluckSynthApp
