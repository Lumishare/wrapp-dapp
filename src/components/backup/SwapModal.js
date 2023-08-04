import {
  Layer,
} from 'grommet';

import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

export default function SwapModal(props) {


  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
    {
      props.provider && props.coinbase &&
      <SwapWidget provider={props.provider} />

    }
    </Layer>
  )
}
