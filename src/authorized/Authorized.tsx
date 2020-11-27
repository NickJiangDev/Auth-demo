import React from 'react';
import Exception403 from './Exception403';
import check, { IAuthorityType } from './CheckPermissions';

import Secured from './Secured';

interface AuthorizedProps {
  authority: IAuthorityType;
  noMatch?: React.ReactNode;
  allowCheck?: boolean;
}

export type IAuthorizedType = React.FunctionComponent<AuthorizedProps> & {
  Secured: typeof Secured;
  check: typeof check;

  // custom function
  hasPermission: (authorized: string | string[] | undefined, allowCheck?: boolean) => boolean;
  hasEveryPermission: (authorized: string | string[] | undefined, allowCheck?: boolean) => boolean;
};

const Authorized: React.FunctionComponent<AuthorizedProps> = ({
  children,
  authority,
  noMatch = Exception403,
  allowCheck,
}) => {
  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch, allowCheck);
  return <>{dom}</>;
};

export default Authorized as IAuthorizedType;
