function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  let intervalId;
  
  document.querySelector('[data-start]').addEventListener('click', function() {
    this.disabled = true;
    document.querySelector('[data-stop]').disabled = false;
  
    intervalId = setInterval(function() {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  
  document.querySelector('[data-stop]').addEventListener('click', function() {
    this.disabled = true;
    document.querySelector('[data-start]').disabled = false;
  
    clearInterval(intervalId);
  });
  
