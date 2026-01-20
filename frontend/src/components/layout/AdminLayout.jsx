import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar - To be implemented in Phase 8 */}
        <aside className="w-64 bg-gray-900 text-white min-h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
