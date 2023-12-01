import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/week/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Week | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
