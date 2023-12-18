import Synth from './PolySynth'
import FatOscillator from './PluckSynth'
import NoiseSynth from './NoiseSynth'
import Header from './Header'


function App() {
  return (
    <>
      <header className="header">
        <Header />
      </header>
      <section className="main">
        <Synth />
        {/* <NewSynth /> */}
        <NoiseSynth />
        <FatOscillator />
      </section>
    </>
  )
}

export default App
