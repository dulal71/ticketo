
import { Suspense } from "react";
import RegistrationForm from "./RegistrationForm";


export default function SignupPage() {
   return (
      <Suspense fallback={<div>loading</div>}>
          <RegistrationForm></RegistrationForm>
        </Suspense>
       );
}