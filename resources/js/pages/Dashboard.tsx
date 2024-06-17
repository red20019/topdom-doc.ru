import React, { useEffect, useState } from 'react';
import DocsStats from '../components/Dashboard/DocsStats';
import DocsTable from '../components/Dashboard/DocsTable';
import RolesTable from '../components/Dashboard/RolesTable';

// import './index.less';

// import Overview from './overview';
// import SalePercent from './salePercent';
// import TimeLine from './timeLine';

const DashBoard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className='flex flex-col gap-y-5 px-10 py-4'>
      <RolesTable loading={loading} />
      <DocsStats loading={loading} />
      <DocsTable loading={loading} />
    </section>
  );
};

export default DashBoard;