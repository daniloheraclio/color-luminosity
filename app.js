const box = document.querySelector('.box-color');
const range = document.querySelector('.luminosity-range');
const startHexColor = document.querySelector('#startHex');
const errorLabel = document.querySelector('.error-label');

range.addEventListener('input', function() {
   try {
      box.style.backgroundColor = luminace(startHexColor.value, range.value);
   } catch (error) {
     
      console.log(error.message);
   }


})

startHexColor.addEventListener('input', formatStartColor);

function formatStartColor(e)  {
   let hex = e.target.value;
   
   // format hex to keep only numbers and letters from a to f
   hex = hex.replace(/[^0-9a-f]/gi, '');

   // populate input value only with valid chars
   startHexColor.value = hex

   // accept only 3 or 6 digits
   const isValidHex = hex.length === 6 || hex.length === 3;


   // enabling range if input is valid
   if (isValidHex) {
      range.disabled = false;
      box.style.backgroundColor = luminace(startHexColor.value, range.value);
      errorLabel.style.display = 'none';
   } else {
      errorLabel.style.display = 'block';
      range.disabled = true;
   }
}

function luminace(hex, luminosity = 0) {

   // The hexadecial range is 0 to f
   // It has 16 digits
   // 0 = black
   // f = white

   // format hex to keep only numbers and letters from a to f
   hex = hex.replace(/[^0-9a-f]/gi, '');

   // accept only 3 or 6 digits
   const isValidHex = hex.length === 6 || hex.length === 3;
   if(!isValidHex) throw new Error('Invalid HEX');


   // if 3 digits transform to 6
   if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
   }


   // transform hex in rgb to apply the lumiance
   // r (red) / g (green) / b (blue)
   // 0 = black
   // 255 = white

   const twoDigitGroup = hex.match(/([0-9a-f]){2}/gi)

   let finalHex = '#';
   twoDigitGroup.forEach(twoDigit => {
      const numberFromHex = parseInt(twoDigit, 16);
      const calculateLuminosity = numberFromHex + (luminosity * 255);

      // Limit number to be between 0 and 255
      const blackOrLuminosity = Math.max(0, calculateLuminosity);
      const partialColor = Math.min(255, blackOrLuminosity);


      // Get rounded number
      const newColor = Math.round(partialColor);

      // transform to string base16
      const numberToHex = newColor.toString(16);

      // insert 0 before string
      const partialHex = numberToHex.padStart(2, '0');

      finalHex = finalHex + partialHex;

   });
   return finalHex
}