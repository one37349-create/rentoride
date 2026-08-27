// RentoRide My Bookings

async function loadMyBookings() {

  const bookingList = document.getElementById("myBookings");

  const { data: userData } =
    await supabaseClient.auth.getUser();

  if (!userData.user) {
    bookingList.innerText =
      "Please login to view your bookings.";
    return;
  }

  const { data: bookings, error } =
    await supabaseClient
      .from("bookings")
      .select(`
        id,
        bike_id,
        start_date,
        end_date,
        pickup_time,
        dropoff_time,
        amount,
        status
      `)
      .eq("user_id", userData.user.id)
      .order("start_date", { ascending: false });

  if (error) {
    bookingList.innerText = error.message;
    return;
  }

  if (!bookings || bookings.length === 0) {
    bookingList.innerText = "No bookings yet.";
    return;
  }

  bookingList.innerHTML = "";

  bookings.forEach((booking) => {

    const card = document.createElement("div");

    card.innerHTML = `
      <hr>
      <p>🏍️ Bike ID: ${booking.bike_id}</p>

      <p>
        📅 Pickup:
        ${booking.start_date}
        at
        ${booking.pickup_time}
      </p>

      <p>
        📅 Drop-off:
        ${booking.end_date}
        at
        ${booking.dropoff_time}
      </p>

      <p>💰 ₹${booking.amount}</p>

      <p>🟡 Status: ${booking.status}</p>

      <button onclick="cancelBooking('${booking.id}')">
        Cancel Booking
      </button>
    `;

    bookingList.appendChild(card);
  });
}


async function cancelBooking(bookingId) {

  const { error } =
    await supabaseClient
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Booking cancelled successfully!");

  await loadMyBookings();
}


loadMyBookings();
