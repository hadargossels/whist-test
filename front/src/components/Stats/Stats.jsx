import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Stats.css'

export default function Stats() {
    const [past5, setPast5] = useState([])
    const [top5, setTop5] = useState([])

    useEffect(() => {
       getInvoice()    
       
    }, [])

    async function getInvoice() {
        try {
           await axios.get(`${process.env.REACT_APP_URL}/invoice/`)
           .then((response) => {
               past5days(response.data)
               top5sales(response.data)               
           })  
        } catch (error) {
           console.error(error);
        }
    }

    function past5days (invoiceList) {
        let day5 = new Date();
        let day4 = new Date();
        let day3 = new Date();
        let day2 = new Date();
        let day1 = new Date();

        day5.setDate(day5.getDate())
        day4.setDate(day5.getDate() - 1);
        day3.setDate(day5.getDate() - 2);
        day2.setDate(day5.getDate() - 3);
        day1.setDate(day5.getDate() - 4);

        let datesArr = [
            {date: day5.toISOString().substring(0,10), total: 0},
            {date: day4.toISOString().substring(0,10), total: 0},
            {date: day3.toISOString().substring(0,10), total: 0},
            {date: day2.toISOString().substring(0,10), total: 0},
            {date: day1.toISOString().substring(0,10), total: 0},]

        let day5Arr = invoiceList.filter((invoice) => {return invoice.createdAt.substring(0,10) === day5.toISOString().substring(0,10)})
        let day4Arr = invoiceList.filter((invoice) => {return invoice.createdAt.substring(0,10) === day4.toISOString().substring(0,10)})
        let day3Arr = invoiceList.filter((invoice) => {return invoice.createdAt.substring(0,10) === day3.toISOString().substring(0,10)})
        let day2Arr = invoiceList.filter((invoice) => {return invoice.createdAt.substring(0,10) === day2.toISOString().substring(0,10)})
        let day1Arr = invoiceList.filter((invoice) => {return invoice.createdAt.substring(0,10) === day1.toISOString().substring(0,10)})

        let arrays = [day5Arr, day4Arr, day3Arr, day2Arr, day1Arr]
        
        for (let index = 0; index < arrays.length; index++) {
           let total = getTotal(arrays[index])
           datesArr[index].total = total                        
        }

        setPast5(datesArr)
    }

    function getTotal(array) {
        let total = 0
        array.forEach(element => {
            total = total + element.total || 0
        });
        return total
    }

    function top5sales (invoiceList) {
        let array = []
        let count = []

        for (let i = 0; i < invoiceList.length; i++) {
            for (let j = 0; j < invoiceList[i].sale.length; j++) {
                array.push(invoiceList[i].sale[j])
            }            
        }

        function compare( a, b ) {
            if ( a.id < b.id ){
              return -1;
            }
            if ( a.id > b.id ){
              return 1;
            }
            return 0;
          }

        array.sort(compare);
    
        var current = null;
        var cnt = 0;
        let title = ""
        for (var i = 0; i < array.length; i++) {
            title = array[i].title
            if (array[i].id != current) {
                if (cnt > 0) {
                    count.push({itemId: current, count: cnt, title: title})
                }
                current = array[i].id;
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            count.push({itemId: current, count: cnt, title: title})
        }

        function compareCount( a, b ) {
            if ( a.count > b.count ){
              return -1;
            }
            if ( a.count < b.count ){
              return 1;
            }
            return 0;
          }

        count.sort(compareCount)
        count.splice(5)
        setTop5(count)
    }




    return (
        <div>
            <h1>Stats</h1>
            <div id="statCont">
                <div className="statDiv">
                    <h2>Top 5 Sales</h2>
                    <div className="statTableDiv">
                    <table className="statTable">
                            <thead>
                                <th>Name</th>
                                <th>Quantity</th>
                            </thead>
                            <tbody>
                            {top5.map((v, index) => 
                                <tr key={index}>
                                    <td>{v.title}</td>
                                    <td>{v.count}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="statDiv">
                    <h2>Top 5 Unique Sales</h2>
                    <div className="statTableDiv">
                    <table className="statTable">
                            <thead>
                                <th>Name</th>
                                <th>Quantity</th>
                            </thead>
                            <tbody>
                            {top5.map((v, index) => 
                                <tr key={index}>
                                    <td>{v.title}</td>
                                    <td>{v.count}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="statDiv">
                    <h2>Past 5 Days $</h2>
                    <div className="statTableDiv">
                        <table className="statTable">
                            <thead>
                                <th>Date</th>
                                <th>Total</th>
                            </thead>
                            <tbody>
                            {past5.map((v, index) => 
                                <tr key={index}>
                                    <td>{v.date}</td>
                                    <td>{v.total}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
