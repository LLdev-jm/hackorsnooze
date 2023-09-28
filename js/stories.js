"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const $submitButton = $('#submit-button');

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
  $submitForm.hide();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();


  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  await putOwnOnPage();
}

$myStories.on("click", ".trash-can", deleteStory);

async function submitStory(){
  console.debug('submitStory')
  const title = document.getElementById('create-title').value; 
  const author = document.getElementById('create-author').value;
  const url = document.getElementById('create-url').value;
  
  console.log({title, author, url});
  let newStory = await storyList.addStory(currentUser, {title, author, url});
  console.log(newStory);

  await putStoriesOnPage()
  $submitForm.hide();
  pageRefresh();
};

$submitButton.on('click', submitStory);

function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}


function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoritedStories.empty();

  if(currentUser.favorites.length === 0){
    $favoritedStories.append("<h5>No Stories Added</h5>")
  }else{
    for(let story of currentUser.favorites){
      const $favoriteStory = generateStoryMarkup(story);
      $favoritedStories.append($favoriteStory);
    }
  }

  // $favoritedStories.show();
  // hidePageComponents();
}

function putOwnOnPage() {
  console.debug("putOwnOnPage");

  $myStories.empty();

  if(currentUser.ownStories.length === 0){
    $myStories.append("<h5>No Stories Added</h5>")
  }else{
    for(let story of currentUser.ownStories){
      const $myStory = generateStoryMarkup(story, true);
      $myStories.append($myStory);
    }
  }

  // $myStories.show();
  // hide
}