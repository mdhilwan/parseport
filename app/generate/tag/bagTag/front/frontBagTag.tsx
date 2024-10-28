import BaseBagTag from '@/app/generate/tag/bagTag/base'
import { useAppSelector } from '@/app/store'

function getDaysBetweenDates({ start, end }: { start: string; end: string }) {
  if (start && end) {
    const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
    const diffInMs = Math.abs(
      new Date(start).getTime() - new Date(end).getTime()
    )
    return Math.round(diffInMs / oneDay) + 'D '
  }
  return ''
}

function displayDateRange({ start, end }: { start: string; end: string }) {
  if (start && end) {
    const formatter = new Intl.DateTimeFormat('en-SG', {
      dateStyle: 'medium',
    })
    return formatter.formatRange(new Date(start), new Date(end))
  }
  return ''
}

const FrontBagTag = () => {
  const {
    scannedData,
    tourPackageDetails,
    showBagTagModal: { rowKey = 0 },
  } = useAppSelector((state) => state.mrzStore)

  const a = new Date()
  const localeFormat = 'ar-SA-islamic-umalqura'
  const hijriYear = Intl.DateTimeFormat(localeFormat).formatToParts(a)
  console.log(hijriYear)

  return (
    <BaseBagTag type="Front">
      <>
        <h3>{tourPackageDetails.tourPackageName}</h3>
        <h4>Halijah Travels Pte Ltd</h4>
        <h5>
          22 Kandahar Street, Singapore 198886, +65 6294 9676 halijah.com.sg
        </h5>
        <p>
          {scannedData[rowKey].firstName} {scannedData[rowKey].lastName}
        </p>
        <ul>
          <li>
            {getDaysBetweenDates(tourPackageDetails.dates)}
            {tourPackageDetails.id}
          </li>
          <li>{displayDateRange(tourPackageDetails.dates)}</li>
        </ul>
      </>
    </BaseBagTag>
  )
}

export default FrontBagTag
