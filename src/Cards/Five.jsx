import React from 'react'
import bingoData from '../Data/BingoData'
import  { useState } from 'react'



function Five() {
    const gridone = bingoData.numbers.five
    const letters = bingoData.letters

    
       const [markedNumbers, setMarkedNumbers] = useState([]); 
    
       const handleClick = (num) => {
          setMarkedNumbers((prev) => 
             prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
          );
       };
       const isMarked = (num) => markedNumbers.includes(num);
    
   return (
     <div>
      <table>
         <thead>
             {letters.map((letter,index)=>
             <th key={index}>{letter}</th>
             )}
         </thead>
      <tbody>
         {gridone.map((row,rowindex)=>
             <tr key={rowindex}>
               {row.map((num,colindex)=>(
                 <td key={colindex}
                 onClick={() => handleClick(num)} 
                 className={`${isMarked(num) ? 'isMarked' : 'notmarke'}`}    
                 >{num}</td>
               ))}
             </tr>
         )}
       </tbody>
      </table>
     </div>
  )
}

export default Five
