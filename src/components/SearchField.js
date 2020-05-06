import React from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import {TextField} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles';


function SearchField() {

  const theme = useTheme();

  var finder = null;
  var searchIndex = 0;
  var searchVal = 0;

  function search(event) {
  
    var resultNodeId = "search_result";
  
    //Revert highlighting of previous search
    if (finder !== null)
    {
      finder.revert();
    }    
  
    //If the previous search searched for the same term, increase searchindex
    searchIndex = (document.getElementById("transcript-search").value === searchVal ? searchIndex+1 : 0);
  
    //Retrieve search term
    searchVal = document.getElementById("transcript-search").value;

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
  
      //Only scroll when enter is pressed and a search term is entered
      if (event.keyCode === 13 && searchResults.length > 0)
      {
        searchIndex %= searchResults.length;
        searchResults[searchIndex].scrollIntoView({block: "center", behavior: "smooth"});
        searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
      }
    }    
  }

  return (
    <TextField
    id='transcript-search'
    label='Search transcript'
    type='search'
    variant='outlined'  
    margin='dense'
    onKeyUp={(event) => {search(event)}}
    />
  );
}


export default SearchField;