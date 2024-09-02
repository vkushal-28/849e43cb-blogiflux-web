// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationdata } from "../common/filter-pagination-data";
import AnimationWrapper from "../common/page-animation";
import NotificationCard from "../components/notification-card.component";
import LoadMoreData from "../common/load-more.component";
import { NotificationLoader } from "../components/loaders/dashboard-loader.component";
import apiRequest from "../common/api/apiRequest";
import { getNotificationsApi } from "../common/api";
import Loader from "../components/loader.component";

const Notifications = () => {
  let {
    userAuth,
    userAuth: { access_token, new_notification_available },
    setUserAuth,
  } = useContext(UserContext);

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

    // axios
    //   .post(
    //     import.meta.env.VITE_SERVER_DOMAIN + "/notifications",
    //     {
    //       page,
    //       filter,
    //       deletedDocCount,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     }
    //   )
    //   .then(async ({ data: { notifications: data } }) => {
    //     if (new_notification_available) {
    //       setUserAuth({ ...userAuth, new_notification_available: false });
    //     }

    //     let formatedData = await filterPaginationdata({
    //       state: notifications,
    //       data,
    //       page,
    //       countRoute: "/all-notifications-count",
    //       data_to_send: { filter },
    //       user: access_token,
    //     });

    //     setNotifications(formatedData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    if (access_token) fetchNotifications({ page: 1 });
  }, [access_token, filter]);

  const handleFilter = (e) => {
    const { innerHTML } = e.target;

    setFilter(innerHTML);
    setNotifications(null);
  };

  return (
    <div>
      <h1 className="max-md:hidden">Recent Notifications</h1>
      <div className="my-8 flex gap-6 ">
        {filters.map((filtername, i) => {
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
        })}
      </div>
      {notifications === null ? (
        <Loader />
      ) : (
        // <NotificationLoader type={filter} />
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
    </div>
  );
};

export default Notifications;
