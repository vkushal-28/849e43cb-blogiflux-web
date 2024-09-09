import React from "react";
import Button from "./button.component";

const LoadMoreData = ({ state, fetchDataFunc, additaionalParam }) => {
  if (state !== null && state.totalDocs > state.result.length) {
    return (
      <Button
        className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
        onClick={() =>
          fetchDataFunc({ ...additaionalParam, page: state.page + 1 })
        }>
        Load more...
      </Button>
    );
  }
};

export default LoadMoreData;
