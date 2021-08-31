import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import './Admin.css'

export default function Admin() {
    const [products, setProducts] = useState([])
    const [currentProd, setCurrentProd] = useState([])
    const [display, setDisplay] = useState('none')
    const [method, setMethod] = useState('')
    const titleRef = useRef("")
    const descRef = useRef("")
    const priceRef = useRef("")
    const imgRef = useRef("")

    useEffect(() => {
        getProduct()
    }, [])

    async function getProduct() {
        try {
           await axios.get(`${process.env.REACT_APP_URL}/product/`)
           .then((response) => {
            setProducts(response.data)
           })   
        } catch (error) {
           console.error(error);
        }
        }
    
    function modal(e) {
        let productId = e.target.value
        let current = products.filter((product) => {return product.id == productId})

        setMethod('edit')
        setDisplay('block')
        setCurrentProd(current)
    }

    function close() {
        setDisplay('none')
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (method === 'edit') {
            let id = e.target.id

            try {
                axios.put(`${process.env.REACT_APP_URL}/product/${id}`, 
                {
                id: id,
                title: titleRef.current.value,
                desc: descRef.current.value,
                price: priceRef.current.value,
                img: imgRef.current.value
                }
                )
                .then((response) => {}, (error) => {console.log('axios error ' + error)})  
            } 
            catch (error) {
                console.error(error)
            }
        }
        else if (method === 'add') {
            let id = products[products.length - 1].id + 1
            let product = {
                id: id,
                title: titleRef.current.value,
                desc: descRef.current.value,
                price: priceRef.current.value,
                img: imgRef.current.value
            }

            try {
                axios.post(`${process.env.REACT_APP_URL}/product/`, 
                product
                )
                .then((response) => {}, (error) => {console.log('axios error ' + error)})  
            } 
            catch (error) {
                console.error(error)
            }
            
            setCurrentProd([])
            setProducts([...products, product])
        }
               
        close()
    }

    function del (e) {
        let id = e.target.value

        try {
            axios.delete(`${process.env.REACT_APP_URL}/product/${id}`)
            .then(() => {
                let newProducts = products.filter((product) => {return product.id != id})
                setProducts(newProducts)
            })   
         } catch (error) {
            console.error(error);
         }

    }

    function addItem (e) {
        setCurrentProd([{
            title: "",
            price: "", 
            desc: "",
            img: ""
        }])

        setMethod('add')
        setDisplay('block')
    }

    return (
        <div>
            <h1 id="adminHead">Admin</h1><br/>
            <button className="optionBtn" id="addBtn" onClick={(e) => {addItem(e)}}>Add <i class="fas fa-plus"></i></button>
            <div id="adminTableCont">
                <table id="adminTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((v, index) => 
                        <tr key={index}>
                            <td className="td">{v.title}</td>
                            <td className="td">{v.price}</td>
                            <td className="td">
                                <button className="optionBtn" onClick={(e)=>{modal(e)}} value={v.id}>Edit</button>
                                <button className="optionBtn" onClick={(e)=>{del(e)}} value={v.id}>Delete</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div id="modalBackground" style={{display: display}}>
            <button id="close" onClick={() => {close()}}><i class="fas fa-times"></i></button> 
                <div id="modalContent">
                                       
                        {currentProd.map((v,index) =>
                        <form key={index} id={v.id} onSubmit={(e) => {handleSubmit(e)}} id="modalForm">
                            <label htmlFor="title" className="lable">Title: </label><br/><br/>
                            <input className="input" type="text" name="title" id="title" ref={titleRef} defaultValue={v.title}/><br/><br/>
                            <label htmlFor="desc" className="lable">Description: </label><br/><br/>
                            <textarea name="desc" id="desc" cols="30" rows="5" defaultValue={v.desc} ref={descRef}></textarea><br/><br/>
                            <label htmlFor="price" className="lable">Price: </label><br/><br/>
                            <input className="input" type="text" name="price" id="price" defaultValue={v.price} ref={priceRef}/><br/><br/>
                            <label htmlFor="image" className="lable">Image: </label><br/><br/>
                            <input className="input" type="text" name="image" id="image" defaultValue={v.img} ref={imgRef}/><br/><br/>
                            <button className="optionBtn" type="submit">Submit</button>
                        </form>
                            )}
                        
                </div>
            </div>
        </div>
    )
}
