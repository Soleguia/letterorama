import './App.css';
import {useEffect, useState} from 'react';
import iconBook from './images/book.svg';

function App() {
  const [book, setBook] = useState('./data/words.json');
  const [letterBook, setLetterBook] = useState([]);
  const [letterPoolSize, setLetterPoolSize] = useState(25);
  const [letterPool, setLetterPool] = useState(Array(letterPoolSize));

  useEffect(() => {
    if(book){
      fetch(book)
      .then((response) => response.json())
      .then(
        (words) => {
          let bookContents = [];
          words.map(word => {
            const letters = word.word.split('');
            bookContents.push(...letters);
          })
          bookContents = bookContents.sort((a, b) => 0.5 - Math.random());
          setLetterBook([...bookContents]);
        }
      );
    }
  }, [book]);

  useEffect(() => {
    const dropLetterInterval = setInterval(() => {
      console.log({letterBook})
      if (letterBook.length > 0) {
        console.log(1, {letterPool});
        const letter = letterBook.shift();
        console.log({letter});
        const firstEmpty = letterPool.findIndex(ltr => !ltr);
        console.log({firstEmpty});
        if (firstEmpty >= 0) {
          letterPool[firstEmpty] = letter;
          console.log(2, {letterPool});
          setLetterPool([...letterPool]);
        }
      } else {
        clearInterval(dropLetterInterval);
        setBook('');
      }

    }, 200);
  }, [letterBook]);

  return (
    <div className="App">
      <div className='lor-container'>
        <header className="lor-header">
          <h1>Letter-o-rama</h1>
        </header>
        <section className="lor-generator">
          <figure className="lor-generator__book">
            <img src={iconBook} alt="Letters" />
          </figure>
          <div className="lor-generator__pool">
            {
              letterPool.map((ltr, i) => {
                return<span className="lor-generator__pool__letter" key={`ltr-${i}`}>{ltr}</span>;
              })
            }
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
