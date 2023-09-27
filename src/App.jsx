import { useEffect, useState } from "react";
import "./App.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"; // Import documentToReactComponents som kan rendere vores Rich Text
import * as contentful from "contentful"; // Import contentful til at lave en client og fetche data

function App() {
  // State til at gemme data
  const [data, setData] = useState();

  // Vores contentful client med space ID og Access Token fra .env filen (husk at .env filen skal ligge ved siden af index.html, etc)
  const client = contentful.createClient({
    space: `${import.meta.env.VITE_PUBLIC_SPACE_ID}`,
    environment: "master",
    accessToken: `${import.meta.env.VITE_PUBLIC_ACCESS_TOKEN}`,
  });

  // useEffect der fetcher ved hjælp at contentful client (ellers virker images ikke)
  useEffect(() => {
    client.getEntries()
      .then((entry) => setData(entry))
      .catch(console.error);
  }, []);

  // Log Data for at kunne se vores data struktur
  console.log(data)

  return (
    <>
      <h1>Blog Fetch Example</h1>
      {data?.items.map((item, index) => {
        return (
          <article className="article" key={index}>
            <h1>{item.fields.title}</h1>
            <p>Forfatter: {item.fields.author}</p>
            <section>{documentToReactComponents(item.fields.content)}</section>
            {item.fields.image && <img src={`https:${item.fields.image.fields.file.url}`} />}
          </article>
        );
      })}
    </>
  );
}

export default App;
