import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format, addDays, startOfToday, isSameDay } from "date-fns";

import {
  MasterPageContainer,
  MainContentWrapper,
  LeftColumn,
  RightColumn,
  MasterImageContainer,
  SpecialityBlock,
  MasterDetails,
  DaySelector,
  DayButton,
  DayNavButton,
  TimeSlotContainer,
  TimeSlot,
  AppointmentSummary,
  ConfirmButton,
  MasterInfoItem,
} from "./MasterPage.styles";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

interface MasterData {
  master_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  bio: string;
  service_id: number;
  speciality: string;
  studio_address: string;
  profile_image_url?: string;
}

const MasterPage: React.FC = () => {
  const { isAuthenticated, userId } = useAuth();
  const { masterId } = useParams<{ masterId: string }>();
  const [master, setMaster] = useState<MasterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [freeTimes, setFreeTimes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(startOfToday());

  const visibleDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  }, [startDate]);

  const handleNextWeek = () => {
    setStartDate(addDays(startDate, 7));
  };

  const handlePrevWeek = () => {
    const newDate = addDays(startDate, -7);
    if (newDate >= startOfToday()) {
      setStartDate(newDate);
    } else {
      setStartDate(startOfToday());
    }
  };

  const handleDaySelect = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime("");
  };

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setLoading(true);
        const masterIdInt = parseInt(masterId || "0");
        if (masterIdInt === 0) {
          throw new Error("Invalid Master ID in URL");
        }

        let userIdFromMaster: number;

        const masterMappingResponse = await api.get(`/masters`);
        const masterMapping = masterMappingResponse.data;

        const masterEntry = masterMapping.find(
          (m: any) => m.id === masterIdInt
        );

        if (!masterEntry || !masterEntry.user_id) {
          userIdFromMaster = masterIdInt;
        } else {
          userIdFromMaster = masterEntry.user_id;
        }

        const masterResponse = await api.get(`/masters/${userIdFromMaster}`);
        const masterData = masterResponse.data;
        const freeTimeResponse = await api.get(
          `/masters/${masterId}/free-times/filtered`
        );

        setMaster({
          ...masterData,
          master_id: masterIdInt,
          speciality: masterData.speciality || "Master",
          studio_address: "Springfield, 123 Maple Street",
        });

        setFreeTimes(freeTimeResponse.data.free_times || []);
      } catch (error) {
        console.error("Error fetching master data:", error);
        setMaster(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
  }, [masterId]);

  const handleTimeSelect = useCallback((time: string | undefined) => {
    if (!time) return;
    setSelectedTime(time);
  }, []);

  const handleAppointment = async () => {
    if (!isAuthenticated || !userId) {
      alert("You must be logged in to make an appointment.");
      return;
    }

    if (!selectedDate || !selectedTime || !master) {
      alert("Please select a valid date and time for your appointment.");
      return;
    }

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const bookingData = {
      user_id: userId,
      master_id: master.master_id,
      service_id: master.service_id,
      booking_datetime: `${formattedDate} ${selectedTime}`,
    };

    try {
      const response = await api.post("/bookings/", bookingData);
      if (response.status === 201) {
        alert(
          `Appointment confirmed for ${formattedDate} at ${selectedTime}`
        );
      } else {
        alert(
          "Failed to make an appointment: " +
            (response.data.error || "Unknown error")
        );
      }
    } catch (error: any) {
      console.error("Error making appointment:", error);
      alert(
        "An error occurred while making the appointment: " +
          (error.response?.data?.error || "")
      );
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
    );
  }

  if (!master) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Specialist not found.
      </p>
    );
  }

  const availableTimes = freeTimes
    .filter(
      (time) =>
        selectedDate && time.startsWith(format(selectedDate, "yyyy-MM-dd"))
    )
    .map((time) => time.split(" ")[1]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <MasterPageContainer>
        <h1>Specialist Page</h1>
        <MainContentWrapper>
          <LeftColumn>
            <MasterImageContainer>
              <img
                src={
                  master.profile_image_url ||
                  "https://via.placeholder.com/150"
                }
                alt={`${master.first_name} ${master.last_name}`}
              />
            </MasterImageContainer>
            <h2>
              {master.first_name} {master.last_name}
            </h2>
            <SpecialityBlock>{master.speciality}</SpecialityBlock>

            {isAuthenticated && (
              <ConfirmButton
                onClick={handleAppointment}
                disabled={!selectedDate || !selectedTime}
              >
                Make an Appointment
              </ConfirmButton>
            )}

            <AppointmentSummary>
              <h3>Information about appointment</h3>
              <MasterInfoItem>
                <strong>Address:</strong> {master.studio_address}
              </MasterInfoItem>
              <MasterInfoItem>
                <strong>Date:</strong>{" "}
                {selectedDate
                  ? format(selectedDate, "MMM dd, yyyy")
                  : "Not selected"}
              </MasterInfoItem>
              <MasterInfoItem>
                <strong>Time:</strong> {selectedTime || "Not selected"}
              </MasterInfoItem>
              <p className="policy-link">
                By pressing the button, you agree to our{" "}
                <a href="/terms">terms and policies</a>.
              </p>
            </AppointmentSummary>
          </LeftColumn>

          <RightColumn>
            <MasterDetails>
              <MasterInfoItem>
                <strong>Email:</strong> {master.email}
              </MasterInfoItem>
              <MasterInfoItem>
                <strong>Phone:</strong> {master.phone_number}
              </MasterInfoItem>

              <h3 style={{ marginTop: "20px" }}>About Me</h3>
              <p className="bio">
                {master.bio || "No detailed biography available yet."}
              </p>
            </MasterDetails>

            <TimeSlotContainer>
              <h3>Choose Date and Time</h3>
              <DaySelector>
                <DayNavButton
                  onClick={handlePrevWeek}
                  disabled={isSameDay(startDate, startOfToday())}
                >
                  &lt;
                </DayNavButton>
                {visibleDays.map((day) => (
                  <DayButton
                    key={day.toISOString()}
                    isSelected={
                      selectedDate ? isSameDay(selectedDate, day) : false
                    }
                    onClick={() => handleDaySelect(day)}
                    disabled={day < startOfToday()}
                  >
                    <span className="month">{format(day, "MMM")}</span>
                    <span className="date">{format(day, "dd")}</span>
                    <span className="day-name">
                      {isSameDay(day, startOfToday())
                        ? "Today"
                        : format(day, "EEE")}
                    </span>
                  </DayButton>
                ))}
                <DayNavButton onClick={handleNextWeek}>&gt;</DayNavButton>
              </DaySelector>

              {selectedDate && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <TimeSlot
                        key={time}
                        isSelected={selectedTime === time}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time.substring(0, 5)} {}
                      </TimeSlot>
                    ))
                  ) : (
                    <p style={{ color: "#555" }}>
                      No available times for this day.
                    </p>
                  )}
                </div>
              )}
            </TimeSlotContainer>

            {!isAuthenticated && (
              <p
                style={{
                  textAlign: "center",
                  color: "#d9534f",
                  padding: "15px",
                  border: "1px solid #d9534f",
                  borderRadius: "5px",
                }}
              >
                Please log in or sign up to make an appointment.
              </p>
            )}
          </RightColumn>
        </MainContentWrapper>
      </MasterPageContainer>
    </>
  );
};

export default MasterPage;