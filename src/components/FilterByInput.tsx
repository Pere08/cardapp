import React from 'react';

type Props = {
    filters: {
        country: string[],
        version: string[],
        text: string
    }
    setFilters: any,
    filter: string,
    styles: string
}

const FilterByInput = ({filters, setFilters, filter, styles}: Props): JSX.Element => {

    const handleFilter = (value: string) => {
        setFilters({
            ...filters,
            [filter]: value
          })
    }

    return (
        <input placeholder='    Search' className={styles} type='text' onChange={({target: {value}}) => handleFilter(value)}>
        </input>
    )
}

export default FilterByInput
