import React, { Suspense } from 'react';
import LoginForm from './LoginForm';

const page = () => {
    return (
         <Suspense fallback={<div>loading</div>}>
          <LoginForm></LoginForm>
        </Suspense>
    );
};

export default page;