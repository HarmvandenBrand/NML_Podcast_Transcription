import React, { useState, useEffect } from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import { TextField, Toolbar, Button, IconButton, Icon } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTheme } from '@material-ui/core/styles';
import SearchResults from './SearchResults';

function SearchField(props) {
  const { finder, setFinder } = props;
  const theme = useTheme();
  const [searchResultsLength, setSearchResultsLength] = useState(null);
  var length = 0;

  var searchIndex = 0;
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const resultNodeId = "search_result";

  useEffect(() => {
    if (searchVal) {
      //Revert highlighting of previous search
      if (finder !== null)
        finder.revert();

      if (searchVal.length > 0) {
        //Prepare the highlight-wrapping for found search terms
        let wrapNode = document.createElement("mark");
        wrapNode.setAttribute("class", resultNodeId);
        wrapNode.setAttribute("style", `background-color:${theme.highlighting.searchResult}`);

        //Escape special regex characters
        let searchValEscaped = searchVal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
        //Wrap all search results
        setFinder(findandreplacedomtext(document.querySelector('[id$="-container"]'), { find: new RegExp(searchValEscaped, "gi"), wrap: wrapNode }));
      }
    } else {
      if (finder) {
        finder.revert();
      }
    }
    setSearchResults(document.getElementsByClassName(resultNodeId));
  }, [searchVal]);

  const handleEnter = (event) => {
    if (event.keyCode === 13 && searchResults.length > 0) {
      if (!event.shiftKey) {
        searchNext();
      }
      else {
        searchPrevious();
      }
    }
  };

  function searchNext() {
    if (searchVal !== null && searchResults.length > 0) {
      searchResults[searchIndex].setAttribute("style", `background-color: ${theme.highlighting.searchResult}`);
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
      searchResults[searchIndex].setAttribute("style", `background-color: ${theme.highlighting.searchResult}`);
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

  function getClosestElement(results) {
    var bestDistance = Number.POSITIVE_INFINITY;
    var bestIndex = 0;
    const windowHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    for (var i = 0; i < results.length; i++) {
      var topDistance = Math.abs(results[i].getBoundingClientRect().top - (windowHeight / 2));
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
        onChange={event => setSearchVal(event.target.value)} //newSearch(event) }}
        onKeyUp={handleEnter}
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
          searchPrevious();
        }}
      >
        <ExpandLessIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          searchNext();
        }}
      >
        <ExpandMoreIcon />
      </IconButton>

    </Toolbar>
  );
}

export default SearchField;
