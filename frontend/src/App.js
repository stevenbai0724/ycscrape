import {useEffect, useState, useRef} from "react";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log("clicked button");
      const res = await axios.get("http://localhost:5000/scrape");
      const data = await res.data;

      console.log(data);
      setIsLoading(false);
    } catch (err) { 
      console.log(err);
    }
  }
  return (
    <div>

      <button onClick = {() => fetchData()} disabled={isLoading}>Click me</button>
      
    </div>
  );
}

export default App;
