import COAL from '../images/furnace/fuel/Coal.png'
import SAND from '../images/furnace/smelt-inputs/Sand.png'
import COBBLESTONE from '../images/furnace/smelt-inputs/Cobblestone.png'
import GLASS from '../images/furnace/smelt-outputs/Glass.png'
import STONE from '../images/furnace/smelt-outputs/Stone.png'

function FurnaceGUI({current, itemChoice}) {
  const getItemImage = (itemName) => {
    switch (itemName) {
      case 'SAND':
        return SAND
      case 'COBBLESTONE':
        return COBBLESTONE
      case 'GLASS':
        return GLASS
      case 'STONE':
        return STONE
      case 'COAL':
        return COAL
      default:
        break
    }
  }
  return (
    <div className="bg-gray-200 px-8 gui grid grid-cols-9 grid-rows-5">
      <h1 className="text-gray-600 col-start-4 col-span-3 text-center text-2xl">
        Furnace
      </h1>
      <div className="bg-gray-400 gui-slot col-start-3 row-start-2 flex items-center p-1">
        {current.context.itemSmelting.name &&
        current.context.itemSmelting.quantity !== 0 ? (
          <img
            src={getItemImage(current.context.itemSmelting.name)}
            className="w-9 mx-auto"
            alt={current.context.itemSmelting.name}
          />
        ) : (
          <div className="w-9 h-9 mx-auto" />
        )}
        <div className="relative">
          {current.context.itemSmelting.quantity !== 0 && (
            <p className="text-gray-50 absolute top-0 right-1">
              {current.context.itemSmelting.quantity}
            </p>
          )}
        </div>
      </div>
      <div className="bg-gray-400 gui-slot col-start-3 row-start-3 h-6 w-6 mx-2 my-2 self-center flex items-end justify-self-center">
        <div
          className={`w-full bg-yellow-400 h-${
            current.matches('smelting') &&
            current.context.fuelOperationsRemaining ===
              current.context.fuel.numOperations
              ? 'full'
              : `${Math.floor(
                  (current.context.fuelOperationsRemaining * 6) /
                    current.context.fuel.numOperations,
                )}/6`
          }`}
        />
      </div>
      <div className="bg-gray-400 gui-slot col-start-3 row-start-4 flex items-center p-1">
        {current.context.fuel.name && current.context.fuel.quantity !== 0 ? (
          <img
            src={getItemImage(current.context.fuel.name)}
            className="w-9 mx-auto"
            alt={current.context.itemSmelting.name}
          />
        ) : (
          <div className="w-9 h-9 mx-auto" />
        )}
        <div className="relative">
          {current.context.fuel.quantity !== 0 && (
            <p className="text-gray-50 absolute top-0 right-1">
              {current.context.fuel.quantity}
            </p>
          )}
        </div>
      </div>
      <div className="bg-gray-400 gui-slot col-start-4 col-span-3 row-start-3 my-2 mx-4 h-6 w-18 self-center">
        <div
          className={`bg-white h-full ${
            current.context.progress === 0
              ? 'w-0'
              : `w-${current.context.progress}/12`
          }`}
        ></div>
      </div>
      <div className="bg-gray-400 gui-slot col-start-7 row-start-3 flex items-center p-1">
        {current.context.product.name && (
          <img
            src={getItemImage(current.context.product.name)}
            alt={current.context.product.name}
            className="w-9 mx-auto"
          />
        )}
        <div className="relative">
          {current.context.product.quantity !== 0 && (
            <p className="text-gray-50 absolute top-0 right-1">
              {current.context.product.quantity}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FurnaceGUI
