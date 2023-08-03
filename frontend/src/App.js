import {useEffect, useState, useRef} from "react";
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [loadedData, setLoadedData] = useState("fetching data...");
  const [jsonData, setJsonData] = useState([
    {link: "https://stevenbai.ca", details: "steven so cool", id: 1},
    {link: "https://stevenbai.ca", details: "哇steven so cool", id: 2},
    {link: "https://stevenbai.ca", details: " steven so cool", id: 3},
    {link: "https://stevenbai.ca", details: "哇steven so cool", id: 4},
  ]
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setLoadedData("fetching data...");
      setFirstClick(false);
      const res = await axios.get("http://localhost:5000/scrape");
      const data = await res.data;

      console.log(data.info);
      setLoadedData(JSON.stringify(data));
      setJsonData(await data.info);
      console.log("JSON DATA:", jsonData);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>

      <button onClick = {() => fetchData()} disabled={isLoading}>Click me</button>
      <br></br>
      <p hidden={firstClick}>loaded data goes here</p>
      <div>{JSON.stringify(jsonData)}</div>
      <br></br>
      <br></br>
      {
        jsonData.map((item) => {
          console.log("item");
          return <div key={item.id}>
            <p>{item.link}</p>
            <p>{item.details}</p>
          </div>
        })
      }

    </div>
    
  );
}
  
export default App;
