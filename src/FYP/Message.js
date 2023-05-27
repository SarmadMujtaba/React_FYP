// import React, { useEffect, useState } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyBFUjezo2fKgJ2bO9RznlXeEOqfWZTxEl4",
//     authDomain: "j2e-chat.firebaseapp.com",
//     databaseURL: "https://j2e-chat-default-rtdb.firebaseio.com",
//     projectId: "j2e-chat",
//     storageBucket: "j2e-chat.appspot.com",
//     messagingSenderId: "195119881956",
//     appId: "1:195119881956:web:c94515fbf7b827ca1c56f1",
//     measurementId: "G-48YDCJ986Q"
//   };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();

// export default function ChatScreen() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unsubscribe = db
//       .collection('messages')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot((snapshot) => {
//         const newMessages = snapshot.docs.map((doc) => ({
//           _id: doc.id,
//           text: doc.data().text,
//           createdAt: doc.data().createdAt.toDate(),
//           user: doc.data().user,
//         }));
//         setMessages(newMessages);
//       });

//     return () => unsubscribe();
//   }, []);

//   const handleSend = async (newMessages) => {
//     const message = newMessages[0];
//     await db.collection('messages').add({
//       text: message.text,
//       createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
//       user: message.user,
//     });
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={handleSend}
//       user={{
//         _id: 'userId', // replace with your user ID
//         name: 'John', // replace with your username
//       }}
//     />
//   );
// }
