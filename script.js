let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function start() {
  if (!timer) {
    timer = setInterval(updateTimer, 10);
  }
}

function pause() {
  clearInterval(timer);
  timer = null;
  logAction("Paused", updateTimerDisplay());
}

function reset() {
  clearInterval(timer);
  timer = null;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  updateTimerDisplay();
  logAction("Reset", updateTimerDisplay());
}

function updateTimer() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 60;
        hours++;
      }
    }
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const h = formatTime(hours);
  const m = formatTime(minutes);
  const s = formatTime(seconds);
  const ms = formatTime(milliseconds);

  document.getElementById("timer").innerText = `${h}:${m}:${s}:${ms}`;
}
return `${h}:${m}:${s}:${ms}`;

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function logAction(action, time) {
  const logElement = document.getElementById("log");
  const logEntry = document.createElement("div");
  logEntry.innerText = `${time} - ${action}`;
  logElement.appendChild(logEntry);
}

function forward() {
  seconds += 10;
  if (seconds >= 60) {
    const extraMinutes = Math.floor(seconds / 60);
    seconds %= 60;
    minutes += extraMinutes;
    if (minutes >= 60) {
      const extraHours = Math.floor(minutes / 60);
      minutes %= 60;
      hours += extraHours;
    }
  }
  updateTimerDisplay();
  logAction("Forwarded 10 seconds", updateTimerDisplay());
}

function backward() {
  seconds -= 10;
  if (seconds < 0) {
    const borrowMinutes = Math.ceil(-seconds / 60);
    seconds += 60 * borrowMinutes;
    minutes -= borrowMinutes;
  }
  updateTimerDisplay();
  logAction("Backwarded 10 seconds", updateTimerDisplay());
  if (minutes < 0) {
    reset();
  }
}
