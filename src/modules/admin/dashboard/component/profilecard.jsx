 export const AdminProfileCard = () => {
  return (
    <div className="w-64 p-4">
      <div className="flex items-center mb-4">
        <img src="https://i.pravatar.cc/60?u=admin" alt="Admin" className="w-12 h-12 rounded-full mr-3"/>
        <div>
          <h3 className="font-semibold text-gray-800">Dr. Sarah Admin</h3>
          <p className="text-sm text-gray-500">System Administrator</p>
        </div>
      </div>
      <div className="border-t pt-3 space-y-2">
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md">Admin Settings</button>
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md">System Reports</button>
        <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md">Logout</button>
      </div>
    </div>
  );
};