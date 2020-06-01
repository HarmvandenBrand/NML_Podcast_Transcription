import React, { useState, useEffect, useRef, useCallback } from 'react';

function SearchResults(props) {
  const {length} = props;

  return (
    <div>{length}</div>
  );
}

export default SearchResults;