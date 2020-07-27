const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');



//get quote from api
async function getQuote(){
    const proxyUrl = "https://shrouded-sea-82269.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author is blank then add unknown as default
        if (data.quoteAuthor === ''){
            authorText.innerText = "unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        //reduce fontsize for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

       

    } catch (error) {
        getQuote();
        
       
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuotebtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuote();