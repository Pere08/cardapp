import React from 'react';

type Props = {
    title: string
    country: string
    version: string
    text: string
    styles: string
}

const Card = ({title, country, version, text, styles}: Props): JSX.Element => {
    return (
        <section className={styles}>
            <p>Title: {title}</p>
            <p>Country: {country}</p>
            <p>Versión: {version}</p>
            <p>Text: {text}</p>
        </section>
    )
}

export default Card
