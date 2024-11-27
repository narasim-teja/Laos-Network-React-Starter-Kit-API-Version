import React from 'react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

const WalletConnect: React.FC = () => {
  return (
    <div className="flex items-center">
      <DynamicWidget buttonClassName="!bg-[#432673] hover:!bg-[#523282] !transition-colors !duration-200" />
    </div>
  );
};

export default WalletConnect;
