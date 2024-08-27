import Script from 'next/script'
import MrzInputHandler from './MrzInutHandler'

const Mrz = ({ dpSetScanState, dpSetParsed }) => {
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
