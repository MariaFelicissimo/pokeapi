import Search from './components/search';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Grid from './layout/grid';
import Container from './layout/container';
import React from 'react';
import './App.css';

export default class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      pokemons: [],
      total: 0,
      notFound: false,
      search: [],
      searching: false,
      favorites: [],
      showingFavorites: false,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.showPokemons = this.showPokemons.bind(this);
    this.nextPokemon = this.nextPokemon.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleViewFavorites = this.toggleViewFavorites.bind(this);
  }

  async handleSearch(textSearch){
    if(!textSearch) {
      this.setState({
        search: [],
        notFound:false,
      })
      return;
    }
    
    this.setState({
      notFound: false,
      searching: true,
    })
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`);
    const data = await api.json().catch(()=> undefined);
    if(!data){
      this.setState({
        notFound: true,
      })
      return;
    } else {
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      const namePT = speciesData.names.find(name => name.language.name === "pt");
      const flavorTextPT = speciesData.flavor_text_entries.find(entry => entry.language.name === "pt");

      const dataWithPT = {
        ...data,
        name_pt: namePT ? namePT.name : data.name,
        description_pt: flavorTextPT ? flavorTextPT.flavor_text : '',
      };

      this.setState({
        search: [dataWithPT],
      });
    }
    this.setState({
      searching: false,
    })
  }

  async showPokemons(limit = 20, offset = 0){
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await api.json();
    const promises = data.results.map(async pokemon => {
      const result = await fetch(pokemon.url);
      const res = await result.json();

      const speciesRes = await fetch(res.species.url);
      const speciesData = await speciesRes.json();
      const namePT = speciesData.names.find(name => name.language.name === "pt");
      const flavorTextPT = speciesData.flavor_text_entries.find(entry => entry.language.name === "pt");

      return {
        ...res,
        name_pt: namePT ? namePT.name : res.name,
        description_pt: flavorTextPT ? flavorTextPT.flavor_text : '',
      };
    });

    const results = await Promise.all(promises);

    this.setState(prev => ({
      search: [],
      pokemons: [...prev.pokemons, ...results],
      notFound: false,
      total: prev.total + results.length,
    }));  
  }

  nextPokemon(){
    this.showPokemons(20,this.state.total);
  }

  toggleFavorite(pokemon){
    const exists = this.state.favorites.find(fav => fav.id === pokemon.id);
    if (exists) {
      this.setState(prev => ({
        favorites: prev.favorites.filter(fav => fav.id !== pokemon.id)
      }));
    } else {
      this.setState(prev => ({
        favorites: [...prev.favorites, pokemon]
      }));
    }
  }

  toggleViewFavorites(){
    this.setState(prev => ({
      showingFavorites: !prev.showingFavorites
    }));
  }

  componentDidMount(){
    if(!this.state.searching){
      this.showPokemons();
    }
  }

  render(){
    const { pokemons, search, favorites, showingFavorites } = this.state;
    const poke = search.length > 0 ? search : (showingFavorites ? favorites : pokemons);

    return (
      <>
        <Container>
          <Navbar title="PokeApi" />
          <div style={{ textAlign: 'center', margin: '1rem' }}>
            <button onClick={this.toggleViewFavorites} className="toggle-button">
              {showingFavorites ? 'Ver Todos' : 'Ver Favoritos'}
            </button>
          </div>
          <Search onHandleSearch={this.handleSearch} />
          {
            this.state.notFound ? (
              <div>'Pokémon não encontrado'</div>
            ) : (
              <Grid 
                pokemons={poke} 
                next={this.nextPokemon} 
                onToggleFavorite={this.toggleFavorite}
                favorites={favorites}
              />
            )
          }
        </Container>
        <Footer />
      </>
    );
  }
}
