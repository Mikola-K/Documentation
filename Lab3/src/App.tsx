import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import {
  Visitor,
  Review,
  MyObject,
} from "../../lab2/node_modules/@prisma/client";
import axiosInstance from "./axiosInstance";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Props {
  id: string;
}
function App(props: Props) {
  const [visitors, setVisitors] = useState<Visitor>();
  const [visitor, setVisitor] = useState<Visitor>();
  const [myObject, setMyObject] = useState<MyObject[]>([]);

  async function getVisitors() {
    try {
      const response = await axiosInstance.get<Visitor>(`/store/visitors`);
      setVisitors(response.data);
      console.log("visitors data", response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    axiosInstance
      .get<Visitor>(`/store/visitors/${props.id}`)
      .then((response) => {
        setVisitor(response.data);
        console.log("visitor by id data", response.data);
      });
    axiosInstance.get<MyObject[]>(`/object`).then((response) => {
      setMyObject(response.data);
    });
    //console.log('new response', myObject);
  }, [props.id]);

  return (
    <div>
      <div className="p-10  m-0 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold underline text-red-600">
          Visitors create and updated review
        </h1>
        <h6 className="text-3xl text-center font-bold underline text-red-600">
          Objects:
        </h6>
        <button
          onClick={getVisitors}
          className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          get all visitors
        </button>
      </div>
      <div>
        <div className="flex flex-row justify-evenly">
          {visitor ? <div>Hi {visitor.name}</div> : "Loading"}
        </div>
        <div className="flex flex-row justify-evenly ">
          {myObject.length > 0
            ? myObject.map((myObject: MyObject, index: number) => (
                <div
                  key={myObject.id + "-" + index}
                  className="w-64 bg-[#bfd2e8] m-2 top-10 p-6 shadow-xl text-justify shadow-zinc-800 rounded-lg border border-[#869cdb]"
                >
                  <div className="flex flex-col mt-2">
                    <label className="text-[#19273f] font-bold">Name:</label>
                    <h1 className="italic hover:not-italic">{myObject.name}</h1>
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="text-[#19273f] font-bold">
                      Location:
                    </label>
                    <h1 className="italic hover:not-italic">
                      {myObject.location}
                    </h1>
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="text-[#19273f] font-bold">
                      Description:
                    </label>
                    <h1 className="italic hover:not-italic">
                      {myObject.description}
                    </h1>
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="text-[#19273f] font-bold">Type:</label>
                    <h1 className="italic hover:not-italic">{myObject.type}</h1>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                      <Link to={`/store/visitors/${props.id}/${myObject.id}`}>
                        Details
                      </Link>
                    </button>
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
      </div>
    </div>
  );
}

//export default App;

function VisitorAppWrapper() {
  const { id } = useParams<{
    id?: string;
  }>();
  if (!id) {
    return <div>Invalid Id</div>;
  }
  return <App id={id} />;
}

export default VisitorAppWrapper;

// async function getVisitorById(id: number) {
//   try {
//     const response = await axiosInstance.get<Visitor>(`/store/visitors/${id}`);
//     setVisitor(response.data);
//     console.log("visitor by id data", response.data);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getAllObjects() {
//   try {
//     const response = await axiosInstance.get<MyObject>(`/object`);
//     setObject(response.data);
//     console.log("all objcets", response.data);
//   } catch (e) {
//     console.log(e);
//   }
//   }

// const createVisitor = () => {
//   axiosInstance
//     .post("/store/visitors", {
//       name: "Mikola",
//     })
//     .then(function (response) {
//       console.log("created new visitor", response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

//  const objectDetails = (id: number) => {};

// useEffect(() => {
//   axiosInstance.get<StoreApp>(`/apps/${props.id}`).then((response) => {
//     setApp(response.data);
//   });

//   console.log(values);
// }, [props.id, values, editing]);
