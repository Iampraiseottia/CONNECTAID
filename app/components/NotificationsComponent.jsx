import React, { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle, Eye } from "lucide-react";

const NotificationsComponent = ({ setActiveComponent }) => {
  // Notification State
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);

  // Simulate fetching notifications
  useEffect(() => {
    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        title: "Donation Confirmed",
        message:
          "Your donation to Education for Rural Children has been processed successfully.",
        time: "10 minutes ago",
        read: false,
        type: "success",
      },
      {
        id: 2,
        title: "New Campaign Match",
        message:
          "We found a new campaign that matches your interests: Clean Water Initiative.",
        time: "2 hours ago",
        read: false,
        type: "info",
      },
      {
        id: 3,
        title: "Upcoming Event Reminder",
        message:
          "Charity Run for Cancer Research is happening in 3 days. Don't forget to prepare!",
        time: "Yesterday",
        read: false,
        type: "reminder",
      },
      {
        id: 4,
        title: "Thank You Note",
        message:
          "Medical Supplies for Local Clinic organizers sent you a thank you note for your contribution.",
        time: "2 days ago",
        read: true,
        type: "message",
      },
      {
        id: 5,
        title: "Campaign Update",
        message:
          "Community Food Bank Drive has reached 80% of its funding goal. Thanks to supporters like you!",
        time: "5 days ago",
        read: true,
        type: "update",
      },
    ];

    setNotifications(mockNotifications);

    // Count unread notifications
    const unreadNotifications = mockNotifications.filter(
      (notification) => !notification.read
    );
    setUnreadCount(unreadNotifications.length);
  }, []);

  // Click outside to close notifications
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    // Update unread count
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    const unreadNotifications = updatedNotifications.filter(
      (notification) => !notification.read
    );
    setUnreadCount(unreadNotifications.length);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  // View notification details
  const viewNotification = (id) => {
    // Mark as read first
    markAsRead(id);

    // Find the notification
    const notification = notifications.find((n) => n.id === id);

    // Handle different notification types
    if (notification) {
      switch (notification.type) {
        case "success":
        case "info":
        case "message":
        case "update":
          // Just display in console for now, but could navigate to specific pages
          console.log("Viewing notification:", notification);
          break;
        case "reminder":
          // Could navigate to calendar/events page
          if (typeof setActiveComponent === "function") {
            setActiveComponent("survey");
            setShowNotifications(false);
          }
          break;
        default:
          console.log("Viewing notification:", notification);
      }
    }
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div
      className="relative cursor-pointer ease-in-out duration-100"
      title="Notifications"
      ref={notificationRef}
      onClick={toggleNotifications}
    >
      <Bell className="text-gray-600 cursor-pointer" size={28} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-extrabold">
          {unreadCount}
        </span>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div
                      className="flex-1"
                      onClick={() => viewNotification(notification.id)}
                    >
                      <h4 className="font-semibold text-gray-800">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex flex-col items-center space-y-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                          title="Mark as read"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewNotification(notification.id);
                        }}
                        className="text-teal-500 hover:text-teal-700"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsComponent;
