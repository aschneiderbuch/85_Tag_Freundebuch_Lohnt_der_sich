



import React from 'react'

export const FreundeItem = ( { item } ) => {
  return (
    <section className='freundeItem'>
        <h2>{item.vorname}</h2>
        <p>{item.nachname  }</p>
        <p>{item.geburtstag}</p>
        <p>{item.handynummer}</p>
        <p>{item.e_Mail_Adresse}</p>
        <p>{item.beruf}</p>
        <p>{item.verdienst}</p>
        <p>{item.selbststaendig}</p>
        <p>{item.war_schon_Kunde}</p>
    </section>
  )
}
