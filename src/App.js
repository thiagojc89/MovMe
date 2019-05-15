import React from 'react';
import './App.css';
import Header from './Components/header'
import MainContainer from './Components/mainContainer'
import User from './Components/user'
import Register from './Components/register'
import Group from './Components/group'
import Footer from './Components/footer'
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      movies:[],
      logged:false,
      userName: ''
    }
  }
  componentDidMount(){

    this.getMovies(2);

  }
  login = (userId)=>{
    
    this.setState({
              logged: true,
              userName: userId
            })
  }
  getMovies = async (page:1)=>{

    console.log('call getMovies function');

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)

    const movies = await response.json()
    
    const list = movies.results.map((movie,i)=>{
      return (
          <div key={i} className='movieElement'>

            <img alt='' src={'https://image.tmdb.org/t/p/w154'+movie.poster_path}/>

            <div className='movieData'>
                <div>
                    <strong>title: </strong>{movie.title}
                </div>
                <div>
                    <strong>overview: </strong>{movie.overview}
                </div>
            </div>
          </div>
        )
      })

    console.log(list);

    this.setState({
      movies: [...this.state.movies, list]
    })

  }
  render(){
          // <Route exect path='/user' component={ User } />:
          // <Route exect path='/home' component={(props)=> <MainContainer movies={this.state.movies}/> }/>

    return (
      <div className="App">
        <Header login={this.login}/>
        <Switch>
          <User userLoggedId={this.state.userId}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}
export default App;
