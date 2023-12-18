/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import '../styles/piano.css'
import AudioKeys from 'audiokeys'
import VisualKeyboard from './VisualKeyboard'

export const playNote = (
  synth: Tone.PolySynth | null,
  note: string,
  duration = '16n'
) => {
  if (synth) {
    synth.triggerAttackRelease(note, duration)
  }
}

const Synth = () => {
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null)
  const [volume, setVolume] = useState(-12)
  const [waveform, setWaveform] = useState('sine')
  const [reverbWet, setReverbWet] = useState(0.5)
  const [delayTime, setDelayTime] = useState(0.25)
  const [feedback, setFeedback] = useState(0.5)


  useEffect(() => {
    const newReverb = new Tone.Reverb().toDestination()
    newReverb.wet.value = reverbWet

    const newDelay = new Tone.FeedbackDelay({
      delayTime: delayTime,
      feedback: feedback,
    }).connect(newReverb)

    const newSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: waveform,
      },
    })
      .connect(newDelay)
      .toDestination()

    setSynth(newSynth)

    const keyboard = new AudioKeys()
    keyboard.down((key) => {
      if (newSynth) {
        playNote(newSynth, key.frequency)
      }
    })

    return () => {
      newSynth.dispose()
      newReverb.dispose()
      newDelay.dispose()
      
    }
  }, [waveform, reverbWet, delayTime, feedback])


  useEffect(() => {
    synth && (synth.volume.value = volume)
  }, [synth, volume])

  
    if (Tone.context.state === 'suspended') {
      Tone.context.resume()
    }
  

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function keyboardNotes(event: { keyCode: unknown }) {
      
    }

    window.addEventListener('keydown', keyboardNotes)
    return () => {
      window.removeEventListener('keydown', keyboardNotes)
    }
  }, [synth])

  return (
    <div>
      <h2>Poly Synth</h2>
      
      <div>
        <label>
          Volume:
          <input
            type="range"
            min="-30"
            max="0"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
      </div>
      <VisualKeyboard playNote={(note) => playNote(synth, note)} />
      <div>
        <label>
          Waveform:
          <select
            value={waveform}
            onChange={(e) => setWaveform(e.target.value)}
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Reverb Mix:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverbWet}
            onChange={(e) => setReverbWet(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        
        <label>
          Delay Time:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={delayTime}
            onChange={(e) => setDelayTime(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Feedback:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

export default Synth
