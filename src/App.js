import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const DOMAIN = process.env.REACT_APP_DOMAIN;
console.log("🚀 ~ file: App.js ~ line 9 ~ DOMAIN", DOMAIN);

// const client = create(`http://${API_DOMAIN}/api/v0`);
const client = create(`https://${DOMAIN}/api/v0`);

function App() {
  const [fileUrl, updateFileUrl] = useState(``);
  async function onChange(e) {
    const file = e.target.files[0];

    try {
      const added = await client.add(file);
      const url = `https://${DOMAIN}/ipfs/${added.path}`;
      updateFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <a href={fileUrl}>{fileUrl}</a>
      <input type="file" onChange={onChange} />
      {fileUrl && <img src={fileUrl} width="600px" />}
    </div>
  );
}

export default App;
