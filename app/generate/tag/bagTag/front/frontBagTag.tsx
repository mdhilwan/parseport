import BaseBagTag from '@/app/generate/tag/bagTag/base'
import { ITourDates } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import localFont from 'next/font/local'

const playlistFont = localFont({
  src: '../../font/PlaylistFF/Playlist Script.otf',
})

function getDaysBetweenDates({ start, end }: ITourDates) {
  if (start && end) {
    const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day
    const diffInMs = Math.abs(
      new Date(start).getTime() - new Date(end).getTime()
    )
    return Math.round(diffInMs / oneDay) + 'D '
  }
  return ''
}

function displayDateRange({ start, end }: ITourDates) {
  if (start && end) {
    const formatter = new Intl.DateTimeFormat('en-SG', {
      dateStyle: 'medium',
    })

    const a = new Date(end)
    const localeFormat = 'ar-SA-islamic-umalqura'
    const hijri = Intl.DateTimeFormat(localeFormat).formatToParts(a)
    const hijriYear = hijri.find((value) => value.type === 'year')
    const hijriEra = hijri.find((value) => value.type === 'era')

    return `${formatter.formatRange(new Date(start), new Date(end))}`
  }
  return ''
}

const FrontBagTag = () => {
  const {
    scannedData,
    tourPackageDetails,
    showBagTagModal: { rowKey = 0 },
  } = useAppSelector((state) => state.mrzStore)

  return (
    <BaseBagTag
      type="Front"
      bgImg={'/bagTags/HalijahUmrahHajjLuggageTag-Front.png'}
    >
      <>
        <h3
          className={
            'absolute top-14 left-[4.6rem] text-[#d2f4f0] text-2xl text-shadow leading-none ' +
            playlistFont.className
          }
        >
          {tourPackageDetails.tourPackageName}
        </h3>
        <h4
          className={
            'absolute top-[5.2rem] left-[4.6rem] text-[#d2f4f0] text-xs text-shadow leading-none'
          }
        >
          {displayDateRange(tourPackageDetails.dates)}
        </h4>
        <p className={'absolute py-2 px-5 bottom-32'}>
          {scannedData[rowKey].firstName} {scannedData[rowKey].lastName}
        </p>
        {/*<ul>*/}
        {/*  <li>*/}
        {/*    {tourPackageDetails.id}*/}
        {/*  </li>*/}
        {/*  <li>{displayDateRange(tourPackageDetails.dates)}</li>*/}
        {/*</ul>*/}
      </>
    </BaseBagTag>
  )
}

export default FrontBagTag
