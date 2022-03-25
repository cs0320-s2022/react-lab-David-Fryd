import React from 'react';
import axios from 'axios';
import TextBox from './TextBox';
import { useState } from 'react';

// Must ts-ignore because AwesomeButton not currently compatible with TS

// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// Thank you Stew for this idea instead of using a = useState<string[]>([""])
type Horoscope = {
    horoscope: string[]
} | null

function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");
    const [calculatedHoroscope, setHoroscope] = useState<Horoscope>(null)

    // NOTE: Rewrote the provided promse/.then using awaits because it is cleaner and easier to understand!
    async function requestHoroscope(sun: string, moon: string, rising: string): Promise<void> {
        type HoroscopeRequest = {
            sun: string,
            moon: string,
            rising: string
        }
        const toSend: HoroscopeRequest = {sun, moon, rising}
        try{
            const response = await axios.post("http://localhost:4567/horoscope", toSend)
            setHoroscope(response.data)
            console.log("response data: " + response.data)
        } catch (e) {
            console.log("error with post: " + e)
        }
    }

  return (
    <div className="Horoscope">
      <header>
          Horoscope
      </header>
      <div id="textboxes">
        <TextBox id={"sun"} label={"Sun Sign: "} change={setSun}/>
        <TextBox id={"moon"} label={"Moon Sign: "} change={setMoon}/>
        <TextBox id={"rising"} label={"Rising Sign: "} change={setRising}/>
      </div>
      <div id="buttonsection">
          <AwesomeButton
          onPress = {
              () => {
                  requestHoroscope(sun, moon, rising)
              }
          }
          >
              Get Horoscope Data</AwesomeButton>
      </div>
      <div id="response_horoscope">
        {calculatedHoroscope == null ? "":
            calculatedHoroscope.horoscope.map((attr: string) => <p>{attr}</p>)}
      </div>
      <br></br>
    </div>
  );
}

export default Horoscope;
