import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/note/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Note | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
