/**
 * getGreeting is an immediatley invoked function that returns an object interface with a .random method. Call the random method to get one of the supplied messages. The random selection is guaranteed not to repeat until all options have been used, at which point the function resets the available greetings.
 */
const getGreeting = ( () => {
    const allMessages = [
      "Hello",
      "Sup",
      "Wyd",
      "Hi",
      "Allo",
      "Haii",
      "Waddup",
      "Greetings",
    ];
    let messageCopies = [...allMessages];
  
    const pub = {};
  
    pub.random = () => {
      const getrandomNumber = () => Math.floor(Math.random() * messageCopies.length);
      const splicedQuote = messageCopies.splice(getrandomNumber(), 1);
      if (messageCopies.length === 0) {
        messageCopies = [...allMessages];
      }
      // console.log('original length: ', allMessages.length, 'copies length: ', messageCopies.length);
      return splicedQuote;
    };
  
    return pub;
  })();

  export default getGreeting;