"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $submitForm.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $submitForm.hide();
}


//when user clicks nav submit, hides story page and show new story submit form
function navSubmitClick(evt){
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $submitForm.show();
  putStoriesOnPage();
  
}

$body.on('click','#nav-submit', navSubmitClick)

function navFavoritesClick(evt){
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  $favoritedStories.show();
  $submitForm.hide();
  $myStories.hide();

  putFavoritesOnPage();
}

$body.on('click','#nav-favorite', navFavoritesClick)

function navMyStoriesClick(evt){
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  $myStories.show();
  $favoritedStories.hide();
  $submitForm.hide();

putOwnOnPage();

}

$body.on('click','#nav-my-stories', navMyStoriesClick)