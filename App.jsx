import * as React from 'react';
import { render } from 'react-dom';
import styles from './Card.module.css';

// Card component , tar props som parameter, onclick kopplas till handlecardchoice från props/ hantera spellogiken
function Card(props) {
  return (
    <div>
      {/* Memory card image */}
      <img src={props.src} alt="A memory card" className={props.flipped ? styles.cardImg : styles.imgHidden} onClick={props.handleCardChoice} />
      {/* Memory card front side */}
      <div id={props.id} className={props.flipped ? styles.imgHidden : styles.cardFront} onClick={props.handleCardChoice}></div>
    </div>
  )
}


// App component
function App() {
  const images = [
    { src: '/images/card-1.png' },
    { src: '/images/card-2.png' },
    { src: '/images/card-3.png' },
    { src: '/images/card-4.png' },
  ];
//användas för att hålla reda på korten som visas i spelet.
  const [cards, setCards] = React.useState([]);
  //för att lagra det första kortet som spelaren vänder upp.
  const [cardOne, setCardOne] = React.useState(null);
  const [cardTwo, setCardTwo] = React.useState(null);

  // useEffect hook to handle card matching
  React.useEffect(() => {
    console.log("UseEffect triggered");
 //om cardOne är lika med cardTwo
    if (cardOne === cardTwo) {
      console.log("You picked two identical cards!");
    }

    console.log("Card one ", cardOne);
    console.log("Card two ", cardTwo);
  }, [cardOne, cardTwo]);

  // Function to handle card selection/ för att hantera valet av ett kort i spelet. parseFloat för konverter till numeriskt värde
  const handleCardChoice = (event) => {
    
    const id = parseFloat(event.target.id);

    cardOne ? setCardTwo(id) : setCardOne(id);
  }

  //  initiateCardsArray för att skapa en array med kort för spelet. Den duplicerar och blandar korten från images-arrayen, tilldelar slumpmässiga ID och markerar varje kort som omatchat. 
    const doubled = [...images, ...images];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    const memoryCards = shuffled.map(card => {
      return { ...card, id: Math.random(), matched: false };
    });

  //uppdateras tillståndsvariabeln cards med den skapade kortarrayen.
  const initiateCardsArray = () => {
    setCards(memoryCards);
  }

  return (
    <div className="App">
      <div className={styles.wrapper}>
        {/* New Game button */}
        <button className={styles.button} onClick={initiateCardsArray}>New Game</button>
        {/* Cards wrapper */}
        <div className={styles.cardsWrapper}>
          //map-funktion som loopar över elementen i cards-arrayen.
          {cards.map(card => {
            return (
              <Card
                key={card.id}
                handleCardChoice={handleCardChoice}
                id={card.id}
                src={card.src}
                flipped={card.id === cardOne || card.id === cardTwo ? true : false}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App;


