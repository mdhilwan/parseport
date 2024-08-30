import Script from 'next/script'
import MrzInputHandler from './MrzInutHandler'

type MrzType = {
  dpSetScanState: Function
  dpSetParsed: Function
}

const Mrz = (props: MrzType) => {
  const { dpSetScanState, dpSetParsed } = props
  return (
    <>
      <Script
        type="text/javascript"
        src="./vendor/mrz-worker.bundle-min-wrapped.js"
        strategy="afterInteractive"
      />
      <input
        id="mrz-input"
        name="mmrz-input"
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={($event) =>
          MrzInputHandler({ dpSetScanState, dpSetParsed, $event })
        }
      />
    </>
  )
}

export default Mrz
