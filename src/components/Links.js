import React, { useEffect, useState } from "react";
import { LinkForm } from "./LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

export const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  // the add in firebase is a function asincrono
  const addOrEditLink = async (linkObject) => {
    // collection is equal data set
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New Link Added", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("New Update Successfully", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      toast(`Error: ${error}`, {
        type: "error",
        autoClose: 2000,
      });
      setCurrentId("");
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    const isConfirm = window.confirm(
      "are you sure you want to delete this link?"
    );
    if (isConfirm) {
      await db.collection("links").doc(id).delete();
      toast("New Link Deleted", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-lg-12 col-md-4 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-lg-12 col-md-8 mt-3 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4> {link.name} </h4>
                <div className="">
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    {" "}
                    close{" "}
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p> {link.description} </p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {" "}
                Go to webside
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
