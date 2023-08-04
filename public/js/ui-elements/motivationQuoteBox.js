/**
 *
 * @param {{title: string, quote: string, translatedQuotee: string, quotee: string}} param0
 * @returns {string}
 */
const QuoteBox = ({
  title, quote, quoteeTitle, quotee,
}) => `
 <h5>${title}</h5>
 <figure class="text-center">
   <blockquote class="blockquote">
     <p>${quote}</p>
   </blockquote>
   <figcaption class="blockquote-footer">
     <cite title="${quoteeTitle}">${quotee}</cite>
   </figcaption>
 </figure>
`;

/**
*
* @param {{
*   motivationResponse: {
*     quote: string,
*     translatedQuotee: string,
*     quotee: string,
*     translatedQuote: string,
*     explanation: string
*  }
* }} param0
* @returns {string}
*/
const MotivationQuoteBox = ({ motivationResponse }) => `
 <div class="row">
  ${QuoteBox({
    title: 'Someone once said',
    quote: motivationResponse.quote,
    quoteeTitle: motivationResponse.translatedQuotee,
    quotee: motivationResponse.quotee,
  })}
 </div>
 <div class="row">
  ${QuoteBox({
    title: 'Literal Translation',
    quote: motivationResponse.translatedQuote,
    quoteeTitle: motivationResponse.translatedQuotee,
    quotee: motivationResponse.translatedQuotee,
  })}
 </div>
 <div class="row">
   <h5>Meaning</h5>
   <p>${motivationResponse.explanation}</p>
 </div>
`;

export default MotivationQuoteBox;
