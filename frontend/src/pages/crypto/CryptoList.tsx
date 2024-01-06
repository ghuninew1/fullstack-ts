import Binance from './Binance'
import Coinbase from './Coinbase'

const CryptoList = () => {
  return (
    <div className='max-w-w6 mx-auto flex flex-col items-center justify-center'>
      <Binance />
      <Coinbase />
    </div>
  )
}

export default CryptoList