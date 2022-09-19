import youTube from './API/youtube.js';

/*
Search fuction return a search result contains information about a YouTube video, channel, or playlist that matches
 the search parameters specified in an API request. While a search result points to a uniquely identifiable resource, 
 like a video, it does not have its own persistent data.
 By default, a search result set identifies matching video, channel, and playlist resources, 
 but you can also configure queries to only retrieve a specific type of resource.

reference: https://developers.google.com/youtube/v3/docs/search

function parameters

term : string 
The q parameter specifies the query term to search for.
Your request can also use the Boolean NOT (-) and OR (|) operators to exclude videos or to find videos 
that are associated with one of several search terms. 
For example, to search for videos matching either "boating" or "sailing", set the q parameter value to boating|sailing. 
Similarly, to search for videos matching either "boating" or "sailing" but not "fishing", set the q parameter value to boating|sailing -fishing. 
Note that the pipe character must be URL-escaped when it is sent in your API request. The URL-escaped value for the pipe character is %7C.

type: string
The type parameter restricts a search query to only retrieve a particular type of resource. 
can use multiple  values, values must separate with comma. The default value is video,channel,playlist.
Acceptable values are: video,channel,playlist

maxResults: number
The maxResults parameter specifies the maximum number of items that should be returned in the result set. 
Acceptable values are 0 to 50, inclusive. The default value is 5.

*/
const search = async (
  term,
  type = 'video,channel,playlist',
  maxResults = 5,
) => {
  try {
    const responce = await youTube.get('/search', {
      params: {
        part: 'snippet',
        q: term,
        type: type,
        maxResults: maxResults,
      },
    });

    return responce.data;
  } catch (e) {
    return e;
  }
};

const getActivities = async (maxResults = 5) => {
  try {
    const responce = await youTube.get('/activities', {
      params: {
        part: 'snippet',
        mine: true,
        //  channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
        maxResults: maxResults,
      },
    });

    return responce.data;
  } catch (e) {
    return e;
  }
};

//getActivities();
