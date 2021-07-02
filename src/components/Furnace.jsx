import idle from '../images/furnace/idle.png'
import smelting from '../images/furnace/smelting.gif'

function Furnace({current}) {
  return (
    <div className="my-4">
      {current.matches('idle') ? <img src={idle} alt="idle"/> : <img src={smelting} alt="smelting"/>}
    </div>
  );
}

export default Furnace;
