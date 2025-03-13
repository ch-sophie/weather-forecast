 import Weather from "./Weather";

 function Header() {
   return (
     <header>
       <h1>Weather App</h1>
     </header>
   );
 }

function App() {
  return (
    <header>
      <Header />
      <Weather />
    </header>
  )
}

export default App;