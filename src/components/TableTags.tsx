import React from "react";

interface TableTagsProps {
  tags: string[];
  removeTag: (index: number) => void;
}

const TableTags = (props: TableTagsProps) => {
  const { tags, removeTag } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>
            <div className="header">
              <p>Tags</p>
            </div>
          </th>
        </tr>
        {tags.map((row, index) => (
          <tr key={index}>
            <td>{row}</td>
            <td>
              <button onClick={() => removeTag(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default TableTags;
