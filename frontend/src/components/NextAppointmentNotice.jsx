import React from "react";

const NextAppointmentNotice = ({ appointments }) => {
  if (!appointments || appointments.length === 0) return null;

  const getNextAppointment = () => {
    const now = new Date();

    const futureAppointments = appointments
      .map((app) => {
        const dateTimeString = `${app.date}T${app.time}`;
        const appointmentDate = new Date(dateTimeString);
        return { ...app, appointmentDate };
      })
      .filter((app) => app.appointmentDate > now)
      .sort((a, b) => a.appointmentDate - b.appointmentDate);

    return futureAppointments.length > 0 ? futureAppointments[0] : null;
  };

  const nextApp = getNextAppointment();

  if (!nextApp) return <p>No upcoming appointments.</p>;

  return (
    <div className="alert alert-info">
      Your next appointment is on{" "}
      <strong>{nextApp.appointmentDate.toLocaleDateString()}</strong> at{" "}
      <strong>
        {nextApp.appointmentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </strong>{" "}
      with <strong>Dr. {nextApp.doctor?.first_name || "Unavailable"}</strong>.
    </div>
  );
};

export default NextAppointmentNotice;
