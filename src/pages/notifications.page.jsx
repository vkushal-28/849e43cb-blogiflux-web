import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationdata } from "../common/filter-pagination-data";
import AnimationWrapper from "../common/page-animation";
import NotificationCard from "../components/notification-card.component";
import LoadMoreData from "../common/load-more.component";
import {
  NotificationCategoryLoader,
  NotificationLoader,
} from "../components/loaderComponents/dashboard-loader.component";
import apiRequest from "../common/api/apiRequest";
import { getNotificationsApi } from "../common/api";

const Notifications = () => {
  // context data
  let {
    userAuth,
    userAuth: { access_token, new_notification_available },
    setUserAuth,
  } = useContext(UserContext);

  // state variables
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(null);

  let filters = ["all", "like", "comment", "reply"];

  const fetchNotifications = async ({ page, deletedDocCount = 0 }) => {
    try {
      const {
        data: { notifications: data },
      } = await apiRequest(
        "POST",
        getNotificationsApi,
        {
          page,
          filter,
          deletedDocCount,
        },
        true
      );
      if (new_notification_available) {
        setUserAuth({ ...userAuth, new_notification_available: false });
      }

      let formatedData = await filterPaginationdata({
        state: notifications,
        data,
        page,
        countRoute: "/all-notifications-count",
        data_to_send: { filter },
        user: access_token,
      });

      setNotifications(formatedData);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchNotifications({ page: 1 });
    }
  }, [access_token, filter]);

  const handleFilter = (e) => {
    const { innerHTML } = e.target;

    setFilter(innerHTML);
    filter !== innerHTML && setNotifications(null);
  };

  return (
    <>
      <h1 className="max-md:hidden">Recent Notifications</h1>
      <div className="w-full max-md:my-3 my-5 lg:mt-7 flex gap-2 lg:gap-6">
        {notifications === null ? (
          <NotificationCategoryLoader />
        ) : (
          filters.map((filtername, i) => {
            return (
              <button
                key={i}
                className={` ${
                  filter == filtername ? "btn-dark" : "btn-light"
                } py-2 `}
                onClick={handleFilter}>
                {filtername}
              </button>
            );
          })
        )}
      </div>
      {notifications === null ? (
        <NotificationLoader type={filter} />
      ) : (
        <>
          {notifications.result.length > 0
            ? notifications.result.map((notification, i) => {
                return (
                  <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
                    <NotificationCard
                      data={notification}
                      index={i}
                      notificationState={{ notifications, setNotifications }}
                    />
                  </AnimationWrapper>
                );
              })
            : ""}

          <LoadMoreData
            state={notifications}
            fetchDataFunc={fetchNotifications}
            additaionalParam={{
              deletedDocCount: notifications.deletedDocCount,
            }}
          />
        </>
      )}
    </>
  );
};

export default Notifications;
