/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const VisualKeyboard = ({ playNote }: { playNote: (note: string) => void }) => {
  return (
  
    <div className="piano">
      <div className="white-key" onClick={() => playNote('C4')}>
        A
      </div>
      <div className="black-key" onClick={() => playNote('C#4')}>
        W
      </div>
      <div className="white-key" onClick={() => playNote('D4')}>
        S
      </div>
      <div className="black-key" onClick={() => playNote('D#4')}>
        E
      </div>
      <div className="white-key" onClick={() => playNote('E4')}>
        D
      </div>
      <div className="white-key" onClick={() => playNote('F4')}>
        F
      </div>
      <div className="black-key" onClick={() => playNote('F#4')}>
        T
      </div>
      <div className="white-key" onClick={() => playNote('G4')}>
        G
      </div>
      <div className="black-key" onClick={() => playNote('G#4')}>
        Y
      </div>
      <div className="white-key" onClick={() => playNote('A4')}>
        H
      </div>
      <div className="black-key" onClick={() => playNote('A#4')}>
        U
      </div>
      <div className="white-key" onClick={() => playNote('B4')}>
        J
      </div>
      <div className="white-key" onClick={() => playNote('C5')}>
        K
      </div>
      
    </div>
)}

export default VisualKeyboard