import { useState } from 'react'
import './App.css'
import { UrlInput } from './components/UrlInput';
import { sendRequest } from './RequestUtil';

function App() {

  const [shortUrl, setShortUrl] = useState("");

  async function callShortenUrl(inputValue) {
    try {
      const response = await sendRequest("/shorten", { longUrl: inputValue, shortUrl: null });
      const responseData = JSON.parse(response);
      if (responseData && responseData.shortUrl) {
        setShortUrl(responseData.shortUrl);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <>
      <section>
        <UrlInput shortenUrl={callShortenUrl} />
      </section>
      <section>
        {shortUrl ? <span>Shortened URL: <a href={shortUrl}>{shortUrl}</a></span> : null}
      </section>
    </>
  )
}

export default App
