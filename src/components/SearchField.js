import React from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import {TextField} from '@material-ui/core'
import {searchHighlightColor} from "../theme.js"

class SearchField extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      finder: null,
      searchIndex: 0,
      searchval: null,
    };
  }

  //Search function
  search(event) {

    //Get state variables
    var finder = this.state.finder;
    var searchIndex = this.state.searchIndex;
    var searchval = this.state.searchval;

    var resultNodeId = "search_result";

    //Revert highlighting of previous search
    if (finder !== null)
    {
      finder.revert();
    }    

    //If the previous search searched for the same term, increase searchindex
    searchIndex = (document.getElementById("transcript-search").value === searchval ? searchIndex+1 : 0);

    //Retrieve search term
    searchval = document.getElementById("transcript-search").value;

    if (searchval.length > 0)
    {
      //Prepare the highlight-wrapping for found search terms
      var wrapNode = document.createElement("mark");
      wrapNode.setAttribute("class", resultNodeId);
      wrapNode.setAttribute("style", `background-color:${searchHighlightColor}`)

      //Wrap all search results
      finder = findandreplacedomtext(document.querySelector('[id$="-container"]'), {find: new RegExp(searchval, "gi"), wrap: wrapNode});

      //Retrieve highlight-wrapped elements and scroll to them
      var searchResults = document.getElementsByClassName(resultNodeId);

      //Only scroll when enter is pressed and a search term is entered
      if (event.keyCode === 13 && searchResults.length > 0)
      {
        searchIndex %= searchResults.length ;
        searchResults[searchIndex].scrollIntoView();
      }
    }
    
    //Set state variables
    this.setState({finder : finder, searchIndex : searchIndex, searchval : searchval})
  }


  render() {
    return (
      <TextField
      id='transcript-search'
      label='Search transcript'
      type='search'
      variant='outlined'  
      margin='dense'
      onKeyUp={(event) => { this.search(event) }}
      />
    )
  }
}

export default SearchField;