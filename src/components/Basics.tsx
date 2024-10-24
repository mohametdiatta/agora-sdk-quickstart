import {
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  LocalUser,
  RemoteUser,
} from "agora-rtc-react";
import { useState } from "react";

// mohemet
export const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // Store the user's connection status
  const [channel, setChannel] = useState("");
  const [isHost, setIsHost] = useState(true); // State to define if user is a host or audience

  // Join the channel with different roles (host or audience)
  useJoin(
    {
      appid: "121d7121d78b40eba1b6e98a429f76ca",
      channel: channel,
      token: null,
      // role: isHost ? "host" : "audience", // Set the role based on the user state
    },
    calling
  );

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // Only publish if the user is a host
  if (isHost) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePublish([localMicrophoneTrack, localCameraTrack]);
  }

  const remoteUsers = useRemoteUsers();

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            {isHost && (
              <div className="user">
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                >
                  <samp className="user-name">You (Host)</samp>
                </LocalUser>
              </div>
            )}
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <h2>Join the Broadcast</h2>
            <input
              onChange={(e) => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <select
              onChange={(e) => setIsHost(e.target.value === "host")}
              value={isHost ? "host" : "audience"}
            >
              <option value="host">Host</option>
              <option value="audience">Audience</option>
            </select>
            <button
              className={`join-channel ${!channel ? "disabled" : ""}`}
              disabled={!channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && isHost && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              <i className={`i-microphone ${!micOn ? "off" : ""}`} />
            </button>
            <button className="btn" onClick={() => setCamera((a) => !a)}>
              <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
            </button>
          </div>
          <button
            className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
            onClick={() => setCalling((a) => !a)}
          >
            {calling ? (
              <i className="i-phone-hangup" />
            ) : (
              <i className="i-mdi-phone" />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default Basics;
