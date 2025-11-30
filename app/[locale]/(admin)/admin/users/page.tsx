'use client';

import { useState } from 'react';
import { UsersTable } from './_components/UsersTable';
import { AdminAuthGuard } from '../../_Components/AdminAuthGuard';

function UsersManagementPage() {
  const [page, setPage] = useState(1);
  const limit = 50;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-setup-text mb-2'>
          User Management
        </h1>
        <p className='text-setup-text/70'>
          Manage system users, roles, and permissions
        </p>
      </div>

      <UsersTable page={page} limit={limit} onPageChange={setPage} />
    </div>
  );
}

export default function Page() {
  return (
    <AdminAuthGuard requireOwner={true}>
      <UsersManagementPage />
    </AdminAuthGuard>
  );
}
