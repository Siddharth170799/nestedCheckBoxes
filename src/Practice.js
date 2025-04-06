import React, { useState } from "react";
import data1 from "./data.json";

const List = ({ data, level = 0, toggleCheckBox }) => {

  return (
    <div style={{ paddingLeft: level * 20 }}>
      {data.map((item) => (
        <div key={item.id} style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => toggleCheckBox(item.id)}
            />
            <span>{item.name}</span>
          </div>
          {item.children && (
            <List
              data={item.children}
              toggleCheckBox={toggleCheckBox}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Practice = () => {
  const [data, setData] = useState(data1);

  const toggleCheckBox = (id) => {
    const updateList = (data) => {
      return data.map((item) => {
        if (item.id == id || item?.parentId?.includes(id)) {
          return {
            ...item,
            isChecked: !item.isChecked,
            children: item?.children?.map((child) => ({
              ...child,
              isChecked: !item.isChecked,
              children: updateList(child?.children),
            })),
          };
        } else if (item?.children) {
          return {
            ...item,
            children: updateList(item.children),
          };
        } else {
          return item;
        }
      });
    };

    setData(updateList(data));
  };

  return (
    <div>
      <h2>Hierarchical List</h2>
      <List data={data} toggleCheckBox={toggleCheckBox} />
    </div>
  );
};

export default Practice;
