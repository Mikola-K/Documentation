import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { Visitor, MyObject } from "../../lab2/node_modules/@prisma/client";
import axiosInstance from "./axiosInstance";
import { useParams } from "react-router-dom";

interface Props {
  id: string;
}

function TripAdvisor(props: Props) {
  const [visitorValue, setVisitorValue] = useState<string>();
  const [myObject, setMyObject] = useState<MyObject[]>([]);
  const [modalSwitch, setModalSwitch] = useState(false);
  const [modalVisitorSwitch, setModalVisitorSwitch] = useState(false);
  const [objectValues, setObjectValues] = useState({
    name: "",
    location: "",
    description: "",
    type: "",
  });

  useEffect(() => {
    axiosInstance.get<MyObject[]>(`/object`).then((response) => {
      setMyObject(response.data);
    });
    //console.log('new response', myObject);
  }, [myObject, modalSwitch]);

  async function getObjects() {
    //console.log(props.id, 'id');
    try {
      const response = await axiosInstance.get<MyObject[]>(`/object`);
      setMyObject(response.data);
      console.log("all object data", response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const createObject = () => {
    axiosInstance
      .post("/object", {
        name: objectValues.name,
        location: objectValues.location,
        description: objectValues.description,
        type: objectValues.type,
      })
      .then(function (response) {
        console.log("created new object", response);
        setModalSwitch(false);
        clearInputs();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createVisitor = () => {
    axiosInstance
      .post("/store/visitors", {
        name: visitorValue,
      })
      .then(function (response) {
        console.log("created new visitor", response);
        setModalVisitorSwitch(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteObject = (id: number) => {
    axiosInstance
      .delete(`/object/${id}`)
      .then(function (response) {
        console.log("deleted", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setObjectValues({
      ...objectValues,
      [name]: value,
    });
  }
  function handleVisitorChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setVisitorValue(value);
  }

  const clearInputs = () => {
    setObjectValues({ name: "", location: "", description: "", type: "" });
  };
  const openCreateObjectModal = () => {
    setModalSwitch(true);
  };
  const closeCreateObjectModal = () => {
    setModalSwitch(false);
    clearInputs();
  };
  const openCreateVisitorModal = () => {
    setModalVisitorSwitch(true);
  };
  const closeCreateVisitorModal = () => {
    setModalVisitorSwitch(false);
  };

  return (
    <div className="">
      <div className="p-10  m-0 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold underline text-red-600">
          Trip Advisor admin menu panel
        </h1>
        <button
          onClick={openCreateObjectModal}
          className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          create object
        </button>
        <button
          onClick={openCreateVisitorModal}
          className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          create visitor
        </button>
        <button
          onClick={getObjects}
          className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          get all objects
        </button>
      </div>
      <div className="flex justify-center items-center rounded-lg m-2">
        {modalSwitch ? (
          <div className="bg-[#bfd2e8] top-10 p-6 shadow-xl text-justify shadow-zinc-800 rounded-lg">
            <div className="flex items-center justify-between font-bold">
              Create object:
              <span
                className="font-normal cursor-pointer bg-[#869cdb] p-1 rounded-lg border border-[#19273f]"
                onClick={closeCreateObjectModal}
              >
                Close
              </span>
            </div>
            <div className="flex flex-col justify-around flex-wrap py-2">
              <label className="flex flex-col">
                Name:
                <input
                  name="name"
                  onChange={handleInputChange}
                  value={objectValues.name}
                  type="text"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
              <label className="flex flex-col mt-2">
                Description:
                <input
                  name="description"
                  onChange={handleInputChange}
                  value={objectValues.description}
                  type="text"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
              <label className="flex flex-col mt-2">
                Location:
                <input
                  name="location"
                  onChange={handleInputChange}
                  value={objectValues.location}
                  type="text"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
              <label className="flex flex-col mt-2">
                Type:
                <input
                  name="type"
                  onChange={handleInputChange}
                  value={objectValues.type}
                  type="text"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
              <div
                onClick={createObject}
                className="mt-4 bg-[#869cdb] rounded-lg cursor-pointer text-[#19273f] border px-1 border-solid border-[#19273f] text-center"
              >
                Confirm
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex justify-center items-center rounded-lg m-2">
        {modalVisitorSwitch ? (
          <div className="bg-[#bfd2e8] top-10 p-6 shadow-xl text-justify shadow-zinc-800 rounded-lg">
            <div className="flex items-center justify-between font-bold">
              Create object:
              <span
                className="font-normal cursor-pointer bg-[#869cdb] p-1 rounded-lg border border-[#19273f]"
                onClick={closeCreateVisitorModal}
              >
                Close
              </span>
            </div>
            <div className="flex flex-col justify-around flex-wrap py-2">
              <label className="flex flex-col">
                Name:
                <input
                  name="name"
                  onChange={handleVisitorChange}
                  value={visitorValue}
                  type="text"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
              <div
                onClick={createVisitor}
                className="mt-4 bg-[#869cdb] rounded-lg cursor-pointer text-[#19273f] border px-1 border-solid border-[#19273f] text-center"
              >
                Confirm
              </div>
            </div>
          </div>
        ) : null}
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
                  <label className="text-[#19273f] font-bold">Location:</label>
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
                  <button
                    onClick={() => {
                      deleteObject(myObject.id);
                    }}
                    className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : "Loading"}
      </div>
    </div>
  );
}

function TripAdvisorWrapper() {
  const { id } = useParams<{
    id?: string;
  }>();
  if (!id) {
    return <div>Invalid Id</div>;
  }
  return <TripAdvisor id={id} />;
}

export default TripAdvisorWrapper;
