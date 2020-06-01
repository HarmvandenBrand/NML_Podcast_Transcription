import React, {useState} from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import { TextField, Toolbar, Button, IconButton, Icon } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTheme } from '@material-ui/core/styles';
import SearchResults from './SearchResults';

function SearchField(props) {
  const theme = useTheme();
  const [searchResultsLength, setSearchResultsLength] = useState(null);
  var length = 0;

  var finder = null;
  var searchIndex = 0;
  var searchVal = null;
  var searchResults = null;
  var resultNodeId = "search_result";


  function search(event) {

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

    if (searchVal.length > 0) {
      //Prepare the highlight-wrapping for found search terms
      var wrapNode = document.createElement("mark");
      wrapNode.setAttribute("class", resultNodeId);
      wrapNode.setAttribute("style", `background-color:${theme.highlighting.searchResult}`);

      //Escape special regex characters
      searchVal = searchVal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //Wrap all search results
      finder = findandreplacedomtext(document.querySelector('[id$="-container"]'), { find: new RegExp(searchVal, "gi"), wrap: wrapNode });

      //Retrieve highlight-wrapped elements and scroll to them
      searchResults = document.getElementsByClassName(resultNodeId);

      //Only scroll and focusHighlight when enter is pressed and search results exist
      if (event.keyCode === 13 && searchResults.length > 0) {
        //Forward search
        if (!event.shiftKey) {
          searchIndex = (searchIndex + 1) % searchResults.length;

          //Scroll to focus and highlight it
          searchResults[searchIndex].scrollIntoView({ block: "center", behavior: "smooth" });
          searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
        }
        //Backward search
        else {
          //Decrease search index on shift-enter. Make an exception for the 'starting state' of -1.
          if (!(searchIndex === -1))
            searchIndex = searchIndex - 1;

          //Loop around the searchResults
          if (searchIndex < 0)
            searchIndex += searchResults.length;

          //Scroll to focus and highlight it
          searchResults[searchIndex].scrollIntoView({ block: "center", behavior: "smooth" });
          searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
        }

      }
    }
  }

  function newSearch(event) {
    //Retrieve new search term
    var newSearchVal = document.getElementById("transcript-search").value;

    //If the search term has not been changed (no new search) and the key is not enter (no browsing through search results), terminate.
    if (newSearchVal === searchVal && event.keyCode !== 13)
      return;

      //If searching for new search term, reset searchIndex.
    if (newSearchVal !== searchVal)
    searchIndex = -1;

    //Assign new search term
    searchVal = newSearchVal;

    searchWrap();

    //Retrieve highlight-wrapped elements and scroll to them
    searchResults = document.getElementsByClassName(resultNodeId);
    // setSearchResultsLength(searchResults.length);
    // if (searchResults.length > 0)
    //   length = searchResults.length;

    //Only scroll and focusHighlight when enter is pressed and search results exist
    if (event.keyCode === 13 && searchResults.length > 0) {
      if (!event.shiftKey) {
        searchNext();
      }
      else {
        searchPrevious();
      }
    }
  }

  function searchWrap() {
    if (searchVal !== null && searchResults !== null) {

      //Revert highlighting of previous search
      if (finder !== null)
      finder.revert();

      if (searchVal.length > 0) {
        //Prepare the highlight-wrapping for found search terms
        var wrapNode = document.createElement("mark");
        wrapNode.setAttribute("class", resultNodeId);
        wrapNode.setAttribute("style", `background-color:${theme.highlighting.searchResult}`);

        //Escape special regex characters
        searchVal = searchVal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
        //Wrap all search results
        finder = findandreplacedomtext(document.querySelector('[id$="-container"]'), { find: new RegExp(searchVal, "gi"), wrap: wrapNode });
      }
    }
  }

  function searchNext() {
    if (searchVal !== null && searchResults.length > 0) {
      if (searchIndex === -1)
        searchIndex = getClosestElement(searchResults);
      else
        searchIndex = (searchIndex + 1) % searchResults.length;

      //Scroll to focus and highlight it
      searchResults[searchIndex].scrollIntoView({ block: "center", behavior: "smooth" });
      searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
    }
  }

  function searchPrevious() {
    if (searchVal !== null && searchResults.length > 0) {
      if (!(searchIndex === -1))
        searchIndex = searchIndex - 1;
      else
        searchIndex = getClosestElement(searchResults);

      //Loop around the searchResults
      if (searchIndex < 0)
        searchIndex += searchResults.length;

      //Scroll to focus and highlight it
      searchResults[searchIndex].scrollIntoView({ block: "center", behavior: "smooth" });
      searchResults[searchIndex].setAttribute("style", `background-color :${theme.highlighting.searchResultFocus}`);
    }
  }

  function getClosestElement(results)
  {
    var bestDistance = Number.POSITIVE_INFINITY;
    var bestIndex = 0;
    const windowHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    for (var i=0; i<results.length ; i++)
    {
      var topDistance = Math.abs(results[i].getBoundingClientRect().top - (windowHeight/2));
      if (topDistance < bestDistance) {
        bestIndex = i;
        bestDistance = topDistance;
      }
    };

    return bestIndex;
  }

  return (
    <Toolbar>

      <TextField
        id='transcript-search'
        label='Search text'
        type='search'
        variant='outlined'
        margin='dense'
        onKeyUp={(event) => { newSearch(event) }}
      />

      {/* {searchResults2 !== null && searchResults2.length > 0 &&
        <div>{searchResults2.length}</div>
      } */}

      {searchResultsLength > 0 ? (
        <div>{searchResultsLength}</div>
      ) : (
        <div>leeg</div>
      )}

        {/* <div>{length}</div> */}


      {/* {searchResults2 !== null ? (
        <SearchResults props={searchResults2.length}/>
      ) : (
        <div></div>
      )} */}

      <IconButton
        onClick={() => {
        searchWrap();
        searchPrevious();}}
      >
        <ExpandLessIcon />
      </IconButton>
      <IconButton
        onClick={() => {
        searchWrap();
        searchNext();}}
      >
        <ExpandMoreIcon/>
      </IconButton>

    </Toolbar>
  );
}

export default SearchField;
