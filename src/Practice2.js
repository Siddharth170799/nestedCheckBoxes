import React, { useEffect, useState } from "react";
import data1 from "./data2.json";

const List = ({ data, level = 0, handleChange }) => {
  return (
    <div style={{ paddingLeft: level * 20 }}>
      {data.map((item) => (
        <div key={item?.id} style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={item?.isChecked}
              onChange={(e) => handleChange(item, e)}
            />
            <span>{item?.name}</span>
          </div>
          {item?.children && (
            <List
              data={item?.children}
              handleChange={handleChange}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Practice2 = () => {
  const [data, setData] = useState(data1);
  const [obj, setObj] = useState({});
const [E, SETE] = useState("");
  const [newObj, setNewObj] = useState({});

  const handleChange2 = (data) => {
    return data.map((item) => {
      return {
        ...item,
        isChecked: true,
        children: item.children ? handleChange2(item.children) : [],
      };
    });
  };

  const handleChange3 = (data) => {
    return data.map((item) => {
      return {
        ...item,
        isChecked: false,
        children: item.children ? handleChange3(item.children) : [],
      };
    });
  };

  const handleChange = (item, e) => {
    SETE(e);

    function check(data) {
      if (e.target.checked) {
        return data.map((item1) => {
          if (item1.id == item.id) {
            setObj({ key: item1.parentIds });

            setNewObj((prev) => {
              return {
                [item.parentIds]: prev[item.parentIds]
                  ? [...prev[item.parentIds], item.id]
                  : [item.id],
              };
            });

            return {
              ...item1,
              isChecked: true,
              children: item.children ? handleChange2(item.children) : [],
            };
          } else if (item1.children) {
            if (obj[item1?.childIds]?.includes(item1?.childIds[0])) {
              return {
                ...item1,
                isChecked: true,
                children: check(item1.children),
              };
            }
            return {
              ...item1,
              children: check(item1.children),
            };
          } else {
            return item1;
          }
        });
      } else {
        setNewObj(() => {
          return {};
        });
        return data.map((item1) => {
          if (item1.id == item.id) {
            return {
              ...item1,
              isChecked: false,
              children: item.children ? handleChange3(item.children) : [],
            };
          } else if (item1.children) {
            return {
              ...item1,
              children: check(item1.children),
            };
          } else {
            return item1;
          }
        });
      }
    }

    setData(check(data));
  };
  const checking = () => {
    const updateList = (items) => {
      if (E?.target?.checked) {
        return items?.map((item) => {
          if (
            item?.childIds?.every((item1) =>
              newObj[item?.id]?.includes(item1)
            ) ||
            obj["key"]?.every((item1) => item?.childIds?.includes(item1)) ||
            obj["key"]?.includes(item?.id)
          ) {
            return {
              ...item,
              isChecked: true,
              children: updateList(item.children),
            };
          } else if (item?.children) {
            return {
              ...item,
              children: updateList(item?.children),
            };
          } else {
            return item;
          }
        });
      } else {
        return items?.map((item) => {
          if (
            item?.childIds?.every((item1) =>
              newObj[item?.id]?.includes(item1)
            ) ||
            obj["key"]?.every((item1) => item?.childIds?.includes(item1)) ||
            obj["key"]?.includes(item?.id)
          ) {
            return {
              ...item,
              isChecked: false,
              children: updateList(item.children),
            };
          } else if (item?.children) {
            return {
              ...item,
              children: updateList(item?.children),
            };
          } else {
            return item;
          }
        });
      }
    };

    const updatedData = updateList(data);
    setData(updatedData);
  };

  useEffect(() => {
    checking();
  }, [E]);

  return (
    <div>
      <h2>Hierarchical List</h2>
      <List data={data} handleChange={handleChange} />
      <button onClick={() => setData(data1)}>Clear All</button>
    </div>
  );
};

export default Practice2;
