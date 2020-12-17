import dotenv from "dotenv";
import twilio from "twilio";
import fetch from "node-fetch";
dotenv.config();

const { ACCOUNT_SID, AUTH_TOKEN, GOOGLE_API_KEY, CX } = process.env;

twilio(ACCOUNT_SID, AUTH_TOKEN);
const { MessagingResponse } = twilio.twiml;

const RetoBot = (req, res) => {
  const twiml = new MessagingResponse();
  const q = req.body.Body;

  fetch(
    `https://customsearch.googleapis.com/customsearch/v1?cx=${CX}&q=${q}&key=${GOOGLE_API_KEY}`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .then((data) => {
      const firstResult = data.items[0];
      const searchData = firstResult.snippet;
      const link = firstResult.link;

      twiml.message(`${searchData} ${link}`);

      return res.status(200).send(twiml.toString());
    })
    .catch((error) => {
      twiml.message("RetoBot is under maintenance now. Please bear with Reto!");
    });

  res.set("Content-Type", "text/xml");
};

export default RetoBot;
