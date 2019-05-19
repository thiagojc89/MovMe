import React from 'react';
import './App.css';
import Header from './Components/header'
import MainContainer from './Components/mainContainer'
import User from './Components/User'
import Register from './Components/register'
import Edit from './Components/edit'
import Footer from './Components/footer'


class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      movies:[],
      logged:false,
      userId: null,
      userData:null,
      userGroups:[],
      usernameLogged:null,
      user: false,
      register: false,
      edit: false,
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
              user: true,
              userId: userId
            })
  }
  renderRegister = ()=>{
    this.setState({
              register: true,
              movieList: false
            })
  }
  editAccount = ()=>{
    this.setState({
              edit: true,
              movieList: false,
              user: false
            })
  }
  showMovieList = ()=>{
    this.setState({
              movieList: true
            })
  }
  showUser = ()=>{
    this.setState({
              user: true
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
            <div className='movie-Poster'>
              <img alt='' src={'https://image.tmdb.org/t/p/w154'+movie.poster_path}/>
            </div>
            <br/>
            <div className='movie-Title'>
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
  
      const userGroups = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/'+ this.state.userId)

      const parsedResponse = await userGroups.json();

      console.log(parsedResponse);

      this.setState({
        userGroups: [...this.state.userGroups, parsedResponse.data.group],
        userData: parsedResponse.data
      })
    
    } 
    catch(err){
      console.log(err);
    }
  }
  concatUserData = (newData)=>{

  
    const allGroups = this.state.userGroups

    allGroups[0].push(newData.newGroup)

    this.setState({
      userGroups: allGroups
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
        {this.state.register? <Register showMovieList={this.showMovieList} loginFromRegister={this.loginFromRegister}/> : null}
        {this.state.edit? <Edit showMovieList={this.showMovieList} userData={this.state.userData} showUser={this.state.showUser}/> : null}
        {this.state.user? <User userLoggedId={this.state.userId} userGroups={this.state.userGroups} getUserData={this.getUserData} concatUserData={this.concatUserData} edit={this.editAccount}/>: null }
        {this.state.movieList? <MainContainer page={this.state.page}movies={this.state.movies} getMovies={this.getMovies}/> : null}
        <Footer/>
      </div>
    );
  }
}
export default App;
