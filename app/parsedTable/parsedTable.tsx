'use client'

import { UserType } from '@/app/admin/shared/controls/controls'
import { NoScannedData } from '@/app/parsedTable/noScannedData'
import { ScannedDataTable } from '@/app/parsedTable/scannedDataTable'
import { useAppSelector } from '@/app/store'

export const TableLabelMap = {
  issuingState: 'Issuing State',
  firstName: 'First Name',
  lastName: 'Last Name',
  documentNumber: 'Passport Number',
  nationality: 'Nationality',
  birthDate: 'Date of Birth',
  sex: 'Sex',
  expirationDate: 'Date of Expiry',
  personalNumber: 'NRIC Number',
}

export const TableLabelKeys = Object.keys(TableLabelMap)
export const TableLabelValues = Object.values(TableLabelMap)

type ParsedTableType = {
  user: UserType
}

const ParsedTable = (props: ParsedTableType) => {
  const { user } = props
  const { scannedData } = useAppSelector((state) => state.mrzStore)

  return (
    <>
      {scannedData.length === 0 ? (
        <NoScannedData user={user} />
      ) : (
        <ScannedDataTable user={user} />
      )}
    </>
  )
}

export default ParsedTable
