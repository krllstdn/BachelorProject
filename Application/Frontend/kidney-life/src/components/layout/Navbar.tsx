function NavBar() {
  return (
    <div className="flex justify-between items-center w-screen h-20 bg-primary text-white mb-6">
      <div className="font-bold text-2xl ml-10">
        <a href="/">KidneyLife</a>
      </div>
      <div className="space-x-10 mr-10 text-lg">
        <a href="/">Dashboard</a>
        <a href="/patients">Patients</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}

export default NavBar;
