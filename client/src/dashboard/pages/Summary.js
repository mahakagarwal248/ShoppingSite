function Summary() {
  const User = JSON.parse(localStorage.getItem('Profile'));

  return (
    <div className="summary-container">
      <h2>Welcome, {User?.result?.name}</h2>
    </div>
  );
}

export default Summary;
