



// rafc
import React, { useEffect, useRef, useState } from 'react'
import { FreundeItem } from './FreundeItem'

export const ShowFreunde = () => {
    // fetch die Freunde liste aus MongoDB holen

    const [freunde, setFreunde] = useState([])
    const freundeRef = useRef([]) // ! [ ]  damit array drin gespeichert werden kann

    const url = process.env.REACT_APP_BACKEND + process.env.REACT_APP_API_VERSION

    // wegen db fetch async
    useEffect(() => {
        const fetchFreunde = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/v1/getFreundeValid')
                const data = await response.json()
                //console.log(data)

                setFreunde(data)                   // ! löst neu render aus
                freundeRef.current = data         // ! löst kein neu render aus
                console.log(freundeRef.current)
            } catch (err) {
                console.log(err)
            }
        }
        fetchFreunde()

    }, [setFreunde])



    return (
        <section className='showFreunde'>

            <h1>ShowFreunde</h1>

            {/* // ! key oder uuid  */}
            {freunde.map((item, key) =>
                <FreundeItem
                    key={key}
                    item={item}
                ></FreundeItem>)}

        </section>
    )
}
