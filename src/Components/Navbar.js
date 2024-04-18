import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import FloatingButton from './FloatingButton';
import Card from './Card';

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0(); // Destructure auth-related functions

  const getLocalItems = () => {
    let notes = localStorage.getItem('Notes');
    return notes ? JSON.parse(notes) : [];
  };

  const [cards, setCards] = useState(getLocalItems());
  const [searchQuery, setSearchQuery] = useState('');

  const addCard = ({ title, description, mediaLink }) => {
    const newCard = { id: Math.random(), title, description, mediaLink, timestamp: new Date() };
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(cards));
  }, [cards]);

  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem('Notes', JSON.stringify(updatedCards));
  };

  const filteredAndSortedCards = cards
    .filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div>
      <div className='Navbar'>
        <h1 className='text'>NoteTaking Application</h1>
        <div className='login-container'>
          {isAuthenticated ? (
            <div className='user-info'>
             
              <button onClick={() => loginWithRedirect()}>Log Out</button>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          )}
        </div>
        <FloatingButton onAddCard={addCard} />
      </div>
      <input
        type='text'
        placeholder='Search by title...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-input'
      />
      <div className='center-text'>
        <h2>Please Click on the floating button to add notes</h2>
      </div>
      {filteredAndSortedCards.map((card) => (
        <Card key={card.id} {...card} onDelete={deleteCard} />
      ))}
    </div>
  );
};

export default Navbar;
