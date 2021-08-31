import './App.css';
import Home from './components/Home/Home';
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    setLocalStorage()
  }, [])

  function setLocalStorage () {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart",JSON.stringify([]))
    }
  }
  
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
