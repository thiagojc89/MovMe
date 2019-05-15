import React from 'react';
import './App.css';
import Header from './Components/header'
import MainContainer from './Components/mainContainer'
import User from './Components/User'
import Footer from './Components/footer'
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      movies:[],
      logged:false
    }
  }
  componentDidMount(){

    this.getMovies(2);

  }
  login = ()=>{
    
    this.setState({
              logged: true
            })
  }
  getMovies = async (page:1)=>{

    console.log(process.env)

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
    // this.props.history.push('/')
    // <Route exact path="/murals/home" render={(props) => <MuralContainer {...props} murals={this.state.murals} />} />
    // <Route exact path="/users/user/login" component={ Login } />
    // this.getMovies()
    return (
      <div className="App">
        <Header login={this.login}/>
        <Switch>
          <Route exect path='/' component={(props)=> <MainContainer movies={this.state.movies}/> }/>
          <Route path='/user' component={ User } />:
        </Switch>
        <Footer/>
      </div>
    );
  }
}
export default App;
