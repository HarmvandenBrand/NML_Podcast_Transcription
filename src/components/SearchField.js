import React from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import {TextField} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles';


function SearchField() {

  const theme = useTheme();

  var finder = null;
  var searchIndex = 0;
  var searchVal = null;

  function search(event) {
  
    var resultNodeId = "search_result";
    
    //Retrieve new search term
    var newSearchVal = document.getElementById("transcript-search").value;

    //If the search term has not been changed (no new search) and the key is not enter (no browsing through search results), terminate.
    if (newSearchVal === searchVal && event.keyCode !== 13)
      return;

    //Revert highlighting of previous search
    if (finder !== null)
      finder.revert();
  
    //If searching for new search term, reset searchIndex.
    if (newSearchVal !== searchVal)
      searchIndex = -1;

    //Assign new search term
    searchVal = newSearchVal;

    if (searchVal.length > 0)
    {
      //Prepare the highlight-wrapping for found search terms
      var wrapNode = document.createElement("mark");
      wrapNode.setAttribute("class", resultNodeId);
      wrapNode.setAttribute("style", `background-color:${theme.highlighting.searchResult}`);

      //Escape special regex characters
      searchVal = searchVal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //Wrap all search results
      finder = findandreplacedomtext(document.querySelector('[id$="-container"]'), {find: new RegExp(searchVal, "gi"), wrap: wrapNode});
  
      //Retrieve highlight-wrapped elements and scroll to them
      var searchResults = document.getElementsByClassName(resultNodeId);
        

      
      //Only scroll and focusHighlight when enter is pressed and search results exist
      if (event.keyCode === 13 && searchResults.length > 0)
      {
        //Forward search
        if (!event.shiftKey)
        {
          searchIndex = (searchIndex + 1) % searchResults.length;

          //Scroll to focus and highlight it
          searchResults[searchIndex].scrollIntoView({block: "center", behavior: "smooth"});
          searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
        }

        //Backward search
        else
        {
          //Decrease search index on shift-enter. Make an exception for the 'starting state' of -1.
          if (!(searchIndex === -1))
            searchIndex = searchIndex - 1;

          //Loop around the searchResults
          if (searchIndex < 0)
            searchIndex += searchResults.length;

          //Scroll to focus and highlight it
          searchResults[searchIndex].scrollIntoView({block: "center", behavior: "smooth"});
          searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
        }

      }
    }    
  }

  return (
    <TextField
    id='transcript-search'
    label='Search text'
    type='search'
    variant='outlined'  
    margin='dense'
    onKeyUp={(event) => {search(event)}}
    />
  );
}


export default SearchField;