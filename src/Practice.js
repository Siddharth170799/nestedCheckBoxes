// import React, { useEffect, useState } from "react";
// import data1 from "./data.json";

// const List = ({ data, level = 0, toggleCheckBox }) => {
//   return (
//     <div style={{ paddingLeft: level * 20 }}>
//       {data.map((item) => (
//         <div key={item.id} style={{ marginBottom: "8px" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <input
//               type="checkbox"
//               checked={item.isChecked}
//               onChange={(e) => toggleCheckBox(item.id, e)}
//             />
//             <span>{item.name}</span>
//           </div>
//           {item.children && (
//             <List
//               data={item.children}
//               toggleCheckBox={toggleCheckBox}
//               level={level + 1}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Practice = () => {
//   const [data, setData] = useState(data1);
//   const [parentids, setParentid] = useState([]);
//   const [button, setButton] = useState(true);

//   const toggleCheckBox = (id, e) => {

// setButton(!button);
//     const updateList = (data) => {
//       return data?.map((item) => {
//         if (item.id == id || item?.parentId?.includes(id)) {
//           setParentid([...parentids, id]);
//           return {
//             ...item,
//             isChecked: true,
//             children: item?.children?.map((child) => ({
//               ...child,
//               isChecked: true,
//               children: updateList(child?.children),
//             })),
//           };
//         } else if (item?.children) {
//           return {
//             ...item,
//             children: updateList(item.children),
//           };
//         } else {
//           return item;
//         }
//       });
//     };
//     setData(updateList(data));
//   };

//   const checking = () => {
//     const updateList = (items) => {
//       return items?.map((item) => {
//         if (item?.children?.every((item1) => item1.isChecked)) {
//           return { ...item, isChecked: true };
//         } else {
//           return {
//             ...item,
//             children: updateList(item.children),
//           };
//         }
//       });
//     };

//     const updatedData = updateList(data);
//     setData(updatedData);
//   };

//   useEffect(() => {
//     checking();
//   }, [button]);

//   return (
//     <div>
//       <h2>Hierarchical List</h2>
//       <List data={data} toggleCheckBox={toggleCheckBox} />
//     </div>
//   );
// };

// export default Practice;

import React, { useEffect, useState } from "react";
import data1 from "./data2.json";

const List = ({ data, level = 0, toggleCheckBox }) => {
  return (
    <div style={{ paddingLeft: level * 20 }}>
      {data.map((item) => (
        <div key={item?.id} style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={item?.isChecked}
              onChange={(e) => toggleCheckBox(item.id, e)}
            />
            <span>{item?.name}</span>
          </div>
          {item?.children && (
            <List
              data={item?.children}
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
  const [parentids, setParentid] = useState([]);
  const [button, setButton] = useState(true);
  const [obj, setObj] = useState({});

  const toggleCheckBox = (id, e) => {
    if (e.target.checked) {
      setButton(!button);
      const updateList = (data) => {
        return data?.map((item) => {
          if (item?.id == id || item?.parentId?.includes(id)) {
          setObj({...obj,[item.id] : item.childIds})
            return {
              ...item,
              isChecked: true,
              children: item?.children?.map((child) => ({
                ...child,
                isChecked: true,
                children: updateList(child?.children),
              })),
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
      };
      setData(updateList(data));
    } else {
      setButton(!button);
      const updateList = (data) => {
        return data?.map((item) => {
          if (item.id == id || item?.parentId?.includes(id)) {
            return {
              ...item,
              isChecked: false,
              children: item?.children?.map((child) => ({
                ...child,
                isChecked: false,
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
    }
  };

  const checking = () => {
    const updateList = (items) => {
      return items?.map((item) => {
        // if (item?.children?.every((item1) => item1.isChecked)) {
        //   return {
        //     ...item,
        //     isChecked: true,
        //   };
        // } else {
        //   return {
        //     ...item,
        //     children: updateList(item.children),
        //   };
        // }


      });
    };

    const updatedData = updateList(data);
    // setData(updatedData);
  };

  useEffect(() => {
    checking();
  }, [button]);
  console.log(parentids);
  return (
    <div>
      <h2>Hierarchical List</h2>
      <List data={data} toggleCheckBox={toggleCheckBox} />
    </div>
  );
};

export default Practice;
