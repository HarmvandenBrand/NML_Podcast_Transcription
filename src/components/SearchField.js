import React from 'react';
import findandreplacedomtext from 'findandreplacedomtext';
import {TextField} from '@material-ui/core'

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
  
      //Only trigger on pressing 'enter'
      // if (event.keyCode === 13)
      // {
        //Get state variables
        var finder = this.state.finder;
        var searchIndex = this.state.searchIndex;
        var searchval = this.state.searchval;

        //Revert highlighting of previous search
        if (finder !== null)
        {
          finder.revert();
        }    

        var resultNodeName = "search_result";

        //If the previous search searched for the same term, increase searchindex
        searchIndex = (document.getElementById("transcript-search").value === searchval ? searchIndex+1 : 0);
        // searchIndex = (document.querySelector('id$="dynamic_constant"').value === searchval ? searchIndex+1 : 0);

        // id$="dynamic_constant"
        //Retrieve search term
        searchval = document.getElementById("transcript-search").value;

        if (searchval.length > 0)
        {
          //Prepare the highlight-wrapping for found search terms
          var addNode = document.createElement("mark");
          addNode.setAttribute("class", resultNodeName);
          addNode.setAttribute("style", "background-color:#FF5301;");
          //TODO: make this color an official one (in theme.js ?)

          finder = findandreplacedomtext(document.querySelector('[id$="-container"]'), {find: new RegExp(searchval, "gi"), wrap: addNode});
          //TODO: find non-hardcodey way to get this node. (Using the rootnode creates weird layout errors)

          //Retrieve highlight-wrapped elements and scroll to them
          var searchResults = document.getElementsByClassName(resultNodeName);
          if (searchResults.length > 0 && event.keyCode === 13)
          {
            searchIndex %= searchResults.length ;
            searchResults[searchIndex].scrollIntoView();
          }
        }
        //Set state variables
        this.setState({finder : finder, searchIndex : searchIndex, searchval : searchval})
      // }
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