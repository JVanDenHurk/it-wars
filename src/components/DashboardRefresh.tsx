"use client";

import { useRouter } from "next/navigation";
import {
    useEffect,
    useRef,
} from "react";

type DashboardStatus = {
  success: boolean;
  openTickets: number;
  credits: number;
  kills: number;
  bankruptcies: number;
};

export default function DashboardRefresh() {
  const router =
    useRouter();

  const previousStatus =
    useRef<DashboardStatus | null>(
      null
    );

  useEffect(() => {
    let stopped =
      false;

    async function checkStatus() {
      /*
       * Don't do anything while one
       * of the game's popups is open.
       */
      const modalOpen =
        document.body.dataset
          .gameModalOpen ===
        "true";

      if (modalOpen) {
        return;
      }

      try {
        const response =
          await fetch(
            "/api/dashboard/status",
            {
              method:
                "GET",

              cache:
                "no-store",
            }
          );

        if (
          !response.ok
        ) {
          return;
        }

        const status =
          (await response.json()) as DashboardStatus;

        if (
          stopped
        ) {
          return;
        }

        /*
         * First check establishes our
         * starting point.
         *
         * Don't refresh.
         */
        if (
          previousStatus.current ===
          null
        ) {
          previousStatus.current =
            status;

          return;
        }

        const previous =
          previousStatus.current;

        /*
         * Only refresh the dashboard
         * when something visible has
         * actually changed.
         */
        const changed =
          status.openTickets !==
            previous.openTickets ||
          status.credits !==
            previous.credits ||
          status.kills !==
            previous.kills ||
          status.bankruptcies !==
            previous.bankruptcies;

        /*
         * Store newest values before
         * refreshing.
         */
        previousStatus.current =
          status;

        if (changed) {
          router.refresh();
        }
      } catch (error) {
        /*
         * A temporary polling failure
         * shouldn't break the dashboard.
         */
        console.error(
          "Dashboard status check failed:",
          error
        );
      }
    }

    /*
     * Establish baseline immediately.
     */
    void checkStatus();

    /*
     * Then perform a lightweight check
     * every 5 seconds.
     */
    const interval =
      window.setInterval(
        () => {
          void checkStatus();
        },
        5000
      );

    return () => {
      stopped =
        true;

      window.clearInterval(
        interval
      );
    };
  }, [router]);

  return null;
}