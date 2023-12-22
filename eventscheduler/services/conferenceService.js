// const { formatTime } = require("../utils/timeFormatter");

// Conference scheduling function
function scheduleConferenceTalks(talks) {
  const MORNING_SESSION_START = 9 * 60; // 9:00 AM in minutes
  const MORNING_SESSION_END = 12 * 60; // 12:00 PM in minutes
  const AFTERNOON_SESSION_START = 13 * 60; // 1:00 PM in minutes
  const NETWORKING_EVENT_START = 16 * 60; // 4:00 PM in minutes
  const NETWORKING_EVENT_END = 17 * 60; // 5:00 PM in minutes

  const tracks = [];
  let trackNumber = 1;

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  }

  function createTrack() {
    return {
      track: trackNumber++,
      morning: [],
      afternoon: [],
    };
  }

  function addToTrack(track, talk, time) {
    track.push(`${formatTime(time)} ${talk}`);
  }

  function scheduleTalks(track, talks) {
    let currentTime = MORNING_SESSION_START;

    while (talks.length > 0) {
      const talk = talks.shift();
      const duration = talk.includes("lightning")
        ? 5
        : parseInt(talk.match(/\d+/)[0], 10);

      if (currentTime + duration <= MORNING_SESSION_END) {
        addToTrack(track.morning, talk, currentTime);
        currentTime += duration;
      } else if (
        currentTime >= AFTERNOON_SESSION_START &&
        currentTime + duration <= NETWORKING_EVENT_START
      ) {
        addToTrack(track.afternoon, talk, currentTime);
        currentTime += duration;
      } else if (currentTime < AFTERNOON_SESSION_START) {
        // Move to the afternoon session after lunch
        addToTrack(track.morning, "12:00PM Lunch", MORNING_SESSION_END);
        currentTime = AFTERNOON_SESSION_START;
      } else if (
        currentTime >= NETWORKING_EVENT_START &&
        currentTime <= NETWORKING_EVENT_END
      ) {
        addToTrack(
          track.afternoon,
          "05:00PM Networking Event",
          NETWORKING_EVENT_START
        );
        currentTime = NETWORKING_EVENT_END; // End the day after networking event
      }
    }
  }

  while (talks.length > 0) {
    const track = createTrack();
    scheduleTalks(track, talks);
    tracks.push(track);
  }

  return tracks;
}

// // Test output
// const schedule = scheduleConferenceTalks(conferenceTalks);
// schedule.forEach((track, index) => {
//   console.log(`\nTrack ${index + 1}:`);
//   track.morning.forEach((talk) => console.log(` ${talk}`));
//   track.afternoon.forEach((talk) => console.log(` ${talk}`));
// });

module.exports = {
  scheduleConferenceTalks,
};
