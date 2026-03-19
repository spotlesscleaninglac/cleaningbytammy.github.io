// ====== PRICING (ADJUST THESE TO MATCH YOUR REAL PRICES) ======
const PRICING = {
  basePerSqFt: {
    standard: 0.12,
    deep: 0.18,
    move: 0.20
  },
  minimum: {
    standard: 120,
    deep: 180,
    move: 220
  },
  addons: {
    fridge: 25,
    oven: 30,
    windows: 40
  }
};

// ====== INSTANT QUOTE CALCULATOR ======
const calculateQuoteBtn = document.getElementById("calculateQuote");
if (calculateQuoteBtn) {
  calculateQuoteBtn.addEventListener("click", () => {
    const serviceType = document.getElementById("serviceType").value;
    const squareFeet = parseInt(document.getElementById("squareFeet").value || "0", 10);
    const addons = Array.from(
      document.querySelectorAll('input[name="addons"]:checked')
    ).map((el) => el.value);

    if (!serviceType || !squareFeet) {
      alert("Please select a service type and enter square footage.");
      return;
    }

    let baseRate = PRICING.basePerSqFt[serviceType] || 0;
    let minimum = PRICING.minimum[serviceType] || 0;

    let estimate = squareFeet * baseRate;
    if (estimate < minimum) estimate = minimum;

    addons.forEach((addon) => {
      estimate += PRICING.addons[addon] || 0;
    });

    const quoteTotalEl = document.getElementById("quoteTotal");
    if (quoteTotalEl) {
      quoteTotalEl.textContent = `$${estimate.toFixed(2)}`;
    }
  });

  const quoteForm = document.getElementById("quote-form");
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your quote request has been sent. You’ll receive a response by text and email.");
    quoteForm.reset();
    const quoteTotalEl = document.getElementById("quoteTotal");
    if (quoteTotalEl) quoteTotalEl.textContent = "$0";
  });
}

// ====== BOOKING CALENDAR LOGIC ======

// Add your available dates here each week (YYYY-MM-DD)
const AVAILABLE_DATES = [
  // Example:
  // "2026-03-21",
  // "2026-03-23",
  // "2026-03-25"
];

const bookingDateInput = document.getElementById("bookingDate");
const bookingTimeSelect = document.getElementById("bookingTime");
const bookingForm = document.getElementById("booking-form");

if (bookingDateInput && bookingTimeSelect && bookingForm) {
  function populateTimeSlots() {
    bookingTimeSelect.innerHTML = "";
    for (let hour = 10; hour <= 17; hour++) {
      const labelHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const option = document.createElement("option");
      option.value = `${hour}:00`;
      option.textContent = `${labelHour}:00 ${ampm}`;
      bookingTimeSelect.appendChild(option);
    }
  }

  populateTimeSlots();

  bookingDateInput.addEventListener("input", () => {
    const selected = bookingDateInput.value;
    if (!AVAILABLE_DATES.includes(selected)) {
      alert("That date is not currently available. Please choose one of the open days.");
      bookingDateInput.value = "";
    }
  });

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!bookingDateInput.value) {
      alert("Please choose an available date.");
      return;
    }
    alert("Your booking request has been sent. You’ll receive a confirmation by text and email.");
    bookingForm.reset();
    populateTimeSlots();
  });
}

// ====== CONTACT FORM ======
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your message has been sent.");
    contactForm.reset();
  });
      }
