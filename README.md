# MovMe
MovMe  is a Social Network to connect people to talk about movies and rate them in a group decision.

# third-party API 
The Movie Database API.

# Endpoints:

* Top rated
https://api.themoviedb.org/3/movie/top_rated?api_key='API-KEY'&language=en-US&page=1

* Movie Detail
https://api.themoviedb.org/3/movie/200?api_key='API-KEY'&language=en-US
 
## Route

| Method | Path | Action|
|--------|------|-------|
| GET | /auth/login | Login a user into the website |
| POST | /auth/register | Sign in a new user |
| GET | /movies | Show Movie List |
| GET | /movies/{movie_id} | Show Movie details including reviews |
| POST | /movies/new | Add movie to DB after discussion closed |
| POST | /groups | Create a new Group |
| DELETE | /auth/{user_id} | Delete user account |
| PUT | /groups/{group_id}/{user_id}/ | Add User into a Group |
| POST | /groups/adddiscussion | Create new discussion |
| PUT | /groups/addmovie | Add a movie into the group to be discussed |
| PUT | /groups/addtexttodiscussion | Add text to a discussion |
| PUT | /groups/close | Update to discussion, status = CLOSED |
| PUT | /groups/grade/{discussion_id} | Answer the questions and select a rate |





# User story
1. Home Page will provide a login and sign-up option.
2. In the home page the user it should be able to see the latest non-spoilers reviews.
3. The home page would have links to navigate to the other pages link (movies, about, groups)
4. When the user clicks on the movie to see the whole description it should see a popup or alert telling them that he is just about to enter into an area that can contain spoilers. 
5. On the sidebar container it should show suggestions of movies with a low number of rating.
6. After login or sign up the user should have the ability to perform these actions:
   * Create a group
   * Add a user inside the group
   * Add a movie to discuss
   * Close discussion (A discussion can only be closed after the group rate the movie with the same grade).
   * Only the user who created the group can close the discussion 
   * When closing a discussion the user would have to fill a form with a few YES/NO questions like (the movie was watched more than once after been added to be discussed)
7. Every user should be able to see the groups and the discussions they are participating in.
8. When clicking on a discussion link on the user's page it should redirect to the movie discussion page.
9. on the move discussion page every user should be able to rate the movie and give his option about it.
10. the user's opinion once submitted should be attached to the chat area where other users can read it. It should work as a mural.



User Model
Username
Email
Password
Group
Movie Model
movieID
Review
Group
Rate/Form

Group Model
UserID
MovieID
Discussion
movieID
Text-Discussion


# Wireframe
https://imgur.com/a/sUm3vWS
