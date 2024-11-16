import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Ensure the path to your firebase configuration is correct
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase"; // Ensure the path to your firebase configuration is correct
import './Request.css'; // Import the CSS file for styling

function Requests() {
  const [requests, setRequests] = useState([]);
  const [user] = useAuthState(auth);

  // Define the fetchRequests function outside of useEffect
  const fetchRequests = async () => {
    if (!user) return;

    const requestsRef = collection(db, "requests");
    const q = query(requestsRef, where("fromUserId", "==", user.uid)); // Ensure the field name is correct
    const requestDocs = await getDocs(q);

    // Log the fetched requests for debugging
    const fetchedRequests = requestDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(fetchedRequests); // Log the requests to check if they are fetched correctly
    setRequests(fetchedRequests);
  };

  useEffect(() => {
    fetchRequests(); // Call fetchRequests here
  }, [user]);

  const handleApprove = async (requestId) => {
    try {
      const requestRef = doc(db, "requests", requestId);
      await updateDoc(requestRef, {
        status: "accepted"
      });
      alert("Request approved!");
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error("Error approving request: ", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const requestRef = doc(db, "requests", requestId);
      await updateDoc(requestRef, {
        status: "rejected"
      });
      alert("Request rejected!");
      fetchRequests(); // Refresh the requests list
    } catch (error) {
      console.error("Error rejecting request: ", error);
    }
  };

  return (
    <div className="requests-container">
      <h1 className="text-3xl font-bold mb-4 text-center">My Exchange Requests</h1>
      {requests.length === 0 ? (
        <p className="no-requests">No requests sent.</p>
      ) : (
        <ul>
          {requests.map(request => (
            <li key={request.id} className="request-item">
              <p className="requesting-book-id">Requesting Book ID: <span>{request.bookId}</span></p>
              <p className={`status ${request.status.toLowerCase()}`}>Status: {request.status}</p>
              <div className="button-group">
                <button className="approve-button" onClick={() => handleApprove(request.id)}>Approve</button>
                <button className="reject-button" onClick={() => handleReject(request.id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Requests;