function NavBar() {
  return (
    <div className="flex justify-between items-center w-screen h-20 bg-primary text-white mb-3">
      <div className="font-bold text-2xl ml-10">KidneyLife</div>
      <div className="space-x-10 mr-10 text-lg">
        <a href="#">Dashboard</a>
        <a href="#">Patients</a>
      </div>
    </div>
  );
}

export default NavBar;
