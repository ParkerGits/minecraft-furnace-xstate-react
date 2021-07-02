import Furnace from '../components/Furnace'
import FurnaceGUI from '../components/FurnaceGUI'
import {useMachine} from '@xstate/react'
import furnaceMachine from '../machines/furnaceMachine'
import {useEffect, useState} from 'react'

function App() {
  const [current, send] = useMachine(furnaceMachine)
  const [itemChoice, setItemChoice] = useState('SAND')
  const [itemQuantity, setItemQuantity] = useState(0)
  const [fuelChoice, setFuelChoice] = useState('COAL')
  const [fuelQuantity, setFuelQuantity] = useState(0)
  const [progress, setProgress] = useState(0)
  const handleSmeltSubmit = (e) => {
    e.preventDefault()
    send({type: 'ADD_ITEM', item: itemChoice, quantity: parseInt(itemQuantity)})
  }
  const handleFuelSubmit = (e) => {
    e.preventDefault()
    send({type: 'ADD_FUEL', item: fuelChoice, quantity: fuelQuantity})
  }
  return (
    <div className="flex flex-col items-center">
      <Furnace current={current} />
      <FurnaceGUI
        current={current}
        itemChoice={itemChoice}
        progress={progress}
      />
      <form className="mt-4" onSubmit={(e) => handleSmeltSubmit(e)}>
        <select
          value={itemChoice}
          onChange={(event) => setItemChoice(event.target.value)}
          className="minecraft-button"
        >
          <option value="SAND">Sand</option>
          <option value="COBBLESTONE">Cobblestone</option>
        </select>
        <input
          type="number"
          value={itemQuantity}
          className="minecraft-input"
          onChange={(e) => {
            e.target.value < 0
              ? setItemQuantity(0)
              : setItemQuantity(e.target.value)
          }}
          min="0"
        />
        <button
          type="submit"
          disabled={itemQuantity === 0}
          className="minecraft-button mt-2"
        >
          Add Item
        </button>
      </form>
      <form className="mt-4" onSubmit={(e) => handleFuelSubmit(e)}>
        <select
          value={itemChoice}
          onChange={(event) => setItemChoice(event.target.value)}
          className="minecraft-button"
        >
          <option value="COAL">Coal</option>
        </select>
        <input
          type="number"
          value={fuelQuantity}
          onChange={(e) => {
            e.target.value < 0
              ? setFuelQuantity(0)
              : setFuelQuantity(e.target.value)
          }}
          className="minecraft-input"
          min="0"
        />
        <button
          type="submit"
          disabled={fuelQuantity === 0}
          className="minecraft-button mt-2 "
        >
          Add Fuel
        </button>
      </form>
      <button
        onClick={() => send({type: 'SMELT'})}
        className="minecraft-button mt-2 "
      >
        Smelt
      </button>
    </div>
  )
}

export default App
