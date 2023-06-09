import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import Card from '@/components/Card'
import FilterByOptions from '@/components/FilterByOptions'
import FilterByInput from '@/components/FilterByInput'
import { cards } from './api/mockData'
import styles from '@/styles/index.module.css'
import { filterType, cardType } from '@/types/types'
import { filtersByOptions } from '@/types/enums'


const getValues = (arr: cardType[], value: filterType) => arr.reduce((accumulator: cardType[], currentValue: cardType) => {
  if (!accumulator.some(obj => obj[value] === currentValue[value])) {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);

function filter(cardList: cardType[], property: filterType, filterList: string[]) {
  if(filterList.length > 0){
    return cardList.filter((card: any) => filterList.includes(card[property]));
  }
  return cardList
}


export default function Home() {

  const filterElements: filterType[] = [filtersByOptions.COUNTRY, filtersByOptions.VERSION];

  const [documents, setDocuments] = useState(cards);
  const [filters, setFilters] = useState({
    country: [],
    version: [],
    text: ''
  })

  const handleClose = (key: filterType, value: string) => {
    setFilters({
      ...filters,
      [key]: filters[key].filter((e: any) => e !== value)
    })
  }


  useEffect(() => {
    const countryFilter = filter(cards, filtersByOptions.COUNTRY, filters.country) ?? []
    const versionFilter = filter(cards, filtersByOptions.VERSION, filters.version) ?? []
    const intersection = countryFilter.filter((country: cardType) => versionFilter.includes(country)) ?? []
    const finalFilter = intersection.filter((card: cardType) => card.text.includes(filters.text)) ?? []
    setDocuments(finalFilter);
  }, [filters])

  return (
    <>
      <Head>
        <title>Telefonica filter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Card App</h1>
          <div className={styles.filters}>
            {
              filterElements.map((filter: filterType, index: number) => (
                <FilterByOptions
                styles={styles.filter_son}
                key={index}
                filters={filters}
                setFilters={setFilters}
                values={getValues(cards, filter)}
                filter={filter}
                />
              ))
            }
            <FilterByInput
            styles={styles.filter_son}
            filters={filters}
            setFilters={setFilters}
            filter={'text'}
            />
          </div>
          
          <div>
            {
              filterElements.map((key: filterType, index) => (
                <div className={styles.buttonGroup} key={index}>
                  {
                    filters[key].map((value: string) => (
                      <>
                        <div className={styles.deleteButton}>
                          {value}
                          <button className={styles.deleteIcon} onClick={() => handleClose(key, value)}>X</button>
                        </div>
                      </>
                    ))
                  }
                </div>
              ))
            }
          </div>
          
          <div className={styles.text}>
          {
            documents.map(({title, country, version, text}, index) => (
              <Card
              key={index}
              title={title}
              country={country}
              version={version}
              text={text}
              styles={styles.card}
              />
            ))
          }
          </div>
      </main>
    </>
  )
}
