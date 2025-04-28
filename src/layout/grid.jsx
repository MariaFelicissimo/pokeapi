import React from 'react';
import Card from '../components/card';

export default class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    this.props.next();
  }

  render() {
    return (
      <div className='grid'>
        <div className='grid__pokemon'>
          {
            this.props.pokemons.map(poke => (
              <div key={poke.name} style={{ position: 'relative' }}>
                {/* Botão de Favoritar */}
                <button
                  className="favorite-button"
                  onClick={() => this.props.onToggleFavorite(poke)}
                >
                  {this.props.favorites.find(fav => fav.id === poke.id) ? '★' : '☆'}
                </button>

                {/* Card do Pokémon */}
                <Card pokemon={poke} />
              </div>
            ))
          }
        </div>
        {
          (this.props.pokemons.length >= 20) &&
          <div className="grid__wrapper-button">
            <button className='grid__button' type='button' onClick={this.handleButton}>Show more</button>
          </div>
        }
      </div>
    );
  }
}
