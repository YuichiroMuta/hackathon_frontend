import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams, useNavigate, Link, Form } from "react-router-dom";
import axios from "axios";
import ChannelSelect from "./ChannelSelect";
import ChannelPage from "./ChannelPage";
import { userEmail } from "./Mypage";
export let setChannelId: number | null = null; 




interface UserData {
  user_id: string;
  channels: Channel[];
}

interface Channel {
  channel_id: string;
  channel_name: string;
  messages: Message[];
}

interface Message {
  message_id: {
    String: string;
    Valid: boolean;
  };
  channel_id: string;
  user_id: string;
  content: {
    String: string;
    Valid: boolean;
  };
  edited_at: {
    String: string;
    Valid: boolean;
  };
}

const GetUserChannels3: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { channelName } = useParams<{ channelName: string }>();
  const navigate = useNavigate();
  const [displayChannel, setDisplayChannel] = useState<string>();
  const [channelID, setChannelId]= useState<any>();
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://curriculum-3-muta-yuichiro-hackathon-eaq52kewiq-uc.a.run.app/user-channels?email=${userEmail}`
        );
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const channelIndex = userData?.channels ? userData?.channels.findIndex(v => v.channel_name === displayChannel) : undefined;
  const channelPage = (channelIndex!== undefined && userData) ? <ChannelPage channel={userData.channels[channelIndex]}></ChannelPage> :<></>
  
  
  return (
    <div>
      <h2>Select a channel:</h2>
      {userData && (
      <ul>
        {userData.channels.map((channel) => (
          <li key={channel.channel_id}>
          <button onClick={() => {setDisplayChannel(channel.channel_name); setChannelId(channel.channel_id)}}>
            {channel.channel_name}
          </button>
        </li>
        ))}
      </ul>
      )}
    {channelPage}
    </div>
  );        
};


   /* <div>
      <h1>User Data:</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/user-channels"
            element={<ChannelSelect userData={userData} />}
          />
          <Route
            path="/channel/:channelName"
            element={
              <ChannelPage
                channels={userData?.channels || []}
                channelName={channelName || ""}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
*/

export default GetUserChannels3;
