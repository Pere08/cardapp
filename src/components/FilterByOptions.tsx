import React from 'react';
import { filterType, cardType } from '@/types/types'


type Props = {
    filters: {
        country: string[],
        version: string[],
        text: string
    }
    setFilters: any,
    values: cardType[],
    filter: filterType,
    styles: string
}

const FilterByOptions = ({filters, setFilters, values, filter, styles}: Props): JSX.Element => {

  const handleFilters = (value: string) => {
    if(value === 'all') {
      setFilters({
        ...filters,
        [filter]: []
      })
    }else if(!filters[filter].includes(value)) {
      setFilters({
        ...filters,
        [filter]: [
          ...filters[filter],
          value
        ]
      })
    }
  }

    return (
      <select className={styles} onChange={({target: {value}}) => handleFilters(value)} 
      id={filter}>
        <option>all</option>
        {
          values.map((e: any, index: number) => (
            <option key={index} value={e[filter]}>{e[filter]}</option>
          ))
        }
      </select>
    )
}

export default FilterByOptions
