import React from 'react';
import './App.css';
import Header from './Components/header'
import MainContainer from './Components/mainContainer'
import User from './Components/User'
import Register from './Components/register'
import Footer from './Components/footer'


class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      movies:[],
      logged:false,
      userId: null,
      userData:[],
      usernameLogged:null,
      users: false,
      register: false,
      movieList: true,
      token: null,
      page:null
    }
  }
  componentDidMount(){

    this.getMovies(1);

  }
  login = (userId)=>{
    
    this.setState({
              logged: true,
              userId: userId
            })
  }
  renderRegister = ()=>{
    this.setState({
              register: true,
              movieList: false
            })
  }
  showMovieList = ()=>{
    this.setState({
              movieList: true
            })
  }
  loginFromRegister= (email,password)=>{
    this.setState({
        token:{
            email: email,
            password: password
        },
        register: false
        })
  }
  getMovies = async (page:1)=>{

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)

    const movies = await response.json()
    
    const list = movies.results.map((movie,i)=>{
      return (
          <div key={i} className='movieElement'>
            <div class='movie-Poster'>
              <img alt='' src={'https://image.tmdb.org/t/p/w154'+movie.poster_path}/>
            </div>
            <br/>
            <div class='movie-Title'>
              <strong>{movie.title}</strong>
            </div>
          </div>
        )
      })

    this.setState({
      // movies: [...this.state.movies, list],
      movies: list,
      page: page
    })
  }
  getUserData = async ()=>{
  try{
  
      // to create a group we need to pass the Id of the user logged in this.props.userLoggedId
      const userData = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/'+ this.state.userId)

      const parsedResponse = await userData.json();

      this.setState({
        userData: [...this.state.userData, parsedResponse.data.group]
      })
    
    } 
    catch(err){
      console.log(err);
    }
  }
  concatUserData = (newData)=>{

  
    const allGroups = this.state.userData

    allGroups[0].push(newData.newGroup)

    this.setState({
      userData: allGroups
    })
  }
  render(){
    // console.log(this.state.token);
    return (
      <div className="App">
        {this.state.register ?
          null
          :
          <Header login={this.login} getUserData={this.getUserData} renderRegister={this.renderRegister} token={this.state.token}/>
        }
        {this.state.register? <Register showMovieList={this.showMovieList}getUserData={this.getUserData} loginFromRegister={this.loginFromRegister}/> : null}
        {this.state.logged? <User userLoggedId={this.state.userId} userData={this.state.userData} getUserData={this.getUserData} concatUserData={this.concatUserData}/>: null }
        {this.state.movieList? <MainContainer page={this.state.page}movies={this.state.movies} getMovies={this.getMovies}/> : null}
        <Footer/>
      </div>
    );
  }
}
export default App;
