import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Home() {
const [character,setCharacter] = useState ([])
const [input, setInput] = useState({ name: '', image: '', gender: '' })
let url = "https://6823e57d65ba0580339832db.mockapi.io/post"

useEffect(()=>{

    axios.get(url)
  .then((response) =>{
    setCharacter(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

},[])


  const handlesubmit = ()=>{

    if (!input.name || !input.image || !input.gender) {
    alert("Please fill in all fields before submitting.");
    return;}

 axios.post(url,{ 
    name: input.name,
    image: input.image,
    gender: input.gender
})
 .then((response)=>{
    setCharacter(pre=> [...pre, response.data])
    setInput({name: '', image: '', gender: ''})
 })
  }
  return (
    <>
    <div className='p-4'>
        <div className='flex justify-center '>
        <div className='rounded-2xl shadow-lg w-150 h-60 flex flex-col flex-nowrap items-center p-2 pag-5 '>
            <input type='text' value={input.name} placeholder='enter character name'
           onChange={(e) => setInput(prev => ({ ...prev, name: e.target.value }))}
           className='w-100 border-1 border-sky-800 rounded-md px-2 h-10 my-2'>
            </input>
             <input type='text' value={input.image} placeholder='eneter imageUrl'
              onChange={(e) => setInput(prev => ({ ...prev, image: e.target.value }))}
              className='w-100 border-1 border-sky-800 rounded-md px-2 h-10 my-2'>
            </input>
             <input type='text' value={input.gender} placeholder='enter character gender' 
             onChange={(e) => setInput(prev => ({ ...prev, gender: e.target.value }))}
             className='w-100 border-1 border-sky-800 rounded-md px-2 h-10 my-2'>
            </input><br></br>
            <button onClick={handlesubmit} className='bg-sky-900 text-white hover:bg-sky-500 hover:text-black w-20 h-10 rounded-2xl'>
                post
            </button>
              </div>
              </div>
      {character.length > 0 && (
       <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">Characters</h2>
    {character.map((char) => (
      char.name && char.image && char.gender && ( 
        <div key={char.id} className="mb-4 border-1 border-sky-800 p-4 rounded bg-white">
          <img src={char.image} alt={char.name} className="h-32 w-32 object-cover rounded" />
          <h3 className="text-lg font-semibold">{char.name}</h3>
          <p>{char.gender}</p>
        </div>
      )
    ))}
      </div>
       )}
    </div>
    </>
  )
}

export default Home