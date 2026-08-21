"use client";

import { useEffect } from "react";

export default function PlayerHeartbeat() {
  useEffect(() => {
    let active = true;

    async function sendHeartbeat() {
      try {
        await fetch(
          "/api/players/heartbeat",
          {
            method: "POST",

            /*
             * Avoid browser caching.
             */
            cache: "no-store",
          }
        );
      } catch (error) {
        if (active) {
          console.error(
            "Player heartbeat failed:",
            error
          );
        }
      }
    }

    /*
     * Send one immediately when
     * the component mounts.
     */
    sendHeartbeat();

    /*
     * Then update activity every
     * 60 seconds while the player
     * has the game open.
     */
    const interval =
      window.setInterval(
        sendHeartbeat,
        60 * 1000
      );

    return () => {
      active = false;

      window.clearInterval(
        interval
      );
    };
  }, []);

  /*
   * This component has no UI.
   */
  return null;
}