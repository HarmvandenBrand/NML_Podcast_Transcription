import React, { useState, useEffect } from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import { TextField, Toolbar, Button, IconButton, Icon } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTheme } from '@material-ui/core/styles';

function SearchField(props) {
  const theme = useTheme();

  const [finder, setFinder] = useState(null);
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState(-1);
  const resultNodeId = "search_result";

  useEffect(() => {
    //Revert highlighting of previous search
    if (finder) {
      finder.revert();
    }

    if (searchVal) {
      //Reset index
      setSearchIndex(-1);

      //Prepare the highlight-wrapping for found search terms
      let wrapNode = document.createElement("mark");
      wrapNode.setAttribute("class", resultNodeId);
      wrapNode.setAttribute("style", `background-color: ${theme.highlighting.searchResult}`);

      //Escape special regex characters
      let searchValEscaped = searchVal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //Wrap all search results
      setFinder(findandreplacedomtext(document.querySelector('[id$="-container"]'), { find: new RegExp(searchValEscaped, "gi"), wrap: wrapNode }));
    }

    setSearchResults(document.getElementsByClassName(resultNodeId));
  }, [searchVal, theme]); // do NOT add finder as a dependency because this will break the code

  useEffect(() => {
    //Highlight search results
    if (searchIndex > -1) {
      Array.from(searchResults).forEach((res, idx) => {
        if (idx === searchIndex) {
          res.setAttribute("style", `background-color: ${theme.highlighting.searchResultFocus}`);
          res.scrollIntoView({ block: "center", behavior: "smooth" });
        } else {
          res.setAttribute("style", `background-color: ${theme.highlighting.searchResult}`);
        }
      });
    }
  }, [searchIndex, searchResults, theme]);

  useEffect(() => {
    //Update and display amount of found results
    var target = document.getElementById("search-results-display");
    var padding = 7 - String(searchIndex + 1).length - String(searchResults.length).length;

    if (searchVal.length < 1)
      target.setAttribute("style", `visibility: hidden; margin-right: ${padding}ch; margin-left: 1ch;`);
    else
      target.setAttribute("style", `margin-right: ${padding}ch; margin-left: 1ch;`);
    target.innerHTML = (searchIndex + 1 + "/" + searchResults.length);
  });

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
    if (searchVal && searchResults.length > 0) {
      if (searchIndex === -1) {
        setSearchIndex(getClosestElement(searchResults));
      } else {
        setSearchIndex((searchIndex + 1) % searchResults.length);
      }
    }
  }

  function searchPrevious() {
    if (searchVal && searchResults.length > 0) {
      if (searchIndex === -1) {
        setSearchIndex(getClosestElement(searchResults));
      } else {
        let newSearchIndex = searchIndex - 1
        newSearchIndex = newSearchIndex < 0 ? newSearchIndex + searchResults.length : newSearchIndex;
        setSearchIndex(newSearchIndex);
      }
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

      <div id="search-results-display" />

    </Toolbar>
  );
}

export default SearchField;
