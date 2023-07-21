import {useEffect, useState, useRef} from "react";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [loadedData, setLoadedData] = useState("fetching data...");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setLoadedData("fetching data...");
      setFirstClick(false);
      console.log("clicked button");
      const res = await axios.get("http://localhost:5000/scrape");
      const data = await res.data;

      console.log(data);
      setLoadedData(JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>

      <button onClick = {() => fetchData()} disabled={isLoading}>Click me</button>
      <br></br>
      <p hidden={firstClick}>{loadedData}</p>

    </div>
    
  );
}
  
export default App;
