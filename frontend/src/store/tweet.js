// constant to avoid debugging typos
const GET_ALL_TWEETS = 'tweet/getAllTweets';
const ADD_TWEET = 'tweet/addTweet';

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadTweets(data));
    return data;
  }
};

// add a tweet
export const addTweet = (tweet) => {
  return {
          type: ADD_TWEET,
          tweet,
  }
}

export const writeTweet = (payload) => async(dispatch) => {
  const res= await fetch("/api/tweets", {
    method: "POST",
    headers: {
              "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // check if the res.statusCode is 200-299
  if (res.ok) {
    const data = await res.json();
    dispatch(addTweet(data));
  }
}

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_TWEET: {
      return {...state, tweet:[...state, action.tweet]}
    }
    default:
      return state;
  }
};

export default tweetsReducer;
