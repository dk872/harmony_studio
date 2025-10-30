import React, { useEffect, useState, useMemo, useCallback } from "react";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import { AxiosError } from "axios";

import {
  ProfileContainer,
  MasterContentWrapper,
  InfoSection,
  AppointmentSection,
  ButtonGroup,
  AppointmentCard,
  FreeTimeSection,
  TimeSlotButton,
  DaySelector,
  DayNavButton,
  DayButton,
  MasterImage,
  MasterBasicInfo,
  EditableField,
} from "./ProfilePage.styles";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

interface UserData {
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  date_of_birth: string;
  bio?: string;
  profile_image_url?: string;
  master_id?: number;
  age: number | string;
  free_times?: string[];
}

const ProfilePage: React.FC = () => {
  const { role, userId, setIsAuthenticated, setRole, setUserId } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]); // For master's appointments

  const [startDate, setStartDate] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [newFreeTime, setNewFreeTime] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserData>>({});

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const visibleDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  }, [startDate]);

  const handleNextWeek = () => setStartDate(addDays(startDate, 7));
  const handlePrevWeek = () => {
    const newDate = addDays(startDate, -7);
    setStartDate(newDate >= startOfToday() ? newDate : startOfToday());
  };
  const handleDaySelect = (day: Date) => setSelectedDate(day);

  useEffect(() => {
    if (userId === null) return;

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const userResponse = await api.get(`/users/${userId}`);
        const fetchedUserData = userResponse.data;
        const age = fetchedUserData.date_of_birth
          ? calculateAge(fetchedUserData.date_of_birth)
          : "N/A";

        let profileInfo: Partial<UserData> = {};
        let fetchedAppointments: any[] = [];
        let fetchedClients: any[] = [];

        if (role === "master") {
          const masterResponse = await api.get(`/masters/${userId}`);
          profileInfo = masterResponse.data;
          const clientsResponse = await api.get(
            `/masters/${profileInfo.master_id}/appointments`
          );
          fetchedClients = clientsResponse.data;
        } else if (role === "client") {
          const appointmentsResponse = await api.get(
            `/bookings/client/${userId}/appointments`
          );
          fetchedAppointments = appointmentsResponse.data;
        }

        const fullProfileData = {
          ...fetchedUserData,
          ...profileInfo,
          age,
        } as UserData;

        setUserData(fullProfileData);

        // Pre-fill edit form state
        setEditFormData({
          first_name: fullProfileData.first_name,
          last_name: fullProfileData.last_name,
          phone_number: fullProfileData.phone_number,
          email: fullProfileData.email,
          bio: fullProfileData.bio,
        });
        setClients(fetchedClients);
        setAppointments(fetchedAppointments);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error("Error fetching profile data:", axiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [role, userId]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!userData) return;

    setLoading(true);
    try {
      // Update user data
      await api.put(`/users/${userId}`, {
        first_name: editFormData.first_name,
        last_name: editFormData.last_name,
        phone_number: editFormData.phone_number,
        email: editFormData.email,
      });

      // Update master-specific data (bio)
      if (role === "master" && userData.master_id) {
        await api.put(`/masters/${userData.master_id}`, {
          bio: editFormData.bio,
        });
      }

      // Update local state
      setUserData(
        (prev) =>
          prev
            ? ({
                ...prev,
                first_name: editFormData.first_name || "",
                last_name: editFormData.last_name || "",
                phone_number: editFormData.phone_number || "",
                email: editFormData.email || "",
                bio: editFormData.bio || prev.bio,
              } as UserData)
            : null
      );

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile changes.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole("guest");
    setUserId(null);
    window.location.href = "/login";
  }, [setIsAuthenticated, setRole, setUserId]);

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users/${userId}`);
      alert("Account deleted successfully.");
      handleLogout();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleAddFreeTime = async () => {
    if (role !== "master" || !userData?.master_id) return;
    try {
      await api.post(`/masters/${userData.master_id}/free-times`, {
        free_time: newFreeTime,
      });
      const updatedFreeTimesResponse = await api.get(
        `/masters/${userData.master_id}/free-times`
      );
      setUserData(
        (prev) =>
          prev
            ? { ...prev, free_times: updatedFreeTimesResponse.data.free_times }
            : null
      );

      setNewFreeTime("");
      alert("Free time updated successfully.");
    } catch (error) {
      console.error("Error updating free time:", error);
    }
  };

  const handleDeleteFreeTime = async (time: string) => {
    if (role !== "master" || !userData?.master_id) return;
    try {
      await api.delete(`/masters/${userData.master_id}/free-times`, {
        data: { free_time: time },
      });
      const updatedFreeTimesResponse = await api.get(
        `/masters/${userData.master_id}/free-times`
      );
      setUserData(
        (prev) =>
          prev
            ? { ...prev, free_times: updatedFreeTimesResponse.data.free_times }
            : null
      );
      alert("Free time deleted successfully.");
    } catch (error) {
      console.error("Error deleting free time:", error);
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      await api.delete(`/bookings/${appointmentId}`);
      if (role === "master") {
        setClients(clients.filter((appt) => appt.id !== appointmentId));
      } else if (role === "client") {
        setAppointments(
          appointments.filter((appt) => appt.id !== appointmentId)
        );
      }
      alert("Appointment cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
    );
  }

  if (!userData || userId === null) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Access denied or data not found.
      </p>
    );
  }

  const formattedSelectedDate = format(selectedDate, "yyyy-MM-dd");
  const availableTimes = (userData.free_times || [])
    .filter((time) => time.startsWith(formattedSelectedDate))
    .map((time) => time.split(" ")[1].substring(0, 5));

  const currentAppointmentsList = role === "master" ? clients : appointments;

  const renderMasterInfo = () => (
    <>
      {isEditing ? (
        <>
          <EditableField>
            <input
              name="first_name"
              value={editFormData.first_name || ""}
              onChange={handleEditChange}
            />
            <input
              name="last_name"
              value={editFormData.last_name || ""}
              onChange={handleEditChange}
            />
          </EditableField>
          <EditableField>
            <input
              name="phone_number"
              value={editFormData.phone_number || ""}
              onChange={handleEditChange}
            />
          </EditableField>
          <EditableField>
            <input
              type="email"
              name="email"
              value={editFormData.email || ""}
              onChange={handleEditChange}
            />
          </EditableField>
        </>
      ) : (
        <>
          <h3>
            {userData.first_name} {userData.last_name}
          </h3>
          <p className="secondary">{userData.age} years</p>
          <p className="secondary phone-number-display">
            {userData.phone_number}
          </p>
          <p className="secondary email-display">{userData.email}</p>
        </>
      )}

      {role === "master" &&
        (isEditing ? (
          <textarea
            name="bio"
            value={editFormData.bio || ""}
            onChange={handleEditChange}
            placeholder="Enter your bio"
          />
        ) : (
          <p className="secondary bio-text">{userData.bio}</p>
        ))}
    </>
  );

  const renderFreeTimeSection = () => {
    if (role !== "master") return null;

    return (
      <FreeTimeSection>
        <h3>Select Free time</h3>
        <DaySelector>
          <DayNavButton onClick={handlePrevWeek}>&lt;</DayNavButton>
          {visibleDays.map((day) => (
            <DayButton
              key={format(day, "yyyy-MM-dd")}
              isSelected={isSameDay(selectedDate, day)}
              onClick={() => handleDaySelect(day)}
            >
              <span className="month">{format(day, "MMM")}</span>
              <span className="date">{format(day, "dd")}</span>
            </DayButton>
          ))}
          <DayNavButton onClick={handleNextWeek}>&gt;</DayNavButton>
        </DaySelector>

        <div className="available-times">
          <h4>Available time:</h4>
          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <TimeSlotButton>{time}</TimeSlotButton>
                <button
                  onClick={() =>
                    handleDeleteFreeTime(`${formattedSelectedDate} ${time}`)
                  }
                  style={{
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="no-time">No free slots on this day.</p>
          )}
        </div>

        <div className="add-time-input">
          <input
            type="text"
            value={newFreeTime}
            onChange={(e) => setNewFreeTime(e.target.value)}
            placeholder="2025-11-25 10:30"
          />
          <button onClick={handleAddFreeTime}>Add free time</button>
        </div>
      </FreeTimeSection>
    );
  };

  return (
    <>
      <Header isAuthenticated={true} />
      <ProfileContainer>
        <MasterContentWrapper>
          <InfoSection
            className={role === "client" ? "client-layout" : ""}
          >
            <h2>Your profile</h2>
            {role === "master" && (
              <MasterImage
                src={userData.profile_image_url}
                alt="Profile"
              />
            )}

            <MasterBasicInfo
              className={role === "client" ? "client-data-only" : ""}
            >
              {renderMasterInfo()}
            </MasterBasicInfo>

            <ButtonGroup>
              <button onClick={handleDeleteAccount} className="delete">
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="edit"
                disabled={loading}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              <button onClick={handleLogout} className="exit">
                Exit
              </button>
            </ButtonGroup>
            {renderFreeTimeSection()}
          </InfoSection>

          <AppointmentSection>
            <h2>Your appointments</h2>
            <div className="appointments-list">
              {currentAppointmentsList.length > 0 ? (
                currentAppointmentsList.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    className={
                      role === "master"
                        ? "master-view-card"
                        : "client-view-card"
                    }
                  >
                    {role === "client" && (
                      <div className="image-wrapper">
                        <img
                          src={appt.master_image_url}
                          alt={appt.master_name}
                        />
                      </div>
                    )}

                    <div className="details">
                      {role === "client" && (
                        <h3 className="service-name">
                          {appt.service_name || "Service"}
                        </h3>
                      )}
                      <p className="master-client-name">
                        {role === "master"
                          ? appt.client_name
                          : appt.master_name}
                      </p>

                      <p className="time">
                        {new Date(appt.booking_datetime).toLocaleString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCancelAppointment(appt.id)}
                      className="cancel"
                    >
                      Cancel
                    </button>
                  </AppointmentCard>
                ))
              ) : (
                <p>No appointments yet.</p>
              )}
            </div>
            {currentAppointmentsList.length > 6 && (
              <button className="see-more">See more</button>
            )}
          </AppointmentSection>
        </MasterContentWrapper>
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;