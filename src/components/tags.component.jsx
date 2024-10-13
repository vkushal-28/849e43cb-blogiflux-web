import React, { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";
import Button from "../common/button.component";

const Tag = React.memo(({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(EditorContext);

  const handleTagDelete = (e) => {
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags });
  };

  const handleTagsEdit = (e) => {
    if (e.keyCode == 13 || e.keyCode == 100) {
      e.preventDefault();

      const currentTag = e.target.innerText;

      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });

      e.target.setAttribute("contentEditable", false);
    }
  };

  const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-60 pr-8">
      <p
        className="outline-none"
        onKeyDown={handleTagsEdit}
        onClick={addEditable}>
        {tag}
      </p>
      <Button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
        onClick={handleTagDelete}>
        <i className="fi fi-br-cross text-sm pointer-events-none"></i>
      </Button>
    </div>
  );
});

export default Tag;
