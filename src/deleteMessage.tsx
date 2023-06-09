import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DeleteMessageProps {
  channelId: number;
}

const DeleteMessage: React.FC<DeleteMessageProps> = ({ channelId }) => {
  const [messageId, setMessageId] = useState('');

  // メッセージの削除ハンドラ
  const handleDelete = async () => {
    try {
      // メッセージの削除リクエストを送信
      await axios.get(`http://localhost:8081/delete-message?message_id=${messageId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={messageId} onChange={(e) => setMessageId(e.target.value)} placeholder="Enter message ID" />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteMessage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// type Message = {
//   message_id: string;
//   channel_id: number;
//   user_id: string;
//   content: string;
//   edited_at: string;
// };

// interface DeleteMessageProps {
//   messageId: string;
// }

// const DeleteMessage: React.FC<DeleteMessageProps> = ({ messageId }) => {
//   const [messages, setMessages] = useState<Message[]>([]);

//   // メッセージの削除ハンドラ
//   const handleDelete = async (messageId: string) => {
//     try {
//       // メッセージの削除リクエストを送信
//       await axios.get(`http://localhost:8081/delete-message?message_id=${messageId} `);

//       // メッセージを削除した後、更新されたメッセージリストを取得
//       const updatedMessages = await fetchMessages();
//       setMessages(updatedMessages);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // メッセージリストの取得
//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('/messages');
//       return response.data.messages;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   };

//   // コンポーネントのマウント時にメッセージリストを取得
//   useEffect(() => {
//     const getMessages = async () => {
//       const updatedMessages = await fetchMessages();
//       setMessages(updatedMessages);
//     };

//     getMessages();
//   }, []);

//   return (
//     <div>
//       {messages.map((message) => (
//         <div key={message.message_id}>
//           <p>{message.content}</p>
//           <button onClick={() => handleDelete(messageId)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DeleteMessage;
