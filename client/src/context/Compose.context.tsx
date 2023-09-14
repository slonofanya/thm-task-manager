import React, { FC, ReactNode } from 'react';

interface IComposeContext {
  components?: FC<{ children?: ReactNode }>[]; // array of functional components, each can have children
  children?: ReactNode | undefined; // ComposeContext can accept its own children
}

const ComposeContext = (props: IComposeContext) => {
  const { components = [], children } = props; // destructured props with a default value

  return (
    <>
      {components.reduceRight((acc, Component: any) => {
        return <Component>{acc}</Component>;
      }, children)}
    </>
  );
};

export default ComposeContext;
