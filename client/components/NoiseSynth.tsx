import { useState, useEffect } from 'react'


import * as Tone from 'tone'

const NoiseSynth = () => {
  const [noiseSynth, setNoiseSynth] = useState(null)
  const [loop, setLoop] = useState(null)
  const [delay, setDelay] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(-12)
  const [delayTime, setDelayTime] = useState(0.25)
  const [feedback, setFeedback] = useState(0.5)
  const [reverb, setReverb] = useState(null)
  const [reverbWet, setReverbWet] = useState(0.5)

  useEffect(() => {
    const newNoiseSynth = new Tone.NoiseSynth().toDestination()
    const newDelay = new Tone.FeedbackDelay().toDestination()
    const newReverb = new Tone.Reverb().toDestination()

    newNoiseSynth.connect(newDelay)
    newDelay.connect(newReverb) // Correctly connect the delay to the reverb
    newReverb.toDestination() // And then connect the reverb to the destination

    const newLoop = new Tone.Loop((time) => {
      newNoiseSynth.triggerAttackRelease('8n', time)
    }, '4n').start(0)

    setNoiseSynth(newNoiseSynth)
    setLoop(newLoop)
    setDelay(newDelay)
    setReverb(newReverb)

    return () => {
      newNoiseSynth.dispose()
      newLoop.dispose()
      newDelay.dispose()
      newReverb.dispose()
      Tone.Transport.stop()
    }
  }, [])


  useEffect(() => {
    noiseSynth && (noiseSynth.volume.value = volume)
  }, [volume])

  useEffect(() => {
    delay && (delay.delayTime.value = delayTime)
  }, [delayTime])

  useEffect(() => {
    delay && (delay.feedback.value = feedback)
  }, [feedback])


  useEffect(() => {
    reverb && (reverb.wet.value = reverbWet) // Update reverb mix when reverbWet state changes
  }, [reverbWet])

  const handleTogglePlay = async () => {
    await Tone.start()
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      Tone.Transport.stop()
      loop.stop()
    } else {
      Tone.Transport.start()
      loop.start()
    }
  }

  return (
    <div>
      <h2>Noise Synth</h2>
      <div>
        <label>
          Volume:
          <input
            type="range"
            min="-30"
            max="0"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
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
      <div>
        <label>
          Reverb Mix:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverbWet}
            onChange={(e) => setReverbWet(e.target.value)}
          />
        </label>
      </div>
      <label>
        Play Noise:
        <input
          type="checkbox"
          checked={isPlaying}
          onChange={handleTogglePlay}
        />
      </label>
    </div>
  )
}

export default NoiseSynth
