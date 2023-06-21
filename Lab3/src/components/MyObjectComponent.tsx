import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { Review, MyObject } from "../../../lab2/node_modules/@prisma/client";
import axiosInstance from ".././axiosInstance";
import { useParams } from "react-router-dom";

interface Props {
  visitorId: string;
  myObjectId: string;
}

function MyObjectComponent(props: Props) {
  const [review, setReview] = useState<Review[]>([]);
  const [myObject, setMyObject] = useState<MyObject>();
  const [reviewValues, setReviewValues] = useState({
    content: "",
    ratingValue: 0,
  });
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [modalReviewSwitch, setModalReviewSwitch] = useState(false);

  async function getAllReviews() {
    try {
      const response = await axiosInstance.get<Review[]>(`/visitors/reviews`);
      setReview(response.data);
      console.log("all review", response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const createReview = () => {
    axiosInstance
      .post("/visitors/reviews", {
        content: reviewValues.content,
        ratingValue: Number(ratingValue),
        visitorId: Number(props.visitorId),
        objectId: Number(props.myObjectId),
        tripAdvisorId: 1,
      })
      .then(function (response) {
        console.log("created new review", response);
        setModalReviewSwitch(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteReview = (id: number) => {
    axiosInstance
      .delete(`/visitors/reviews/${id}`)
      .then(function (response) {
        console.log("deleted review by id", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axiosInstance
      .get<MyObject>(`/object/${props.myObjectId}`)
      .then((response) => {
        setMyObject(response.data);
        //console.log(response.data.name, "myObelst");
      });
    axiosInstance.get<Review[]>(`/visitors/reviews`).then((response) => {
      setReview(response.data);
    });

    //console.log('new response', myObject);
  }, [props.myObjectId, props.visitorId, review]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setReviewValues({
      ...reviewValues,
      [name]: value,
    });
  }
  function handleInputRating(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value.trim());
    setRatingValue(value);

    if (value < 0) return;
    console.log(ratingValue, "rating");
  }
  const openCreateReviewModal = () => {
    setModalReviewSwitch(true);
  };
  const closeCreateReviewModal = () => {
    setModalReviewSwitch(false);
  };

  return (
    <div className="">
      <div className="p-10  m-0 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold underline text-red-600">
          Review in Object {props.myObjectId} {myObject?.name}
        </h1>
        <button
          onClick={getAllReviews}
          className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          get All Reviews
        </button>
        <button
          onClick={openCreateReviewModal}
          className="px-4 py-1 my-2 mx-2 text-sx text-[#fffff] font-semibold rounded-full border border-purple-200 hover:text-[#27272a] hover:bg-[#cbd5e1] hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          create Review
        </button>
      </div>
      <div className="flex justify-center items-center rounded-lg m-2">
        visitor id {props.visitorId}
        <br></br>
        Object id {props.myObjectId}
      </div>
      {modalReviewSwitch ? (
        <div className="flex justify-center my-4">
          <div className="bg-[#e0f2fe] shadow-xl p-4 shadow-zinc-800 rounded-lg">
            <div className="items-center py-2 m-2">
              <div className="flex items-center justify-between font-bold">
                Create review:
                <span
                  className="font-normal cursor-pointer bg-[#869cdb] p-1 rounded-lg border border-[#19273f]"
                  onClick={closeCreateReviewModal}
                >
                  Close
                </span>
              </div>
              <label className="mt-4 flex flex-col bg-[#bfd2e8] p-3 shadow-xl rounded-lg shadow-zinc-400 ">
                Content:
                <input
                  name="content"
                  onChange={handleInputChange}
                  value={reviewValues.content}
                  type="text"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap py-2 m-2">
              <label className="flex flex-col bg-[#bfd2e8] p-3 shadow-xl rounded-lg shadow-zinc-400 ">
                Rating:
                <input
                  name="rating"
                  onChange={handleInputRating}
                  value={ratingValue}
                  type="number"
                  className="w-64 my-0.5 bg-[#ffde80] rounded-lg px-2"
                />
              </label>
            </div>
            <div
              onClick={createReview}
              className="mt-4 bg-[#869cdb] rounded-lg cursor-pointer text-[#19273f] border px-1 border-solid border-[#19273f] text-center"
            >
              Confirm
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-row justify-evenly ">All Review</div>
      <div className="flex flex-row justify-evenly ">
        {review.length > 0
          ? review.map((review: Review, index: number) => (
              <div
                key={review.id + "-" + index}
                className="w-64 bg-[#bfd2e8] m-2 top-10 p-6 shadow-xl text-justify shadow-zinc-800 rounded-lg border border-[#869cdb]"
              >
                <div className="flex flex-col mt-2">
                  <label className="text-[#19273f] font-bold">Contend:</label>
                  <h1 className="italic hover:not-italic">{review.content}</h1>
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[#19273f] font-bold">Rating:</label>
                  <h1 className="italic hover:not-italic">
                    {review.ratingValue}
                  </h1>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => {
                      deleteReview(review.id);
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

function MyObjectWrapper() {
  const { visitorId, myObjectId } = useParams<{
    visitorId?: string;
    myObjectId?: string;
  }>();
  if (!visitorId) {
    return <div>Invalid visitorId</div>;
  }
  if (!myObjectId) {
    return <div>Invalid myObjectId</div>;
  }
  return <MyObjectComponent visitorId={visitorId} myObjectId={myObjectId} />;
}

export default MyObjectWrapper;
