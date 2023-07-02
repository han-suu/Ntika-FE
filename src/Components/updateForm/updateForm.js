import {useState} from 'react'
import Axios from 'axios'
const TagForm = (props)=>{
    const [input, setInput] = useState("")

    const mengInput = (e)=>{
        setInput(e.target.value)
        console.log(input)
    }

    const mengSubmit = (e)=>{
        e.preventDefault()
        Axios.post('http://127.0.0.1:8080/v1/tag', {
            Tag: input
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
        setInput("")
    }

    return(
        <div>
            <form className="TagForm" onSubmit={mengSubmit}>
                <input value={input}type="text" placeholder="TAGNAME" onChange={mengInput}/>
                <button type="submit">ADD</button>
            </form>
            
        </div>
    )
}

export default TagForm