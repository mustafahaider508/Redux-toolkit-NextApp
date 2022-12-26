import React, { useEffect,useState } from 'react'
import axios from 'axios';

function  Project() {
  const [file,setFile] = useState([]);

   useEffect(() => {
    axios.get("http://localhost:5000/projects/get-all-files/2").then((res) => setFile(res.data))
    },[])

    
    const downloadEmployeeData =async () => {
     const [request1, request2] = await Promise.all([
     axios({url: "http://localhost:5000/projects/get-files/2", method: 'GET', responseType: 'blob'}),
     axios.get("http://localhost:5000/projects/get-all-files/2")]);  
    console.log(request1.data)
    const href = URL.createObjectURL(request1.data);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `${request2.data[0].fileName}`); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    };
   return (
    <div>
      <button onClick={downloadEmployeeData}>{file[0]?.fileName}</button>
     	{/* <a href={} download>Download</a> */}
    </div>
  )
}

export default Project
