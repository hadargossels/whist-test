import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Home.css'

export default function Home() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [invoices, setInvoices] = useState([])
    const [itemsNum, setItemsNum] = useState(0)
    const [total, setTotal] = useState(0)
    const [display, setDisplay] = useState('none')

    useEffect(() => {
        getProduct()
        getInvoice()
        setCart(JSON.parse(localStorage.getItem('cart')))
        setItemsNum(JSON.parse(localStorage.getItem('cart')).length)
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

    async function getInvoice() {
        try {
           await axios.get(`${process.env.REACT_APP_URL}/invoice/`)
           .then((response) => {
            setInvoices(response.data)
           })   
        } catch (error) {
           console.error(error);
        }
    }
    
    function buy (e) {
        let id = e.target.value
        let cart = JSON.parse(localStorage.getItem("cart")).length === 0 ? [] : JSON.parse(localStorage.getItem("cart"))
        products.forEach(element => {
            if (element.id == id) {
                cart.push(element)
            }
        });
        localStorage.setItem("cart",JSON.stringify(cart))
        setCart(cart)
        setItemsNum(cart.length)
    }

    function dropdown() {
        display === 'none' ? setDisplay('block') : setDisplay('none')
        let initialValue = 0
        let sum = cart.reduce(function (previousValue, currentValue) {
            return previousValue + parseInt(currentValue.price)
        }, initialValue)
        setTotal(sum)
    }

    function pay () {
        let id = invoices.length > 0 ? invoices[invoices.length - 1].id + 1 : 0
        let invoice = {
            id: id,
            sale: cart,
            total: total
        }
        try {
            axios.post(`${process.env.REACT_APP_URL}/invoice/`, 
            invoice
            )
            .then((response) => {console.log(response)}, (error) => {console.log('axios error ' + error)})  
        } 
        catch (error) {
            console.error(error)
        }
        setCart([])
        setTotal(0)
        setItemsNum(0)
        setDisplay('none')
        localStorage.setItem('cart', JSON.stringify([]))
        
    }

    return (
        <div>
            <div id="navbar">
                <button id="cartBtn" onClick={() => {dropdown()}}>Shopping Cart<div id="itemNum">{itemsNum}</div></button><br/>
                <div id="dropdown" style={{display: display}}>
                    
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cart.map((v, index) =>
                                <tr key={index}>
                                    <td>{v.title}</td>
                                    <td></td>
                                    <td>{v.price}$</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        <p className="bold">Total: {total}$</p>
                    
                    <button onClick={() => {pay()}} disabled={total === 0 ? true : false}>Pay</button>
                </div>
            </div>
            <div id="homeCont">
                {products.map((v, index) => 
                <div key={index} id="prodCont">
                <img id="prodImg" src={v.img} alt={v.title}/><br/>
                <div id="tableCont">
                    <table>
                        <tbody>
                        <tr>
                            <td className="bold">Title</td>
                            <td>{v.title}</td>
                        </tr>
                        <tr>
                            <td className="bold">Desc</td>
                            <td>{v.desc}</td>
                        </tr>
                        <tr>
                            <td className="bold">Price</td>
                            <td>{v.price} $</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <button id="buyBtn" value={v.id} onClick={(e) => {buy(e)}}>Buy</button>
            </div>
                )}
            </div>
            
        </div>
    )
}
