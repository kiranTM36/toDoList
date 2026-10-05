const Navbar = () => {
  return (
    <div className="h-[7vh] w-full bg-black fixed top-0 left-0">
        <div className="flex gap-3">
            <button className="text-white border border-white px-2 py-1 rounded-md">Sign up</button>
            <button className="text-white border border-white px-2 py-1 rounded-md">Login</button>
        </div>
    </div>
  )
}

export default Navbar