import {useState} from "react"
import explorer from "./Data/data";
import Folder from "./Component/Folder";


function FileExplorer (){

  const [explorerData,setexplorerData] = useState(explorer);
  console.log(explorerData);
  
  return(
         <div>
         <Folder data = {explorerData}/>
         </div>

  )}

export default FileExplorer;
