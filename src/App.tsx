import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
//import GetMessages2 from "./GetMessages2"
import MessageList from "./GetMessages";
import GetUserChannels from "./GetUserChannels3"
import ChannelSelect from "./ChannelSelect";
import ChannelPage from "./ChannelPage";



const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Mypage />} />
          <Route path="/GetMessages" element={<MessageList channelId={undefined} />}/>
          <Route path="/getUserChannels" element={<GetUserChannels />}/>
          <Route path="/ChannelSelect" element={<ChannelSelect userData={null}/>}/>
          {/* <Route path= "/getUserChannels2" element= {<GetMessages2 channelId={0} /> }/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
