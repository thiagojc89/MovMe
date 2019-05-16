import React from 'react';
import './App.css';
import Header from './Components/header'
import MainContainer from './Components/mainContainer'
import User from './Components/user'
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
      movieList: true
    }
  }
  componentDidMount(){

    this.getMovies(2);

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
  loginFromRegister= (username)=>{
    this.setState({
        usernameLogged: username,
                logged: true,
              register: false,  
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

    this.setState({
      movies: [...this.state.movies, list]
    })
  }
  getUserData = async ()=>{
  try{
  
      // to create a group we need to pass the Id of the user logged in this.props.userLoggedId
      const userData = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/groups/'+ this.state.userId)

      const parsedResponse = await userData.json();

      console.log(parsedResponse.data,'===============================');


      this.setState({
        userData: [...this.state.userData, parsedResponse.data.group]
      })
    
    } 
    catch(err){
      console.log(err);
    }
  }
  concatUserData = (newData)=>{

    console.log('old data=====');
    console.log(this.state.userData);
    console.log('old data=============');

    console.log('NEW data=====');
    console.log(newData.newGroup);
    console.log('NEW data=============');

    const allGroups = this.state.userData

    allGroups[0].push(newData.newGroup)
    console.log('allGroups========');
    console.log(allGroups);
    this.setState({
      userData: allGroups
    })
  }
  render(){


    console.log('render APP');
    console.log(this.state.usernameLogged);

    return (
      <div className="App">
      {
        this.state.usernameLogged?
          <Header usernameLogged={this.state.usernameLogged}login={this.login} getUserData={this.getUserData} renderRegister={this.renderRegister}/>
        :
          <Header login={this.login} getUserData={this.getUserData} renderRegister={this.renderRegister}/>
      }
        {this.state.register? <Register showMovieList={this.showMovieList}getUserData={this.getUserData} loginFromRegister={this.loginFromRegister}/> : null}
        {this.state.logged? <User usernameLogged={this.usernameLogged} userLoggedId={this.state.userId} userData={this.state.userData} getUserData={this.getUserData} concatUserData={this.concatUserData}/>: null }
        {this.state.movieList? <MainContainer movies={this.state.movies}/> : null}
        <Footer/>
      </div>
    );
  }
}
export default App;
