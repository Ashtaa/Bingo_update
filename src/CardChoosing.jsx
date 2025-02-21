import React, { useState } from 'react'
import One from './Cards/One'
import Two from './Cards/Two'
import Three from './Cards/Three'
import Four from './Cards/Four'
import Five from './Cards/Five'
import Six from './Cards/Six'
import Seven from './Cards/Seven'
import Eight from './Cards/Eight'
import Nine from './Cards/Nine'
import Ten from './Cards/Ten'


function CardChoosing() {

    const[selectedcard,setselectedcard]=useState(1)

  return (
    <div>
    <div>
    <button onClick={()=>setselectedcard(1)}>
        1
    </button>
    <button onClick={()=>setselectedcard(2)}>
        2
    </button>
    <button onClick={()=>setselectedcard(3)}>
        3
    </button>
    <button onClick={()=>setselectedcard(4)}>
        4
    </button>
    <button onClick={()=>setselectedcard(5)}>
       5
    </button>
    <button onClick={()=>setselectedcard(6)}>
        6
    </button>
    <button onClick={()=>setselectedcard(7)}>
       7
    </button>
    <button onClick={()=>setselectedcard(8)}>
        8
    </button>
    <button onClick={()=>setselectedcard(9)}>
        9
    </button>
    <button onClick={()=>setselectedcard(10)}>
        10
    </button>
    
    </div>
   
        {selectedcard === 1 && <One />}
        {selectedcard === 2 && <Two />}
        {selectedcard === 3 && <Three />}
        {selectedcard === 4 && <Four />}
        {selectedcard === 5 && <Five />}
        {selectedcard === 6 && <Six />}
        {selectedcard === 7 && <Seven />}
        {selectedcard === 8 && <Eight />}
        {selectedcard === 9 && <Nine />}
        {selectedcard === 10 && <Ten />}


    
    </div>
  )
}

export default CardChoosing
