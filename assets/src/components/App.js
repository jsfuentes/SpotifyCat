import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DailyIframe from "@daily-co/daily-js";

import Call from "./Call/Call";
import StartButton from "src/components/StartButton";
// import api from "../../api";
import Tray from "./Tray/Tray";
import CallObjectContext from "../CallObjectContext";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../urlUtils";
import { logDailyEvent } from "../logUtils";
import PresenceList from "src/components/PresenceList.js";
import { myChannel } from "src/socket.js";
const debug = require("debug")("app:App");

const STATE_IDLE = "STATE_IDLE";
const STATE_CREATING = "STATE_CREATING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";
const STATE_ERROR = "STATE_ERROR";

export default function App() {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);

  useEffect(() => {
    myChannel
      .join()
      .receive("ok", (resp) => {
        debug("Joined personal", resp);
      })
      .receive("error", (resp) => {
        debug("Unable to join personal", resp);
      });

    myChannel.on("new_room", (payload) => {
      setAppState(STATE_CREATING);
      debug("new_room PERSONAL", payload);
      const url = payload.url;
      startJoiningCall(url);
    });
    return () => myChannel.off("new_room");
  }, []);
  /**
   * Creates a new call room.
   */
  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);

    return axios
      .post("/api/join")
      .then((resp) => {
        console.log("RESP", resp.data);
        const url = resp.data.url;
        return url;
      })
      .catch((error) => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
  }, []);

  /**
   * Starts joining an existing call.
   *
   * NOTE: In this demo we show how to completely clean up a call with destroy(),
   * which requires creating a new call object before you can join() again.
   * This isn't strictly necessary, but is good practice when you know you'll
   * be done with the call object for a while and you're no longer listening to its
   * events.
   */
  const startJoiningCall = useCallback((url) => {
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    newCallObject.join({ url });
  }, []);

  /**
   * Starts leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    setAppState(STATE_LEAVING);
    callObject.leave();
  }, [callObject]);

  /**
   * If a room's already specified in the page's URL when the component mounts,
   * join the room.
   */
  useEffect(() => {
    const url = roomUrlFromPageUrl();
    url && startJoiningCall(url);
  }, [startJoiningCall]);

  /**
   * Update the page's URL to reflect the active call when roomUrl changes.
   *
   * This demo uses replaceState rather than pushState in order to avoid a bit
   * of state-management complexity. See the comments around enableCallButtons
   * and enableStartButton for more information.
   */
  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Uncomment to attach call object to window for debugging purposes.
   */
  // useEffect(() => {
  //   window.callObject = callObject;
  // }, [callObject]);

  /**
   * Update app state based on reported meeting state changes.
   *
   * NOTE: Here we're showing how to completely clean up a call with destroy().
   * This isn't strictly necessary between join()s, but is good practice when
   * you know you'll be done with the call object for a while and you're no
   * longer listening to its events.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      event && logDailyEvent(event);
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  /**
   * Show the call UI if we're either joining, already joined, or are showing
   * an error.
   */
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    appState
  );

  /**
   * Only enable the call buttons (camera toggle, leave call, etc.) if we're joined
   * or if we've errored out.
   *
   * !!!
   * IMPORTANT: calling callObject.destroy() *before* we get the "joined-meeting"
   * can result in unexpected behavior. Disabling the leave call button
   * until then avoids this scenario.
   * !!!
   */
  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

  /**
   * Only enable the start button if we're in an idle state (i.e. not creating,
   * joining, etc.).
   *
   * !!!
   * IMPORTANT: only one call object is meant to be used at a time. Creating a
   * new call object with DailyIframe.createCallObject() *before* your previous
   * callObject.destroy() completely finishes can result in unexpected behavior.
   * Disabling the start button until then avoids that scenario.
   * !!!
   */
  const enableStartButton = appState === STATE_IDLE;

  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center relative">
      <PresenceList />
      <div className="w-3/4 h-full flex justify-center items-center bg-gray-700">
        {showCall ? (
          // NOTE: for an app this size, it's not obvious that using a Context
          // is the best choice. But for larger apps with deeply-nested components
          // that want to access call object state and bind event listeners to the
          // call object, this can be a helpful pattern.
          <CallObjectContext.Provider value={callObject}>
            <Call roomUrl={roomUrl} />
            <Tray
              disabled={!enableCallButtons}
              onClickLeaveCall={startLeavingCall}
            />
          </CallObjectContext.Provider>
        ) : (
          <>
            <StartButton
              disabled={!enableStartButton}
              onClick={() => {
                createCall().then((url) => startJoiningCall(url));
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
