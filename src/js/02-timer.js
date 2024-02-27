import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const displayDays = document.querySelector('[data-days]');
const displayHours = document.querySelector('[data-hours]');
const displayMinutes = document.querySelector('[data-minutes]');
const displaySeconds = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date().getTime() > new Date(selectedDates[0]).getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};
const fp = flatpickr(input, options); // flatpickr
let timer = null;

startBtn.addEventListener('click', () => {
  const selectedDate = fp.selectedDates[0];

  timer = setInterval(() => {
    let { days, hours, minutes, seconds } = convertMs(
      selectedDate.getTime() - new Date().getTime()
    );
    if (
      Math.floor((selectedDate.getTime() - new Date().getTime()) / 1000) <= 0
    ) {
      clearInterval(timer);
      Notiflix.Notify.info('Countdown finished!');
    }
displayDays.textContent = addLeadingZero(days);
    displayHours.textContent = addLeadingZero(hours);
    displayMinutes.textContent = addLeadingZero(minutes);
    displaySeconds.textContent = addLeadingZero(seconds);
  }, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
// Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}