import {useEffect, useState, useRef} from "react";
import axios from "axios";
import InputBox from "./components/InputBox.js"

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [loadedData, setLoadedData] = useState("fetching data...");
  const [jsonData, setJsonData] = useState([
    
  ]
  );
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const updateResume = (prop) => {
    setResume(prop);
  }
  const updateJob = (prop) => {
    setJobDescription(prop);
  }

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

      <button onClick = {() => fetchData()} disabled={isLoading}>Run Web Scraping</button>

      <button onClick = {() => console.log(resume + "\n" + jobDescription)}>Log content</button>
      {/* input existing resume, optional sample cover letter? company details. */}
      <br></br>

      <p>Paste resume here:</p>

      <InputBox func={updateResume}></InputBox>

      <p>Paste job and company details here:</p>

      <InputBox func={updateJob}></InputBox>
    
      <p hidden={firstClick}>loaded data goes here</p>
      <div>{JSON.stringify(jsonData)}</div>
      <br></br>
      <br></br>
      {
        jsonData.map((item) => {
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
