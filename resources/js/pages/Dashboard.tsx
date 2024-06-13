import React, { useEffect, useState } from 'react';
import DocsStats from '../components/DocsPercent';
import DocsTable from '../components/DocsTable';

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
    <div>
      <DocsStats loading={loading} />
      <DocsTable />
    </div>
  );
};

export default DashBoard;